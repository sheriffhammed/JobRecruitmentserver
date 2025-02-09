const JobType = require("../model/JobType");
const { jobFunction } = require("../utils/jobFunction");

const handleNewJobType = async (req, res) => {
  const { description, user } = req.body;
  jobFunction(JobType, description, user, res);
};

//Retreive All Job type
const getAllJobTypes = async (req, res) => {
  try {
    const jobTypes = await JobType.find({});

    if (res.status(200) && jobTypes) {
      res.status(200).json({ data: jobTypes });
    } else {
      return res
        .status(400)
        .json({ message: "No Record Found, Please try again" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "No record Found, Something went wrong please try again",
      error: error.message,
    });
  }
};

module.exports = { handleNewJobType, getAllJobTypes };
