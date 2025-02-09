const express = require("express");
const router = express.Router();
const industryController = require("../../controllers/industryController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.post(
  "/",
  verifyRoles(ROLES_LIST.Admin),
  industryController.handleIndustry
);
router.get("/", industryController.getAllIndustry);
module.exports = router;
