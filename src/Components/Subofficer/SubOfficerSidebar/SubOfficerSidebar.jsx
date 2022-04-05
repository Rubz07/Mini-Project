import React from "react";
import { Link } from "react-router-dom";
import "./SubOfficerSidebar.css";
import {
  LineStyle,
  ExitToApp,
  WorkOutline,
  AddCircleOutlineOutlined,
} from "@material-ui/icons";
function SubOfficerSidebar() {
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

        <div className="subOfficerSidebarMenu">
          <h2 className="subOfficerSidebarTitle"></h2>
          <ul className="subOfficerSidebarList">
            <Link to="/SubOfficerlogin" className="link">
              <li className="subOfficerSidebarListItem" onClick={termination}>
                <ExitToApp className="subOfficerSidebarIcon" />
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
