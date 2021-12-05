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

router.post("/create-department", function (req, res, next) {
  adminOperations.createDepartment(req.body).then((response) => {
    try {
      if (response) {
        res.status(200).json({ message: "Department succesfull created" });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
});

router.get("/get-departments", async (req, res) => {
  adminOperations.getAlldepartments().then((response) => {
    try {
      if (response) {
        res.status(200).json({ departments: response });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
});

router.post("/remove-department/:id", (req, res, next) => {
  adminOperations.removeDepartment(req.params.id).then((result) => {
    try {
      res.status(200).json({
        message: "deleted",
      });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
});

module.exports = router;
