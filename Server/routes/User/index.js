var express = require("express");
var router = express.Router();
var users = require("../../model/userModel");
var Authentication = require("../../APP/AUTHENTICATION/auth");
var Login = require("../../app/AUTHENTICATION/Login");
var otpAuthentication = require("../../APP/AUTHENTICATION/otpAuthentication");
var userOperation = require("../../APP/USER/UserOperations");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("welcome");
});

router.post("/register", async (req, res, next) => {
  Authentication.userRegistration(req.body)
    .then((response) => {
      console.log(response);
      if (response) {
        res.status(200).json({ message: "success" });
      } else {
        console.log("hi");
        res.json({ message: "user already registered" });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});
router.post("/otpAuthentication", async (req, res, next) => {
  otpAuthentication.otpAuthentication(req.body.mobile).then((response) => {
    if (response.register_status) {
      res.status(200).json({ message: "otp sended" });
    } else {
      res.status(401).json({ message: "some error occured" });
    }
  });
});

router.post("/otpVerification", async (req, res, next) => {
  otpAuthentication
    .otpVerification(req.body.otpcode, req.body.mobile)
    .then((response) => {
      if (response.register_status) {
        res.status(200).json({ message: "Successfully verified" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", Login);

router.post("/postcomplaint", async (req, res) => {
  console.log("hii");
  userOperation.postComplaint(req.body).then((response) => {
    if (response.register_status) {
      res.status(200).json({ message: "otp sended" });
    } else {
      res.status(401).json({ message: "some error occured" });
    }
  });
});

router.get("/getComplaint", async (req, res) => {
  userOperation.getAllComplaints().then((response) => {
    console.log(response);
    if (response) {
      res.status(200).json({ complaint: response, count: response.length });
    } else {
      res.status(401).json({ message: "some error occured" });
    }
  });
});

module.exports = router;
