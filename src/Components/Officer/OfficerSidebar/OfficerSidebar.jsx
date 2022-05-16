import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./OfficerSidebar.css";
import axios from "../../../axios";
import {
  LineStyle,
  ExitToApp,
  WorkOutline,
  AddCircleOutlineOutlined,
} from "@material-ui/icons";

function OfficerSidebar() {
  const [TicketRaisedComplaints, setTicketRaisedComplaints] = useState();
  // const TicketDiv = document.querySelector(".topbarIconContainer");
  const termination = () => {
    window.localStorage.removeItem("officer-token");
  };

  async function getTicketRaisedComplaints() {
    const token = localStorage.getItem("officer-token");

    let response = await axios.post(`officer/getTicketRaisedComplaints`, {
      headers: { Authorization: token },
    });
    if (response.status === 200 && response.data.complaint.length > 0) {
      setTicketRaisedComplaints(response.data.complaint.length);
      // TicketDiv.classList.remove("ticketCount-hidden");
    }
  }

  useEffect(() => {
    getTicketRaisedComplaints();
  }, []);

  return (
    <div className="officerSidebar">
      <div className="officerSidebarWrapper">
        <div className="officerSidebarMenu">
          <h2 className="officerSidebarTitle">Dashboard</h2>
          <ul className="officerSidebarList">
            <Link to="/Officerdashboard" className="link">
              <li className="officerSidebarListItem active">
                <LineStyle className="officerSidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h2 className="sidebarTitle">Complaint</h2>
          <ul className="sidebarList">
            <Link to="/TicketRaised" className="link">
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                Tickets
                <div
                  className="topbarIconContainer "
                  style={{ marginLeft: "20px" }}
                >
                  <span className="topIconBadge">{TicketRaisedComplaints}</span>
                </div>
              </li>
            </Link>
            <Link to="/Complaint-data" className="link">
              <li className="sidebarListItem">
                <AddCircleOutlineOutlined className="sidebarIcon" />
                Complaint Data
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h2 className="sidebarTitle">Officer</h2>
          <ul className="sidebarList">
            <Link to="/add-subofficer" className="link">
              <li className="sidebarListItem">
                <AddCircleOutlineOutlined className="sidebarIcon" />
                Add Officer
              </li>
            </Link>
            <Link to="/manage-officers" className="link">
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                Manage
              </li>
            </Link>
          </ul>
        </div>

        <div className="officerSidebarMenu">
          <h2 className="officerSidebarTitle"></h2>
          <ul className="officerSidebarList">
            <Link to="/Officerlogin" className="link">
              <li className="officerSidebarListItem" onClick={termination}>
                <ExitToApp className="officerSidebarIcon logout" />
                Logout
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OfficerSidebar;
