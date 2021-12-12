var express = require("express");
const AdminOperations = require("../../APP/ADMIN/AdminOperations");
var router = express.Router();
const adminOperations = require("../../APP/ADMIN/AdminOperations");
router.get("/", function (req, res, next) {
  res.send("ADMIN");
});

router.get("/getUsers", async (req, res) => {
  adminOperations.getAllUsers().then((response) => {
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

router.post("/update-department", function (req, res, next) {
  adminOperations.updateDepartment(req.body).then((response) => {
    try {
      if (response) {
        res.status(200).json({ message: "Department updated Successfully" });
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

router.post("/blockUser/:id", (req, res, next) => {
  adminOperations.blockUser(req.params.id).then((result) => {
    try {
      res.status(200).json({
        message: "deleted",
      });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
});

router.post("/deleteUser/:id", (req, res, next) => {
  adminOperations.deleteUser(req.params.id).then((result) => {
    try {
      res.status(200).json({
        message: "deleted",
      });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
});

router.post("/add-officer", function (req, res, next) {
  adminOperations.createOfficer(req.body).then((response) => {
    try {
      if (response) {
        res.status(200).json({ verify: response });
      }
    } catch (error) {
      res.status(401).json({ message: error });
    }
  });
});

router.get("/getComplaint", async (req, res) => {
  AdminOperations.getAllComplaints().then((response) => {
    if (response) {
      res.status(200).json({ complaint: response, count: response.length });
    } else {
      res.status(401).json({ message: "some error occured" });
    }
  });
});

router.post("/assign-complaint", function (req, res, next) {
  console.log("bruuuu");
  adminOperations.assignComplaint(req.body).then((response) => {
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
