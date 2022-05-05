import React from "react";
import { Link } from "react-router-dom";
import "./OfficerSidebar.css";
import {
  LineStyle,
  ExitToApp,
  WorkOutline,
  AddCircleOutlineOutlined,
} from "@material-ui/icons";

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

export default officerSidebar;
