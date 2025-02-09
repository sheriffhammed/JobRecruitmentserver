const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.get("/", usersController.getAllUsers);
router.get("/getuserbyemail", usersController.getUser);
router.put("/updateuserbyemail", usersController.updateUser);
router.put("/updateuserbyid/:id", usersController.updateUserById);
router.delete("/deleteuserbyemail", usersController.deleteUser);

module.exports = router;
