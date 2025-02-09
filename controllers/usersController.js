const User = require("../model/User");

//Retreive All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { firstName: 1, lastName: 2, email: 3, roles: 4 }
    );

    if (res.status(200) && users) {
      res.status(200).json({ data: users });
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
//Delete User
const deleteUser = async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ message: "User Email required" });
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res
        .status(204)
        .json({ message: `User with email ${email} not found` });
    }
    const deleteUser = await user.deleteOne({ email });
    res.status(200).json({ message: `User deleted successfully` });
  } catch (error) {
    return res.status(500).json({
      message: "Sorry something went wrong, user couldnot be deleted",
      error: error.message,
    });
  }
};

//Get User by Email
const getUser = async (req, res) => {
  const email = req.query.email;
  try {
    const user = await User.findOne(
      { email },
      { firstName: 1, lastName: 2, email: 3 }
    ).exec();

    if (res.status(200) && user) {
      res.status(200).json({ data: user }, null, 2);
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

//Update User
const updateUser = async (req, res) => {
  const email = req.query.email;
  let data;
  try {
    data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(400).json({
        message: `Error Occured!!! User Could not be Updated`,
      });
    }
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    const updateUser = await user.save();
    res.json({
      message: `User with with ${email} updated successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "User could not be Updated - Something went wrong",
      error: error.message,
    });
  }
};
//Update User by Id
const updateUserById = async (req, res) => {
  const id = req.params.id;
  let data;
  try {
    data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };
    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
      return res.status(400).json({
        message: `Error Occured!!! User Could not be Updated`,
      });
    }
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    const updateUser = await user.save();
    res.json({
      message: `User with with ${email} updated successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "User could not be Updated - Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
  updateUserById,
};
