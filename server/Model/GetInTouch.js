const mongoose = require("mongoose");

const getInTouchSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    businessEmail: { type: String, required: true },
    companyName: { type: String, required: true },
    services: { type: Array, required: true },
    contactReason: { type: String, required: true },
    agreeForNotifedFromUs: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("getintouch", getInTouchSchema);
