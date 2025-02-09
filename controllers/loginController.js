const User = require("../model/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .sendStatus(400)
      .json({ message: "Email and password are required." });

  //Retreive User with the credentials from Database
  const retreiveUser = await User.findOne({ email }).exec();
  if (!retreiveUser)
    return res.sendStatus(401).json({ message: "Unauthorised User" });

  const passwordMatch = await bcrypt.compare(password, retreiveUser.password);
  if (passwordMatch) {
    // create JWTs
    const { id, firstName, lastName, email } = retreiveUser;
    const jwtUserDetails = { id, firstName, lastName, email };
    const roles = Object.values(retreiveUser.roles).filter(Boolean);
    //const roles = retreiveUser.roles;
    const accessToken = jwt.sign(
      { userDetails: jwtUserDetails, roles: roles },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "60m" }
    );
    const refreshToken = jwt.sign(
      { userDetails: jwtUserDetails },
      process.env.REFRESH_TOKEN_KEY,
      { expiresIn: "1d" }
    );

    retreiveUser.refreshToken = refreshToken;
    const addRefreshToken = await retreiveUser.save();

    if (addRefreshToken[0] === 0)
      return res
        .sendStatus(400)
        .json({ message: `Refresh Token Could not be added to database` });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ roles, accessToken, userId: id, firstName, lastName, email });
  } else {
    res.sendStatus(401).json({ message: "Invalid Password" });
  }
};

module.exports = { handleLogin };
