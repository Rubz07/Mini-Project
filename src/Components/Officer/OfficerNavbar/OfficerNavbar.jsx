import React, { useContext } from "react";
import { userContext } from "../../../AppContext";
import "./OfficerNavbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

function OfficerNavbar() {
  // const { userdata } = useContext(userContext);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Department</span>
        </div>
        <div className="topRight">
          {/* <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default OfficerNavbar;
