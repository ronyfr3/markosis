const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
  {
    email: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("newsletter", newsletterSchema);
