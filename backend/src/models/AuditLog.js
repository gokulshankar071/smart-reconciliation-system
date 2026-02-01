const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    action: String,
    entity: String,
    entityId: String,
    oldValue: Object,
    newValue: Object,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
