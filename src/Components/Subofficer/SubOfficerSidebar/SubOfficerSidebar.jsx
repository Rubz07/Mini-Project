import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SubOfficerSidebar.css";
import axios from "../../../axios";
import { LineStyle, ExitToApp, WorkOutline } from "@material-ui/icons";
function SubOfficerSidebar() {
  const [excalatedComplaints, setEscalatedComplaints] = useState([]);

  async function getEscalatedComplaints() {
    const token = localStorage.getItem("Subofficer-token");

    let response = await axios.post(`subofficer/getEscalatedComplaints`, {
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      setEscalatedComplaints(response.data.complaint.length);
    }
  }

  useEffect(() => {
    getEscalatedComplaints();
  }, []);

  const termination = () => {
    window.localStorage.removeItem("Subofficer-token");
  };
  return (
    <div className="subOfficerSidebar">
      <div className="subOfficerSidebarWrapper">
        <div className="subOfficerSidebarMenu">
          <h2 className="subOfficerSidebarTitle">Dashboard</h2>
          <ul className="subOfficerSidebarList">
            <Link to="/Officerdashboard" className="link">
              <li className="subOfficerSidebarListItem active">
                <LineStyle className="subOfficerSidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h2 className="sidebarTitle">Complaint</h2>
          <ul className="sidebarList">
            <Link to="/EscalatedComplaints" className="link">
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                Escalation
                <div
                  className="topbarIconContainer "
                  style={{ marginLeft: "20px" }}
                >
                  <span className="topIconBadge">{excalatedComplaints}</span>
                </div>
              </li>
            </Link>
          </ul>
        </div>

        <div className="subOfficerSidebarMenu">
          <h2 className="subOfficerSidebarTitle"></h2>
          <ul className="subOfficerSidebarList">
            <Link to="/SubOfficerlogin" className="link">
              <li className="subOfficerSidebarListItem" onClick={termination}>
                <ExitToApp className="subOfficerSidebarIcon logout" />
                Logout
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SubOfficerSidebar;
