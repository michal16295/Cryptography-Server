const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      minlength: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", authSchema);
