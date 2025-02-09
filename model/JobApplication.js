const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const jobApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: ObjectId,
      ref: "Job",
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

module.exports = mongoose.model("jobApplication", jobApplicationSchema);
