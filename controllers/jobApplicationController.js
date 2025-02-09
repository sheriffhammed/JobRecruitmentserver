const JobApplication = require("../model/JobApplication");

//Add Application
const handleNewApplication = async (req, res) => {
  try {
    const data = {
      job: req.body.jobId,
      user: req.body.userId,
    };
    //Create New Application
    const application = await JobApplication.create(data);
    if (res.status(201) && application) {
      res.status(201).json({
        message: "Job Application added successfully",
      });
    } else {
      return res.status(404).json({
        message: "Error Occured!!! Application Could not be added",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Application could not be added - Something went wrong",
      error: error.message,
    });
  }
};

//Retreive All Applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find()
      .populate("job", "title description company location salary -_id")
      .populate("user", "firstName lastName email")
      .exec();
    if (res.status(200) && applications) {
      res.status(200).json({ data: applications });
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

//Delete Like
const deleteApplication = async (req, res) => {
  const id = req.params.id;
  try {
    const application = await JobApplication.deleteOne({ _id: id });
    if (res.status(200) && application) {
      res.status(200).json({ message: `Application deleted successfully` });
    } else {
      res.status(400).json({ message: `No Like found` });
    }
  } catch (error) {
    res.status(500).json({
      message: "Sorry something went wrong, Application couldnot be deleted",
      error: error.message,
    });
  }
};

//Retreive Likes by Job ID
const getApplicatonsByJobId = async (req, res) => {
  const jobId = req.params.jobId;
  try {
    const applications = await JobApplication.find({ job: jobId })
      .populate("job", "title description company location salary -_id")
      .populate("user", "firstName lastName email")
      .exec();
    if (res.status(200) && applications) {
      res.status(200).json({ data: applications });
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
//Retreive Likes by User ID
const getApplicatonsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const applications = await JobApplication.find({ user: userId })
      .populate("job", "title description company location salary -_id")
      .populate("user", "firstName lastName email")
      .exec();
    if (res.status(200) && applications) {
      res.status(200).json({ data: applications });
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

module.exports = {
  handleNewApplication,
  getAllApplications,
  deleteApplication,
  getApplicatonsByJobId,
  getApplicatonsByUserId,
};
