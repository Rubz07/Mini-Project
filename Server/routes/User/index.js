var express = require("express");
var router = express.Router();
var users = require("../../model/userModel");
var Authentication = require("../../APP/AUTHENTICATION/auth");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("welcome");
});

router.post("/register", async (req, res, next) => {
  Authentication.userRegistration(req.body)
    .then((response) => {
      if (response.register_status == true) {
        res.status(200).json({ message: "success" });
      } else {
        res.json({ message: "user already registered" });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});
router.post("/login", async (req, res, next) => {});

module.exports = router;
