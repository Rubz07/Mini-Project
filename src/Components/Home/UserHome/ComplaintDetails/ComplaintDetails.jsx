import React, { useEffect, useState } from "react";
import "./ComplaintDetails.css";
import axios from "../../../../axios";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ComplaintCount from "../ComplaintCount/ComplaintCount";
import ComplaintList from "../ComplaintList/ComplaintList";

function ComplaintDetails() {
 
  const [complaints, setComplaints] = useState([]);

  async function getComplaints() {
    let response = await axios.get(`/getComplaint`);
    if (response.status === 200) {
      setComplaints(response.data.complaint);
    }
  }

  useEffect(() => {
    getComplaints();
  }, []);
  return (
    <Router>
      <Switch>
        <div className="userHome">
          <ComplaintCount complaint={complaints} />
          <div className="complaintTable">
            <ComplaintList complaint={complaints} />
          </div>
        </div>
      </Switch>
    </Router>
  );
}
export default ComplaintDetails;
