var express = require("express");
var router = express.Router();
const adminOperations = require("../../APP/ADMIN/AdminOperations");
router.get("/", function (req, res, next) {
  res.send("ADMIN");
});

router.get("/getUsers", async (req, res) => {
  adminOperations.getAllUsers().then((response) => {
    console.log(response);
    if (response) {
      res.status(200).json({ users: response });
    } else {
      res.status(401).json({ message: "some error occured" });
    }
  });
});
module.exports = router;
