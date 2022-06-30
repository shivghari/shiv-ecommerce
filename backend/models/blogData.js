const mongoose = require("mongoose");

var BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogSchema", BlogSchema);
