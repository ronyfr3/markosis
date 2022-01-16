const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "title field required!"] },
    images: { type: mongoose.Schema.Types.Mixed },
    video: { type: String },
    description: {
      type: String,
      required: [true, "description field required!"],
    },
    postedBy:{ type: String}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("blogs", blogSchema);
