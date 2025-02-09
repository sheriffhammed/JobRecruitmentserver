const express = require("express");
const router = express.Router();
const jobApplicationController = require("../../controllers/jobApplicationController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.post("/", jobApplicationController.handleNewApplication);
router.get("/", jobApplicationController.getAllApplications);
router.delete("/:id", jobApplicationController.deleteApplication);
router.get("/:jobId", jobApplicationController.getApplicatonsByJobId);
router.get("/user/:userId", jobApplicationController.getApplicatonsByUserId);

module.exports = router;
