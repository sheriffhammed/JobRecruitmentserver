const industry = require("../model/industry");
const { jobFunction } = require("../utils/jobFunction");

const handleIndustry = async (req, res) => {
  const { description, user } = req.body;
  jobFunction(industry, description, user, res);
};

//Retreive All Industry
const getAllIndustry = async (req, res) => {
  try {
    const industries = await industry.find({});

    if (res.status(200) && industries) {
      res.status(200).json({ data: industries });
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

module.exports = { handleIndustry, getAllIndustry };
