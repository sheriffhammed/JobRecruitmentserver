const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    jobType: {
      type: ObjectId,
      ref: "JobType",
      required: true,
    },
    modeOfWork: {
      type: ObjectId,
      ref: "modeOfWork",
      required: true,
    },
    industry: {
      type: ObjectId,
      ref: "industry",
      required: true,
    },
    experience: {
      type: ObjectId,
      ref: "experience",
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

module.exports = mongoose.model("Job", jobSchema);
