import React, { useState, useEffect } from "react";
import "./SubOfficerHome.css";
import axios from "../../../../axios";
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import SubOfficerCount from "../SubOfficerCount/SubOfficerCount";
import SubOfficerComplaintList from "../SubOfficerComplaintList/SubOfficerComplaintList";
function SubOfficerHome() {
  const [complaints, setComplaints] = useState([]);

  async function getOfficerComplaints() {
    const token = localStorage.getItem("Subofficer-token");

    let response = await axios.post(`subofficer/getSubOfficerComplaint`, {
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      setComplaints(response.data.complaint);
    }
  }

  const history = useHistory();

  useEffect(() => {
    const isToken = localStorage.getItem("Subofficer-token");
    if (!isToken) {
      history.push("/SubOfficerlogin");
    } else {
      getOfficerComplaints();
    }
  }, [history]);

  return (
    <Router>
      <Switch>
        <div className="subofficerHome">
          <SubOfficerCount complaint={complaints} />
          <div className="complaintTable">
            <SubOfficerComplaintList />
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default SubOfficerHome;
