const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load env vars before anything else
dotenv.config({ path: path.join(__dirname, "../.env") });

const connectDB = require("./config/db");
const certificateRoutes = require("./routes/certificateRoutes");
const auditRoutes = require("./routes/auditRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "CertiChain Backend Running 🚀",
    version: "1.0.0",
    endpoints: {
      mint: "POST /api/certificate/mint",
      verify: "GET /api/verify/:id",
      certificates: "GET /api/certificates",
      revoke: "POST /api/certificate/revoke",
      stats: "GET /api/dashboard/stats",
      auditLogs: "GET /api/audit-logs",
      blockchain: "GET /api/blockchain/transactions",
    },
  });
});

// API Routes
app.use("/api", certificateRoutes);
app.use("/api", auditRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);

  // Handle multer errors
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      error: "File size exceeds the 5MB limit",
    });
  }

  if (err.message && err.message.includes("Only PDF")) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 CertiChain Backend running on port ${PORT}`);
  console.log(`📡 API Base: http://localhost:${PORT}/api`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/\n`);
});