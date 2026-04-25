const crypto = require("crypto");
const fs = require("fs");

/**
 * Generate SHA256 hash from a file buffer
 * @param {Buffer} fileBuffer - The file content as a buffer
 * @returns {string} - The SHA256 hex hash
 */
function generateHash(fileBuffer) {
  return crypto.createHash("sha256").update(fileBuffer).digest("hex");
}

/**
 * Generate SHA256 hash from a file path
 * @param {string} filePath - Path to the file
 * @returns {string} - The SHA256 hex hash
 */
function generateHashFromFile(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return generateHash(fileBuffer);
}

module.exports = {
  generateHash,
  generateHashFromFile,
};
