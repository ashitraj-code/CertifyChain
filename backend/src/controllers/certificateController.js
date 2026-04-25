const Certificate = require("../models/Certificate");
const AuditLog = require("../models/AuditLog");
const { uploadToIPFS, fetchFromIPFS } = require("../services/ipfsService");
const { mintCertificate, getCertificate: getBlockchainCert } = require("../services/blockchainService");
const { generateHash, generateHashFromFile } = require("../utils/hashGenerator");

/**
 * POST /api/certificate/mint
 * Issue a new certificate — uploads to IPFS, mints on blockchain, stores in MongoDB
 */
exports.issueCertificate = async (req, res) => {
  try {
    const { studentName, course, walletAddress } = req.body;
    const file = req.file;

    // Validate inputs
    if (!studentName || !course || !walletAddress) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: studentName, course, walletAddress",
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        error: "Certificate file (PDF/PNG/JPEG) is required",
      });
    }

    // Validate wallet address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return res.status(400).json({
        success: false,
        error: "Invalid wallet address format",
      });
    }

    console.log(`📜 Issuing certificate for ${studentName}...`);

    // Step 1: Generate certificate hash from file
    const certHash = generateHashFromFile(file.path);
    console.log(`🔐 Generated hash: ${certHash.substring(0, 16)}...`);

    // Step 2: Upload file to IPFS via Pinata
    const ipfsHash = await uploadToIPFS(file);
    console.log(`📦 Uploaded to IPFS: ${ipfsHash}`);

    // Step 3: Mint NFT on blockchain
    const { tokenId, transactionHash } = await mintCertificate(
      walletAddress,
      ipfsHash,
      certHash
    );
    console.log(`⛓️  Minted NFT tokenId: ${tokenId}, tx: ${transactionHash}`);

    // Step 4: Store in MongoDB
    const certificate = new Certificate({
      studentName,
      course,
      ipfsHash,
      certHash,
      tokenId,
      walletAddress,
      transactionHash,
    });
    await certificate.save();

    // Step 5: Create audit log
    await AuditLog.create({
      action: "CERTIFICATE_ISSUED",
      actor: "admin",
      details: {
        studentName,
        course,
        tokenId,
        transactionHash,
        ipfsHash,
        walletAddress,
      },
      severity: "INFO",
    });

    console.log(`✅ Certificate issued successfully!`);

    return res.status(201).json({
      success: true,
      data: {
        tokenId,
        transactionHash,
        ipfsHash,
        certHash,
        studentName,
        course,
        walletAddress,
      },
    });
  } catch (error) {
    console.error("Issue certificate error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to issue certificate",
    });
  }
};

/**
 * GET /api/verify/:id
 * Verify a certificate by token ID — fetches from blockchain & compares with IPFS
 */
