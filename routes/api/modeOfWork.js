const express = require("express");
const router = express.Router();
const modeOfWorkController = require("../../controllers/modeOfWorkController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.post(
  "/",
  verifyRoles(ROLES_LIST.Admin),
  modeOfWorkController.modeOfWork
);
router.get("/", modeOfWorkController.getAllModeOfWork);
module.exports = router;
