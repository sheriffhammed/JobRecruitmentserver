const experience = require("../model/experience");
const { jobFunction } = require("../utils/jobFunction");

const handleExperience = async (req, res) => {
  const { description, user } = req.body;
  jobFunction(experience, description, user, res);
};

//Retreive All Experience
const getAllExperience = async (req, res) => {
  try {
    const experiences = await experience.find({});

    if (res.status(200) && experiences) {
      res.status(200).json({ data: experiences });
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

module.exports = { handleExperience, getAllExperience };