exports.verifyCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const tokenId = parseInt(id, 10);

    if (isNaN(tokenId) || tokenId < 0) {
      return res.status(400).json({
        success: false,
        status: "INVALID",
        error: "Invalid certificate ID. Please provide a valid token ID.",
      });
    }

    console.log(`🔍 Verifying certificate #${tokenId}...`);

    // Step 1: Fetch certificate from blockchain
    let blockchainCert;
    try {
      blockchainCert = await getBlockchainCert(tokenId);
    } catch (error) {
      // Log verification failure
      await AuditLog.create({
        action: "VERIFICATION_FAILED",
        actor: "public",
        details: { tokenId, reason: "Not found on blockchain" },
        severity: "WARNING",
      });

      return res.status(404).json({
        success: false,
        status: "INVALID",
        error: "Certificate not found on the blockchain",
      });
    }

    // Step 2: Fetch certificate from MongoDB for additional metadata
    const dbCert = await Certificate.findOne({ tokenId });

    // Step 3: Fetch file from IPFS and recalculate hash
    let verificationStatus = "VALID";
    try {
      const fileBuffer = await fetchFromIPFS(blockchainCert.ipfsHash);
      const recalculatedHash = generateHash(fileBuffer);

      if (recalculatedHash !== blockchainCert.certHash) {
        verificationStatus = "INVALID";
      }
    } catch (error) {
      // If IPFS fetch fails, we can still report based on blockchain data
      console.warn("Could not fetch from IPFS for hash verification:", error.message);
    }

    // Check revocation status from DB
    if (dbCert && dbCert.status === "Revoked") {
      verificationStatus = "REVOKED";
    }

    // Step 4: Log verification
    await AuditLog.create({
      action: verificationStatus === "VALID" ? "VERIFICATION_SUCCESS" : "VERIFICATION_FAILED",
      actor: "public",
      details: {
        tokenId,
        status: verificationStatus,
        ipfsHash: blockchainCert.ipfsHash,
      },
      severity: verificationStatus === "VALID" ? "INFO" : "WARNING",
    });

    return res.status(200).json({
      success: true,
      status: verificationStatus,
      data: {
        tokenId: blockchainCert.id,
        studentAddress: blockchainCert.student,
        ipfsHash: blockchainCert.ipfsHash,
        certHash: blockchainCert.certHash,
        studentName: dbCert?.studentName || "N/A",
        course: dbCert?.course || "N/A",
        issuedAt: dbCert?.createdAt || null,
        transactionHash: dbCert?.transactionHash || null,
      },
    });
  } catch (error) {
    console.error("Verify certificate error:", error.message);
    return res.status(500).json({
      success: false,
      status: "ERROR",
      error: error.message || "Verification failed",
    });
  }
};

/**
 * GET /api/certificates
 * Get all certificates stored in MongoDB
 */
exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    console.error("Fetch certificates error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch certificates",
    });
  }
};

/**
 * POST /api/certificate/revoke
 * Revoke a certificate (marks in DB, optional blockchain interaction)
 */
exports.revokeCertificate = async (req, res) => {
  try {
    const { tokenId, reason } = req.body;

    if (tokenId === undefined || tokenId === null) {
      return res.status(400).json({
        success: false,
        error: "tokenId is required",
      });
    }

    if (!reason) {
      return res.status(400).json({
        success: false,
        error: "Revocation reason is required",
      });
    }

    const certificate = await Certificate.findOne({ tokenId: parseInt(tokenId, 10) });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        error: "Certificate not found",
      });
    }

    if (certificate.status === "Revoked") {
      return res.status(400).json({
        success: false,
        error: "Certificate is already revoked",
      });
    }

    // Update certificate status
    certificate.status = "Revoked";
    certificate.revokeReason = reason;
    certificate.revokedAt = new Date();
    await certificate.save();

    // Log revocation
    await AuditLog.create({
      action: "CERTIFICATE_REVOKED",
      actor: "admin",
      details: {
        tokenId: certificate.tokenId,
        studentName: certificate.studentName,
        course: certificate.course,
        reason,
      },
      severity: "WARNING",
    });

    return res.status(200).json({
      success: true,
      message: "Certificate revoked successfully",
      data: {
        tokenId: certificate.tokenId,
        studentName: certificate.studentName,
        course: certificate.course,
        status: "Revoked",
        reason,
      },
    });
  } catch (error) {
    console.error("Revoke certificate error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to revoke certificate",
    });
  }
};

/**
 * GET /api/dashboard/stats
 * Get dashboard stats
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const totalCertificates = await Certificate.countDocuments();
    const activeCertificates = await Certificate.countDocuments({ status: "Active" });
    const revokedCertificates = await Certificate.countDocuments({ status: "Revoked" });

    // Count verifications this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const verificationsThisMonth = await AuditLog.countDocuments({
      action: { $in: ["VERIFICATION_SUCCESS", "VERIFICATION_FAILED", "VERIFICATION_REQUEST"] },
      timestamp: { $gte: startOfMonth },
    });

    // Count unique courses
    const uniqueCourses = await Certificate.distinct("course");

    return res.status(200).json({
      success: true,
      data: {
        totalCertificates,
        activeCertificates,
        activeCourses: uniqueCourses.length,
        verificationsThisMonth,
        revocations: revokedCertificates,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch dashboard stats",
    });
  }
};
