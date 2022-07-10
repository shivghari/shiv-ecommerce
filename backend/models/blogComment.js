const mongoose = require("mongoose");

var BlogCommentSchema = new mongoose.Schema(
  {
    blogID: { type: mongoose.Schema.Types.ObjectId, ref: "BlogSchema" },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogCommentSchema", BlogCommentSchema);
