const User = require("../model/User");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");

const handleNewUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const data = {
      firstName,
      lastName,
      email,
      password: passwordHash,
    };
    //User Validations
    const validatorData = new Validator();
    const schema = {
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "email" },
      password: { type: "string" },
    };
    const check = validatorData.compile(schema);
    if (check(data) !== true) {
      return res
        .status(400)
        .json({ message: "Validation Errors", errors: check(data) });
    }
    //Check if User Exist before creating
    const checkUser = await User.findOne({ email }).exec();
    if (checkUser)
      return res.status(409).json({
        message: `User with this Email ${email} already Exist!`,
      });
    //create new user in the database
    const response = await User.create(data);
    if (res.status(201) && response) {
      res.status(201).json({
        message: `User with Eamil ${email} Created successfully`,
      });
    } else {
      return res.status(404).json({
        message: "Error Occured!!! User Could not be Created",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "User could not be Created - Something went wrong",
      error: error.message,
    });
  }
};

module.exports = { handleNewUser };
