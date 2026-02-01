const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    transaction_id: String,
    bankAmount: Number,
    internalAmount: Number,
    status: {
      type: String,
      enum: ["MATCHED", "MISMATCH", "MISSING", "DUPLICATE", "PARTIAL_MATCH"],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ReconciliationResult", schema);
