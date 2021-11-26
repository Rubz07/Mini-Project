const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const verifyLoggin = (req, res, next) => {
  console.log("ruuuuuuuuuuuuuuu");
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied");
  try {
    const verified = jwt.verify(token, process.env.SECRET_CODE);
    req.user = verified;
    console.log("hloooo", req.user);
    req.status(200).json({ user: req.user });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
module.exports = { verifyLoggin };
