const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    type: {
      type: String,
      trim: true,
    },
    level: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
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
