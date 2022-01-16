const mongoose = require("mongoose");

const portalSchema = new mongoose.Schema(
  {
    filename: { type: String, required: [true, "filename required"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("carrerPortal", portalSchema);
