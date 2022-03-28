const jwt = require("jsonwebtoken");

const verifyLoggin = (req, res, next) => {
  const token = req.body.headers.Authorization;
  if (!token) return res.status(401).send("Access denied");
  try {
    const verified = jwt.verify(token, process.env.SECRET_CODE);
    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const verifyOfficer = (req, res, next) => {
  const token = req.body.headers.Authorization;
  if (!token) return res.status(401).send("Access denied");
  try {
    const verified = jwt.verify(token, process.env.SECRET_CODE);

    req.user = verified;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
module.exports = { verifyLoggin, verifyOfficer };
