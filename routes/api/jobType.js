const express = require("express");
const router = express.Router();
const jobTypeController = require("../../controllers/JobTypeCotroller");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.post(
  "/",
  verifyRoles(ROLES_LIST.Admin),
  jobTypeController.handleNewJobType
);
router.get("/", jobTypeController.getAllJobTypes);
module.exports = router;
