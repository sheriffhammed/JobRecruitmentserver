const modeofwork = require("../model/modeofwork");
const { jobFunction } = require("../utils/jobFunction");

const modeOfWork = async (req, res) => {
  const { description, user } = req.body;
  jobFunction(modeofwork, description, user, res);
};

//Retreive All Mode of Work
const getAllModeOfWork = async (req, res) => {
  try {
    const modeOfWorks = await modeofwork.find({});

    if (res.status(200) && modeOfWorks) {
      res.status(200).json({ data: modeOfWorks });
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

module.exports = { modeOfWork, getAllModeOfWork };
