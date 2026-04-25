const AuditLog = require("../models/AuditLog");
const Certificate = require("../models/Certificate");
const { getProvider } = require("../services/blockchainService");

/**
 * GET /api/audit-logs
 * Get all audit logs with optional severity filter
 */
exports.getAuditLogs = async (req, res) => {
  try {
    const { severity, action, limit = 50 } = req.query;
    const filter = {};

    if (severity && severity !== "All") {
      filter.severity = severity;
    }

    if (action) {
      filter.action = action;
    }

    const logs = await AuditLog.find(filter)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit, 10))
      .lean();

    return res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    console.error("Fetch audit logs error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch audit logs",
    });
  }
};

/**
 * GET /api/blockchain/transactions
 * Get blockchain transaction data from stored certificates
 */
exports.getBlockchainTransactions = async (req, res) => {
  try {
    // Get recent certificates with transaction data
    const certificates = await Certificate.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    // Get recent audit logs for additional transaction types (verify, revoke)
    const auditLogs = await AuditLog.find({
      action: { $in: ["CERTIFICATE_ISSUED", "CERTIFICATE_REVOKED", "VERIFICATION_SUCCESS"] },
    })
      .sort({ timestamp: -1 })
      .limit(30)
      .lean();

    // Build transaction-like records
    const transactions = auditLogs.map((log) => {
      const cert = certificates.find(
        (c) => c.tokenId === log.details?.tokenId
      );

      let type = "UNKNOWN";
      if (log.action === "CERTIFICATE_ISSUED") type = "MINT";
      else if (log.action === "CERTIFICATE_REVOKED") type = "REVOKE";
      else if (log.action === "VERIFICATION_SUCCESS") type = "VERIFY";

      return {
        hash: cert?.transactionHash || log.details?.transactionHash || "N/A",
        type,
        from: cert?.walletAddress || "N/A",
        timestamp: log.timestamp,
        block: cert?.tokenId || 0,
        status: "Confirmed",
        details: log.details,
      };
    });

    // Get network info
    let networkInfo = {
      network: "Polygon Amoy",
      latestBlock: "N/A",
      gasPrice: "N/A",
    };

    try {
      const provider = getProvider();
      const blockNumber = await provider.getBlockNumber();
      const feeData = await provider.getFeeData();
      networkInfo = {
        network: "Polygon Amoy",
        latestBlock: blockNumber,
        gasPrice: feeData.gasPrice
          ? `${(Number(feeData.gasPrice) / 1e9).toFixed(2)} Gwei`
          : "N/A",
      };
    } catch (e) {
      console.warn("Could not fetch network info:", e.message);
    }

    return res.status(200).json({
      success: true,
      networkInfo,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.error("Blockchain transactions error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch blockchain transactions",
    });
  }
};
