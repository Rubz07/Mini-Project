var express = require("express");
var router = express.Router();
const Login = require("../../APP/AUTHENTICATION/officerLogin");
const officerOperation = require("../../APP/OFFICER/officerOperation");
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

router.post("/getTicketRaisedComplaints", verifyOfficer, (req, res) => {
  OfficerOperation.getTicketRaisedComplaints(req.user.department).then(
    (response) => {
      if (response) {
        res.status(200).json({ complaint: response });
      } else {
        res.status(401).json({ message: "some error occured" });
      }
    }
  );
});

router.post("/getExplanation", verifyOfficer, (req, res) => {
  OfficerOperation.getExplanation(req.user.department).then((response) => {
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

router.post("/assigncomplaint", function (req, res, next) {
  OfficerOperation.assignSubOfficer(req.body).then((response) => {
    try {
      if (response === "success") {
        res.status(200).json({ verify: response });
      }
    } catch (error) {
      res.status(401).json({ message: error });
    }
  });
});

router.post("/assigncomplaint", function (req, res, next) {
  OfficerOperation.assignSubOfficer(req.body).then((response) => {
    try {
      if (response === "success") {
        res.status(200).json({ verify: response });
      }
    } catch (error) {
      res.status(401).json({ message: error });
    }
  });
});
router.get("/manageOfficers", async (req, res) => {
  officerOperation.manageOfficers().then((response) => {
    if (response) {
      res.status(200).json({ officer: response });
    } else {
      res.status(401).json({ message: "some error occured" });
    }
  });
});

router.post("/block-officer", async (req, res) => {
  officerOperation.blockOfficer(req.body).then((response) => {
    if (response) {
      res.status(200).json({ verify: "success" });
    } else {
      res.status(401).json({ message: "some error occured" });
    }
  });
});

router.post("/unblock-officer", async (req, res) => {
  officerOperation.unBlockOfficer(req.body).then((response) => {
    if (response) {
      res.status(200).json({ verify: "success" });
    } else {
      res.status(401).json({ message: "some error occured" });
    }
  });
});
router.post("/create-ComplaintData", async (req, res) => {
  officerOperation.createComplaintData(req.body).then((response) => {
    try {
      if (response === "success") {
        res.json({ status: true, message: "complaint succesfull created" });
      } else {
        res.json({ status: false, message: "complaint Already Created" });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
});
router.get("/getComplaintData", async (req, res) => {
  officerOperation.getAllComplaintDatas().then((response) => {
    try {
      if (response) {
        res.status(200).json({ complaintData: response });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
});

router.get("/getBankData", async (req, res) => {
  officerOperation.getAllBankDatas().then((response) => {
    try {
      if (response) {
        res.status(200).json({ bankData: response });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
});

router.post("/create-bank", async (req, res) => {
  officerOperation.createBankData(req.body).then((response) => {
    try {
      if (response === "success") {
        res.json({ status: true, message: "Bank succesfull Added" });
      } else {
        res.json({ status: false, message: "Bank Already Created" });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
});

router.post("/ClarificationAction", (req, res) => {
  officerOperation.askClarification(req.body).then((response) => {
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
