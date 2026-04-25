const { ethers } = require("ethers");
const path = require("path");
const abi = require("../config/abi.json");

let provider;
let wallet;
let contract;

function getProvider() {
  if (!provider) {
    provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  }
  return provider;
}

function getWallet() {
  if (!wallet) {
    wallet = new ethers.Wallet(process.env.PRIVATE_KEY, getProvider());
  }
  return wallet;
}

function getContract() {
  if (!contract) {
    contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      abi,
      getWallet()
    );
  }
  return contract;
}

/**
 * Mint a certificate NFT on the blockchain
 * @param {string} studentAddress - The wallet address of the student
 * @param {string} ipfsHash - The IPFS hash of the certificate file
 * @param {string} certHash - The SHA256 hash of the certificate file
 * @returns {Object} - { tokenId, transactionHash }
 */
async function mintCertificate(studentAddress, ipfsHash, certHash) {
  try {
    const contractInstance = getContract();

    const tx = await contractInstance.mintCertificate(
      studentAddress,
      ipfsHash,
      certHash
    );

    const receipt = await tx.wait();

    // Parse the CertificateMinted event to get token ID
    let tokenId;
    for (const log of receipt.logs) {
      try {
        const parsed = contractInstance.interface.parseLog({
          topics: log.topics,
          data: log.data,
        });
        if (parsed && parsed.name === "CertificateMinted") {
          tokenId = Number(parsed.args.id);
          break;
        }
      } catch (e) {
        // Skip logs that don't match our contract ABI
        continue;
      }
    }

    return {
      tokenId,
      transactionHash: receipt.hash,
    };
  } catch (error) {
    console.error("Blockchain mint error:", error.message);
    throw new Error(`Blockchain minting failed: ${error.reason || error.message}`);
  }
}

/**
 * Get a certificate from the blockchain by token ID
 * @param {number} tokenId - The NFT token ID
 * @returns {Object} - Certificate data from the blockchain
 */
async function getCertificate(tokenId) {
  try {
    const contractInstance = getContract();
    const cert = await contractInstance.getCertificate(tokenId);

    return {
      id: Number(cert.id),
      student: cert.student,
      ipfsHash: cert.ipfsHash,
      certHash: cert.certHash,
    };
  } catch (error) {
    console.error("Blockchain read error:", error.message);
    throw new Error(`Failed to fetch certificate from blockchain: ${error.reason || error.message}`);
  }
}

/**
 * Check if a certificate hash has already been used
 * @param {string} certHash - The SHA256 hash
 * @returns {boolean} - Whether the hash has been used
 */
async function isHashUsed(certHash) {
  try {
    const contractInstance = getContract();
    return await contractInstance.usedHashes(certHash);
  } catch (error) {
    console.error("Hash check error:", error.message);
    return false;
  }
}

/**
 * Get the owner address of the contract deployer wallet
 */
function getWalletAddress() {
  return getWallet().address;
}

module.exports = {
  mintCertificate,
  getCertificate,
  isHashUsed,
  getWalletAddress,
  getProvider,
};
