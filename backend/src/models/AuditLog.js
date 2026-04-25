const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: [
      "CERTIFICATE_ISSUED",
      "CERTIFICATE_REVOKED",
      "VERIFICATION_REQUEST",
      "VERIFICATION_SUCCESS",
      "VERIFICATION_FAILED",
    ],
  },
  actor: {
    type: String,
    default: "system",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  severity: {
    type: String,
    enum: ["INFO", "WARNING", "CRITICAL"],
    default: "INFO",
  },
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
