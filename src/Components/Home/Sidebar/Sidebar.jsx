import React from "react";
import {
  Link,
  Route,
  Router,
  useLocation,
  useHistory,
  Redirect,
} from "react-router-dom";
import "./Sidebar.css";
import {
  LineStyle,
  AddCircleOutline,
  Edit,
  Autorenew,
  Lock,
  ExitToApp,
} from "@material-ui/icons";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
function Sidebar() {
  const history = useHistory();
  const termination = () => {
    window.localStorage.removeItem("auth-token");
    history.push("/login");
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h2 className="sidebarTitle">Dashboard</h2>
          <ul className="sidebarList">
            <Link to="/dashboard" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h2 className="sidebarTitle">Complaints</h2>
          <ul className="sidebarList">
            <Link to="/categories" className="link">
              <li className="sidebarListItem">
                <AddCircleOutline className="sidebarIcon" />
                Lodge Public Grievance
              </li>
            </Link>
            <Link to="/complaint-status" className="link" id="cmpstatus">
              <li className="sidebarListItem">
                <Autorenew className="sidebarIcon" />
                Grievance Status
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h2 className="sidebarTitle">Profile</h2>
          <ul className="sidebarList">
            <Link to="/editprofile" className="link">
              <li className="sidebarListItem">
                <Edit className="sidebarIcon" />
                Edit Profile
              </li>
            </Link>
            <Link to="/change-password" className="link">
              <li className="sidebarListItem">
                <Lock className="sidebarIcon" />
                Change Password
              </li>
            </Link>
            <Link to="/faq" className="link">
              <li className="sidebarListItem">
                <LiveHelpIcon className="sidebarIcon" />
                Faq
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h2 className="sidebarTitle"></h2>
          <ul className="sidebarList">
            <Link to="/login" className="link">
              <li className="sidebarListItem" onClick={termination} id="logout">
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

export default Sidebar;
