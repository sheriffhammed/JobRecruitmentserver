const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result)
      return res
        .sendStatus(401)
        .json({ message: "Unauthorised Access to API" });
    next();
  };
};

module.exports = verifyRoles;
