const express = require("express");
const router = express.Router();
const experienceController = require("../../controllers/experienceController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.post(
  "/",
  verifyRoles(ROLES_LIST.Admin),
  experienceController.handleExperience
);
router.get("/", experienceController.getAllExperience);
module.exports = router;
