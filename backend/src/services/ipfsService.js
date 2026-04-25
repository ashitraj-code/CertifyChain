const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const PINATA_BASE_URL = "https://api.pinata.cloud";

/**
 * Upload a file to IPFS using Pinata
 * @param {Object} file - Multer file object with path and originalname
 * @returns {string} - IPFS hash (CID)
 */
async function uploadToIPFS(file) {
  try {
    const formData = new FormData();
    const fileStream = fs.createReadStream(file.path);

    formData.append("file", fileStream, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    // Optional metadata
    const metadata = JSON.stringify({
      name: `CertiChain-${file.originalname}`,
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 1,
    });
    formData.append("pinataOptions", options);

    const response = await axios.post(
      `${PINATA_BASE_URL}/pinning/pinFileToIPFS`,
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          ...formData.getHeaders(),
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
        },
      }
    );

    // Clean up the temp file after upload
    fs.unlink(file.path, (err) => {
      if (err) console.warn("Could not delete temp file:", file.path);
    });

    return response.data.IpfsHash;
  } catch (error) {
    // Clean up the temp file on error too
    if (file.path) {
      fs.unlink(file.path, () => {});
    }
    console.error("IPFS upload error:", error.response?.data || error.message);
    throw new Error("Failed to upload file to IPFS");
  }
}

/**
 * Fetch a file from IPFS via Pinata gateway
 * @param {string} ipfsHash - The IPFS CID
 * @returns {Buffer} - File content as buffer
 */
async function fetchFromIPFS(ipfsHash) {
  try {
    const response = await axios.get(
      `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
      { responseType: "arraybuffer" }
    );
    return Buffer.from(response.data);
  } catch (error) {
    console.error("IPFS fetch error:", error.message);
    throw new Error("Failed to fetch file from IPFS");
  }
}

module.exports = {
  uploadToIPFS,
  fetchFromIPFS,
};
