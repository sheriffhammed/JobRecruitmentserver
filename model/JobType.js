const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const jobTypeSchema = new mongoose.Schema(
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

module.exports = mongoose.model("JobType", jobTypeSchema);
