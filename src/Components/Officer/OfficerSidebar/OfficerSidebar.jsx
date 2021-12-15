import React from "react";
import { Link } from "react-router-dom";
import "./OfficerSidebar.css";
import { LineStyle, ExitToApp } from "@material-ui/icons";

function officerSidebar() {
  const termination = () => {
    window.localStorage.removeItem("officer-token");
  };
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
        {/* <div className="officerSidebarMenu">
          <h2 className="officerSidebarTitle">Complaints</h2>
          <ul className="officerSidebarList">
            <Link to="/categories" className="link">
              <li className="officerSidebarListItem">
                <AddCircleOutline className="officerSidebarIcon" />
                Lodge Public Grievance
              </li>
            </Link>
            <Link to="/complaint-status" className="link">
              <li className="officerSidebarListItem">
                <Autorenew className="officerSidebarIcon" />
                Grievance Status
              </li>
            </Link>
          </ul>
        </div> */}
        {/* <div className="officerSidebarMenu">
          <h2 className="officerSidebarTitle">Profile</h2>
          <ul className="officerSidebarList">
            <Link to="/editprofile" className="link">
              <li className="officerSidebarListItem">
                <Edit className="officerSidebarIcon" />
                Edit Profile
              </li>
            </Link>
            <Link to="/change-password" className="link">
              <li className="officerSidebarListItem">
                <Lock className="officerSidebarIcon" />
                Change Password
              </li>
            </Link>
          </ul>
        </div> */}
        <div className="officerSidebarMenu">
          <h2 className="officerSidebarTitle"></h2>
          <ul className="officerSidebarList">
            <Link to="/Officerlogin" className="link">
              <li className="officerSidebarListItem" onClick={termination}>
                <ExitToApp className="officerSidebarIcon" />
                Logout
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default officerSidebar;
