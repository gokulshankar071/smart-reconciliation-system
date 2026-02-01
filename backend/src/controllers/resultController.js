const ReconciliationResult = require("../models/ReconciliationResult");
const UploadJob = require("../models/UploadJob");

exports.getReconciliationResults = async (req, res) => {
  try {
    const results = await ReconciliationResult.find().sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReconciliationSummary = async (req, res) => {
  try {
    const results = await ReconciliationResult.find();

    const summary = {
      total: results.length,
      matched: results.filter((r) => r.status === "MATCHED").length,
      mismatch: results.filter((r) => r.status === "MISMATCH").length,
      missing: results.filter((r) => r.status === "MISSING").length,
    };

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUploadHistory = async (req, res) => {
  try {
    const jobs = await UploadJob.find()
      .populate("uploadedBy", "email role")
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
