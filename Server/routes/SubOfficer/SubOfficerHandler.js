var express = require("express");
var router = express.Router();
const Login = require("../../APP/AUTHENTICATION/subOfficerLogin");
const { verifyOfficer } = require("../../AuthController/AuthController");
const subOfficerOperation = require("../../APP/SUBOFFICER/subOfficerOperation");

router.get("/", function (req, res, next) {
  res.send("officer");
});

router.post("/login", Login);

router.post("/getSubOfficerComplaint", verifyOfficer, (req, res) => {
  subOfficerOperation.getSubOfficerComplaint(req.user.officerid)
    .then((response) => {
      if (response) {
        res.status(200).json({ complaint: response });
      } else {
        res.status(401).json({ message: "some error occured" });
      }
    });
});
module.exports = router;
