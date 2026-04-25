const express = require("express");
const router = express.Router();
const {
  getAuditLogs,
  getBlockchainTransactions,
} = require("../controllers/auditController");

// GET /api/audit-logs — Get all audit logs
router.get("/audit-logs", getAuditLogs);

// GET /api/blockchain/transactions — Get blockchain transactions
router.get("/blockchain/transactions", getBlockchainTransactions);

module.exports = router;
