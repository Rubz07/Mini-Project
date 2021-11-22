import React from "react";
import logo from "../../../Assets/images/logo.svg";
import { Link, Route, useLocation } from "react-router-dom";
import "./Sidebar.css";
function Sidebar({ sidebarOpen, closeSidebar }) {
  console.log(closeSidebar);
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

          <a href="#">Dashboard</a>
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
          <a href="#">Log out</a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
