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
  subOfficerOperation
    .getSubOfficerComplaint(req.user.district)
    .then((response) => {
      if (response) {
        res.status(200).json({ complaint: response });
      } else {
        res.status(401).json({ message: "some error occured" });
      }
    });
});

router.post("/complaintAction", (req, res) => {
  subOfficerOperation.complaintAction(req.body).then((response) => {
    console.log(response);
    try {
      if (response === "success") {
        res.status(200).json({ verify: response });
      }
    } catch (error) {
      res.status(401).json({ message: error });
    }
  });
});

router.post("/reportAction", (req, res) => {
  subOfficerOperation.sendReport(req.body).then((response) => {
    console.log(response);
    try {
      if (response === "success") {
        res.status(200).json({ verify: response });
      }
    } catch (error) {
      res.status(401).json({ message: error });
    }
  });
});

module.exports = router;
