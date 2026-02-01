const express = require("express");
const router = express.Router();

const { getReconciliationResults } = require("../controllers/resultController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");

router.get(
  "/results",
  protect,
  allowRoles(["Admin", "Analyst", "Viewer"]),
  getReconciliationResults,
);

module.exports = router;
