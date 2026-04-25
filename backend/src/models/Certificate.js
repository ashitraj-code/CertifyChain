const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  course: {
    type: String,
    required: true,
    trim: true,
  },
  ipfsHash: {
    type: String,
    required: true,
  },
  certHash: {
    type: String,
    required: true,
    unique: true,
  },
  tokenId: {
    type: Number,
    required: true,
    unique: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  transactionHash: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Revoked"],
    default: "Active",
  },
  revokeReason: {
    type: String,
    default: null,
  },
  revokedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Certificate", certificateSchema);
