const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      minlength: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
