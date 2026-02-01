const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transaction_id: String,
    referenceNumber: String,
    amount: Number,
    date: String,
    source: {
      type: String,
      enum: ["bank", "internal"],
    },
    uploadJobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UploadJob",
    },
  },
  { timestamps: true },
);

/* INDEXES (PDF EXPECTS THIS) */
transactionSchema.index({ transaction_id: 1 });
transactionSchema.index({ referenceNumber: 1 });
transactionSchema.index({ uploadJobId: 1 });

module.exports = mongoose.model("Transaction", transactionSchema);
