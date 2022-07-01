const mongoose = require("mongoose");

var BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    authorID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approveByAdmin: {
      type: Boolean,
      default: false,
    },
    blogImage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogSchema", BlogSchema);
