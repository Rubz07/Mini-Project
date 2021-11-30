import React from "react";
import "./Navbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

function Navbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">CM-Portal</span>
        </div>
        <div className="topRight">
          {/* <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          /> */}
          <div className="userGreetings">
            <h4 className="greetingTitle">Hello</h4>
            <h2 className="userName">Rubin</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
