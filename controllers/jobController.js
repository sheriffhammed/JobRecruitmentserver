const Job = require("../model/Job");
const Industry = require("../model/industry");
const ModeOfWork = require("../model/modeofwork");
const Experience = require("../model/experience");
const Validator = require("fastest-validator");
const { searchJob } = require("../utils/searchJob");

const handleNewJob = async (req, res) => {
  const {
    title,
    description,
    company,
    salary,
    location,
    jobType,
    modeOfWork,
    industry,
    experience,
    user,
  } = req.body;

  try {
    const data = {
      title,
      description,
      company,
      salary,
      location,
      jobType,
      modeOfWork,
      industry,
      experience,
      user,
    };
    //User Validations
    const validatorData = new Validator();
    const schema = {
      title: { type: "string" },
      description: { type: "string" },
      company: { type: "string" },
      salary: { type: "string" },
      location: { type: "string" },
      jobType: { type: "string" },
      modeOfWork: { type: "string" },
      industry: { type: "string" },
      experience: { type: "string" },
      user: { type: "string" },
    };
    const check = validatorData.compile(schema);
    if (check(data) !== true) {
      return res
        .status(400)
        .json({ message: "Validation Errors", errors: check(data) });
    }
    //create new job in the database
    const response = await Job.create(data);
    if (res.status(201) && response) {
      res.status(201).json({
        message: `Job Created successfully`,
      });
    } else {
      return res.status(404).json({
        message: "Error Occured!!! Job Could not be Created",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Job could not be Created - Something went wrong",
      error: error.message,
    });
  }
};

//Retreive All Jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("jobType", "description -_id")
      .populate("modeOfWork", "description -_id")
      .populate("industry", "description -_id")
      .populate("experience", "description -_id")
      .populate("user", "firstName lastName")
      .exec();

    if (res.status(200) && jobs) {
      res.status(200).json({ data: jobs });
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
//Retreive Job by Id
const getJobById = async (req, res) => {
  const id = req.params.id;
  try {
    const jobs = await Job.find({ _id: id })
      .populate("jobType", "description _id")
      .populate("modeOfWork", "description _id")
      .populate("industry", "description _id")
      .populate("experience", "description _id")
      .populate("user", "firstName lastName")
      .exec();

    if (res.status(200) && jobs) {
      res.status(200).json({ data: jobs });
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

//Retreive jobs industry
const getJobsByIndustry = async (req, res) => {
  const getIndustry = await Industry.findOne({
    description: req.query.industry,
  });
  searchJob(Job, { industry: getIndustry._id }, res);
};

//Retreive jobs by experience
const getJobsByexperience = async (req, res) => {
  const getexperience = await Experience.findOne({
    description: req.query.experience,
  });
  searchJob(Job, { experience: getexperience._id }, res);
};

//Retreive jobs mode of work
const getJobsByModeOfWork = async (req, res) => {
  const getmodeOfWork = await ModeOfWork.findOne({
    description: req.query.modeofwork,
  });
  searchJob(Job, { modeOfWork: getmodeOfWork._id }, res);
};

//Search job by title
const getJobByTitle = (req, res) => {
  searchJob(Job, { title: req.query.title }, res);
};

//Search job by location
const getJobByLocation = (req, res) => {
  searchJob(Job, { location: req.query.location }, res);
};

//Search job by Industry
const getJobByCompany = (req, res) => {
  searchJob(Job, { company: req.query.company }, res);
};

//Delete job
const deleteJob = async (req, res) => {
  const id = req.params.id;
  try {
    const job = await Job.deleteOne({ _id: id });
    if (res.status(200) && job) {
      res.status(200).json({ message: `Job deleted successfully` });
    } else {
      res.status(400).json({ message: `No Job found` });
    }
  } catch (error) {
    res.status(500).json({
      message: "Sorry something went wrong, Job couldnot be deleted",
      error: error.message,
    });
  }
};

//Update Job by Id
const updateJobById = async (req, res) => {
  const id = req.params.id;
  let data;
  try {
    data = {
      title: req.body.title,
      description: req.body.description,
      company: req.body.company,
      salary: req.body.salary,
      location: req.body.location,
      jobType: req.body.jobType,
      modeOfWork: req.body.modeOfWork,
      industry: req.body.industry,
      experience: req.body.experience,
    };
    const job = await Job.findOne({ _id: id }).exec();
    if (!job) {
      return res.status(400).json({
        message: `Error Occured!!! Job Could not be Updated`,
      });
    }
    job.title = data.title;
    job.description = data.description;
    job.company = data.company;
    job.salary = data.salary;
    job.location = data.location;
    job.jobType = data.jobType;
    job.modeOfWork = data.modeOfWork;
    job.industry = data.industry;
    job.industry = data.industry;

    const updateJob = await job.save();
    res.json({
      message: `Job updated successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Job could not be Updated - Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  handleNewJob,
  getAllJobs,
  getJobByTitle,
  getJobByLocation,
  getJobByCompany,
  getJobsByIndustry,
  getJobsByModeOfWork,
  getJobsByexperience,
  deleteJob,
  updateJobById,
  getJobById,
};
