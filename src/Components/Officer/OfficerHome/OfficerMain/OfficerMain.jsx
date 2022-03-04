import React, { useState, useEffect } from "react";
import "./OfficerMain.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import axios from "../../../../axios";
import OfficerCount from "../OfficerCount/OfficerCount";
import OfficerComplaintList from "../OfficerComplaintList/OfficerComplaintList";
function OfficerMain() {
  const [complaints, setComplaints] = useState([]);
  const [officerDetatls, setOfficerDetails] = useState([]);

  async function getOfficerComplaints() {
    const token = localStorage.getItem("officer-token");

    let response = await axios.post(`officer/getOfficerComplaint`, {
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      setComplaints(response.data.complaint);
    }
  }

  async function getOfficerDetails() {
    const token = localStorage.getItem("officer-token");

    let response = await axios.post(`officer/getOfficerDetails`, {
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      setOfficerDetails(response.data.districts);
    }
  }

  useEffect(() => {
    getOfficerComplaints();
    getOfficerDetails();
  }, []);
  return (
    <Router>
      <Switch>
        <div className="officerHome">
          <OfficerCount complaint={complaints} />
          <div className="complaintTable">
            <OfficerComplaintList
              complaint={complaints}
              officerDetails={officerDetatls}
            />
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default OfficerMain;
