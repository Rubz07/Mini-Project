var express = require("express");
var router = express.Router();
const Login = require("../../APP/AUTHENTICATION/officerLogin");
const OfficerOperation = require("../../APP/OFFICER/officerOperation");
const { verifyOfficer } = require("../../AuthController/AuthController");
router.get("/", function (req, res, next) {
  res.send("officer");
});

router.post("/login", Login);

router.post("/getOfficerComplaint", verifyOfficer, (req, res) => {
  OfficerOperation.getOfficerComplaint(req.user.department).then((response) => {
    if (response) {
      res.status(200).json({ complaint: response });
    } else {
      res.status(401).json({ message: "some error occured" });
    }
  });
});

router.post("/getOfficerDetails", verifyOfficer, (req, res) => {
  OfficerOperation.getOfficerDetails(req.user.department).then((response) => {
    if (response) {
      res.status(200).json({ districts: response });
    } else {
      res.status(401).json({ message: "some error occured" });
    }
  });
});

router.post("/add-Subofficer", function (req, res, next) {
  OfficerOperation.createOfficer(req.body).then((response) => {
    try {
      if (response) {
        res.status(200).json({ verify: response });
      }
    } catch (error) {
      res.status(401).json({ message: error });
    }
  });
});

router.post("/get-DepartmentDetails", verifyOfficer, function (req, res, next) {
  res.status(200).json({ data: req.user });
});

module.exports = router;
