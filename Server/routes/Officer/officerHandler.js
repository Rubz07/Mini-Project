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

module.exports = router;
