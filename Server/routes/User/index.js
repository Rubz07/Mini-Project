var express = require("express");
var router = express.Router();
var users = require("../../model/userModel");
var Authentication = require("../../APP/AUTHENTICATION/auth");
var Login = require("../../app/AUTHENTICATION/Login");
var otpAuthentication = require("../../APP/AUTHENTICATION/otpAuthentication");
var userOperation = require("../../APP/USER/UserOperations");
var { verifyLoggin } = require("../../AuthController/AuthController");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("welcome");
});

router.post("/register", async (req, res, next) => {
  Authentication.userRegistration(req.body).then((response) => {
    try {
      if (response) {
        console.log(response);
        res.status(200).json({ verify: response });
      }
    } catch (error) {
      res.status(401).json({ message: error });
    }
  });
});
router.post("/otpAuthentication", async (req, res, next) => {
  otpAuthentication.otpAuthentication(req.body.mobile).then((response) => {
    if (response) {
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
      try {
        if (response) {
          res.status(200).json({ verify: response });
        }
      } catch (error) {
        res.status(401).json({ message: error });
      }
    });
});

router.post("/login", Login);
router.post("/isAuthenticated", verifyLoggin, (req, res) => {
  res.json({ user: req.user });
});

router.post("/postcomplaint", async (req, res) => {
  userOperation.postComplaint(req.body).then((response) => {
    if (response.register_status) {
      res.status(200).json({ message: "complaint registered successfully" });
    } else {
      res.status(401).json({ message: "some error occured" });
    }
  });
});

router.get("/getComplaint", async (req, res) => {
  userOperation.getAllComplaints().then((response) => {
    if (response) {
      res.status(200).json({ complaint: response, count: response.length });
    } else {
      res.status(401).json({ message: "some error occured" });
    }
  });
});

router.post("/getUserComplaint", verifyLoggin, (req, res) => {
  userOperation.getUserComplaint(req.user.userid).then((response) => {
    if (response) {
      res.status(200).json({ complaint: response });
    } else {
      res.status(401).json({ message: "some error occured" });
    }
  });
});

router.get("/getstatus/:id", (req, res, next) => {
  userOperation.getStatusDetails(req.params.id).then((result) => {
    try {
      res.status(200).json({
        statusdetails: result,
        message: "fetched",
      });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
});

router.post("/changepass", verifyLoggin, async (req, res, next) => {
  otpAuthentication.otpAuthentication(req.user.mobileno).then((response) => {
    if (response) {
      res.status(200).json({
        message: "otp sended",
        userid: req.user.userid,
        mobile: req.user.mobileno,
      });
    } else {
      res.status(401).json({ message: "some error occured" });
    }
  });
});

router.post("/updatepassword", (req, res, next) => {
  userOperation.updatePassword(req.body).then((result) => {
    try {
      if (result) {
        res.status(200).json({
          message: "updated",
        });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
});
router.post("/verify-passotp", async (req, res, next) => {
  otpAuthentication
    .otpVerification(req.body.otpcode, req.body.mobile)
    .then((response) => {
      try {
        if (response) {
          res.status(200).json({ verify: response });
        }
      } catch (error) {
        res.status(401).json({ message: error });
      }
    });
});

module.exports = router;
