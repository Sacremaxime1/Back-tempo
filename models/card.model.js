const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      unique: true,
      trim: true,
    },
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: String,
      required: true,
    },
    upvoter: {
      type: [String],
      required: true,
    },
    downvoter: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("card", CardSchema);
