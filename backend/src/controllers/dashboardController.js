const mongoose = require("mongoose");
const ReconciliationResult = require("../models/ReconciliationResult");

exports.getDashboardSummary = async (req, res) => {
  try {
    const { fromDate, toDate, status, uploadedBy } = req.query;

    const filter = {};

    /* ================= DATE FILTER ================= */
    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = new Date(fromDate);
      if (toDate) filter.createdAt.$lte = new Date(toDate);
    }

    /* ================= STATUS FILTER (🔥 FIXED) ================= */
    if (status && status !== "all") {
      if (status.toLowerCase() === "matched") {
        filter.status = "MATCHED";
      }

      if (status.toLowerCase() === "unmatched") {
        filter.status = {
          $in: ["MISMATCH", "MISSING", "PARTIAL_MATCH"],
        };
      }
    }

    /* ================= UPLOADED BY FILTER ================= */
    if (
      uploadedBy &&
      uploadedBy !== "all" &&
      mongoose.Types.ObjectId.isValid(uploadedBy)
    ) {
      filter.uploadedBy = new mongoose.Types.ObjectId(uploadedBy);
    }

    /* ================= QUERY DB (🔥 FILTER APPLIED HERE) ================= */
    const results = await ReconciliationResult.find(filter);

    const total = results.length;

    const matched = results.filter((r) => r.status === "MATCHED").length;
    const mismatched = results.filter((r) => r.status === "MISMATCH").length;
    const missing = results.filter((r) => r.status === "MISSING").length;

    const unmatched = mismatched + missing;
    const accuracy = total ? Math.round((matched / total) * 100) : 0;

    res.json({
      total,
      matched,
      unmatched,
      missing,
      accuracy,
    });
  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ message: "Dashboard summary failed" });
  }
};
