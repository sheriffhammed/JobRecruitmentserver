const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const industrySchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("industry", industrySchema);
