const express = require("express");
const router = express.Router();

const {
  runReconciliation,
} = require("../controllers/reconciliationController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");

router.post(
  "/run",
  protect,
  allowRoles(["Admin", "Analyst"]),
  runReconciliation,
);

module.exports = router;
