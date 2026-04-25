const express = require("express");
const router = express.Router();
const upload = require("../utils/fileUpload");
const {
  issueCertificate,
  verifyCertificate,
  getAllCertificates,
  revokeCertificate,
  getDashboardStats,
} = require("../controllers/certificateController");

// POST /api/certificate/mint — Issue a new certificate
router.post("/certificate/mint", upload.single("file"), issueCertificate);

// GET /api/verify/:id — Verify a certificate by token ID
router.get("/verify/:id", verifyCertificate);

// GET /api/certificates — Get all certificates
router.get("/certificates", getAllCertificates);

// POST /api/certificate/revoke — Revoke a certificate
router.post("/certificate/revoke", revokeCertificate);

// GET /api/dashboard/stats — Get dashboard statistics
router.get("/dashboard/stats", getDashboardStats);

module.exports = router;
