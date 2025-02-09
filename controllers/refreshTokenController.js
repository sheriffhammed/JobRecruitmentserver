const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken)
    return res.status(401).json({ message: "Unauthorised User" });
  const refreshToken = cookies.refreshToken;

  //Retreive User with the credentials from Database
  const retreiveUser = await User.findOne({ refreshToken }).exec();
  if (!retreiveUser)
    return res.status(401).json({ message: "Unauthorised User" });
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Refresh Token" });
    const roles = Object.values(retreiveUser.roles);
    const accessToken = jwt.sign(
      { userDetails: decoded.userDetails, roles: roles },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "60m" }
    );
    res.json({ roles, accessToken });
  });
};

module.exports = { handleRefreshToken };
