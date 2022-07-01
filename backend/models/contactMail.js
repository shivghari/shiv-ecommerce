const mongoose = require("mongoose");

var contactSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
    email: { type: String },
    subject: { type: String },
    message: { type: String },
    replyByAdmin: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
