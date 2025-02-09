const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(204); //No content
  const refreshToken = cookies.refreshToken;

  //Retreive User with the credentials from Database
  const retreiveUser = await User.findOne({ refreshToken }).exec();
  if (!retreiveUser) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  // Delete refreshToken in Database
  retreiveUser.refreshToken = "";
  const deleteRefreshToken = await retreiveUser.save();
  if (deleteRefreshToken[0] === 0)
    return res
      .sendStatus(400)
      .json({ message: `Refresh Token Could not be deleted from database` });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};

module.exports = { handleLogout };
