import React from "react";
import "./SideBarAdmin.css";

import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  NotificationsNone,
  Storefront,
  AttachMoney,
  BarChart,
  ExitToApp,
  WorkOutline,
  Report,
  AddCircleOutlineOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const termination = () => {
  window.localStorage.removeItem("auth-token");
};
function SideBarAdmin() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h2 className="sidebarTitle">Dashboard</h2>
          <ul className="sidebarList">
            <Link to="/Admindashboard" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h2 className="sidebarTitle">Quick Menu</h2>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/complaints" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Complaint Report
                {/* <span className="topIconBadge">2</span> */}
              </li>
            </Link>

            <Link to="/departments" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Departments
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h2 className="sidebarTitle">Officer</h2>
          <ul className="sidebarList">
            <Link to="/add-officer" className="link">
              <li className="sidebarListItem">
                <AddCircleOutlineOutlined className="sidebarIcon" />
                Add Officer
              </li>
            </Link>
            <Link to="/officers" className="link">
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                Manage
              </li>
            </Link>
            {/* <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>

        <div className="sidebarMenu">
          <h2 className="sidebarTitle"></h2>
          <ul className="sidebarList">
            <Link to="/login" className="link">
              <li className="sidebarListItem" onClick={termination}>
                <ExitToApp className="sidebarIcon logout" />
                Logout
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBarAdmin;
