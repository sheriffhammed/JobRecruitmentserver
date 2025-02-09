const express = require("express");
const router = express.Router();
const jobsController = require("../../controllers/jobController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.post("/", jobsController.handleNewJob);
router.get("/", jobsController.getAllJobs);
router.get("/getjobbytitle", jobsController.getJobByTitle);
router.get("/getjobbylocation", jobsController.getJobByLocation);
router.get("/getjobbycompany", jobsController.getJobByCompany);
router.get("/getjobbyindustry", jobsController.getJobsByIndustry);
router.get("/getjobbymodeofwork", jobsController.getJobsByModeOfWork);
router.get("/getjobbyexperience", jobsController.getJobsByexperience);
router.delete("/:id", jobsController.deleteJob);
router.put("/:id", jobsController.updateJobById);
router.get("/:id", jobsController.getJobById);
module.exports = router;
