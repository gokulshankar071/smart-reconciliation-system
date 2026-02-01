const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadTransactions } = require("../controllers/uploadController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");

const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  protect,
  allowRoles(["Admin", "Analyst"]),
  upload.single("file"), // MUST be "file"
  uploadTransactions,
);

module.exports = router;
