const mongoose = require("mongoose");

const bookSessionSchema = new mongoose.Schema(
  {
    checkin: { type: Date, required: true },
    checkout: { type: Date, required: true },
    email: { type: String, required: true },
    sessionType: { type: String, default:"online"},
    guests: { type: Number, default:1},
  },
  { timestamps: true }
);

module.exports = mongoose.model("book-a-session", bookSessionSchema);