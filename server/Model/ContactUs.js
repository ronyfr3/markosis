const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactReason: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("contactus", contactUsSchema);
