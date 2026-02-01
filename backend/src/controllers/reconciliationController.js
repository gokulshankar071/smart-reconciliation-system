const Transaction = require("../models/Transaction");
const ReconciliationResult = require("../models/ReconciliationResult");
const { AMOUNT_TOLERANCE_PERCENT } = require("../config/reconciliationRules");
const AuditLog = require("../models/AuditLog");

exports.runReconciliation = async (req, res) => {
  try {
    const bankTx = await Transaction.find({ source: "bank" });
    const internalTx = await Transaction.find({ source: "internal" });

    const internalMap = new Map();
    internalTx.forEach((tx) => {
      if (!internalMap.has(tx.transaction_id)) {
        internalMap.set(tx.transaction_id, []);
      }
      internalMap.get(tx.transaction_id).push(tx);
    });

    const results = [];

    bankTx.forEach((bank) => {
      const internalMatches = internalMap.get(bank.transaction_id);

      /* ================= DUPLICATE ================= */
      if (internalMatches && internalMatches.length > 1) {
        results.push({
          transaction_id: bank.transaction_id,
          bankAmount: bank.amount,
          internalAmount: null,
          status: "DUPLICATE",
          uploadedBy: req.user._id, // ✅ FIX
        });
        return;
      }

      /* ================= MISSING ================= */
      if (!internalMatches) {
        results.push({
          transaction_id: bank.transaction_id,
          bankAmount: bank.amount,
          internalAmount: null,
          status: "MISSING",
          uploadedBy: req.user._id, // ✅ FIX
        });
        return;
      }

      const internal = internalMatches[0];
      const diffPercent =
        (Math.abs(bank.amount - internal.amount) / bank.amount) * 100;

      /* ================= MATCHED ================= */
      if (bank.amount === internal.amount) {
        results.push({
          transaction_id: bank.transaction_id,
          bankAmount: bank.amount,
          internalAmount: internal.amount,
          status: "MATCHED",
          uploadedBy: req.user._id, // ✅ FIX
        });
      } else if (diffPercent <= AMOUNT_TOLERANCE_PERCENT) {
        /* ================= PARTIAL MATCH ================= */
        results.push({
          transaction_id: bank.transaction_id,
          bankAmount: bank.amount,
          internalAmount: internal.amount,
          status: "PARTIAL_MATCH",
          uploadedBy: req.user._id, // ✅ FIX
        });
      } else {
        /* ================= MISMATCH ================= */
        results.push({
          transaction_id: bank.transaction_id,
          bankAmount: bank.amount,
          internalAmount: internal.amount,
          status: "MISMATCH",
          uploadedBy: req.user._id, // ✅ FIX
        });
      }
    });

    /* 🔥 CLEAR OLD DATA */
    await ReconciliationResult.deleteMany({});

    /* 🔥 INSERT NEW DATA WITH uploadedBy */
    await ReconciliationResult.insertMany(results);

    /* ================= AUDIT LOG ================= */
    await AuditLog.create({
      action: "RECONCILIATION_RUN",
      entity: "Reconciliation",
      entityId: "SYSTEM",
      oldValue: null,
      newValue: {
        total: results.length,
        matched: results.filter((r) => r.status === "MATCHED").length,
        partial: results.filter((r) => r.status === "PARTIAL_MATCH").length,
        mismatch: results.filter((r) => r.status === "MISMATCH").length,
        missing: results.filter((r) => r.status === "MISSING").length,
        duplicate: results.filter((r) => r.status === "DUPLICATE").length,
      },
      performedBy: req.user._id,
    });

    /* ================= RESPONSE ================= */
    res.json({
      total: results.length,
      matched: results.filter((r) => r.status === "MATCHED").length,
      partial: results.filter((r) => r.status === "PARTIAL_MATCH").length,
      mismatch: results.filter((r) => r.status === "MISMATCH").length,
      missing: results.filter((r) => r.status === "MISSING").length,
      duplicate: results.filter((r) => r.status === "DUPLICATE").length,
    });
  } catch (err) {
    console.error("Reconciliation error:", err);
    res.status(500).json({ error: err.message });
  }
};
