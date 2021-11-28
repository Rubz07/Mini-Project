import React from "react";
import logo from "../../../Assets/images/logo.svg";
import { Link, Route, useLocation, useHistory } from "react-router-dom";
import "./Sidebar.css";
function Sidebar({ sidebarOpen, closeSidebar }) {
  const history = useHistory();
  const termination = async () => {
    window.localStorage.removeItem("auth");
    history.push("/login");
  };
  return (
    <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>Cmportal</h1>
        </div>
        <i
          className="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSidebar()}
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>

          <Link to="/dashboard">Dashboard</Link>
        </div>
        <h2>COMPLAINT</h2>
        <div className="sidebar__link">
          <i className="fa fa-plus"></i>
          <Link to="/selectCategory">Lodge Public Grievance</Link>
          {/* <a href="#"></a> */}
        </div>
        <div className="sidebar__link">
          <i className="fa fa-history"></i>
          <a href="#">Account Activity</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-edit"></i>
          <a href="#">Edit Profile</a>
        </div>

        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <Link onClick={termination}>Log out</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
