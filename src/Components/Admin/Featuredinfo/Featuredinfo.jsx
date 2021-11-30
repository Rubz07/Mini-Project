import React from "react";
import { Save } from "@material-ui/icons";
import "./Featuredinfo.css";
function Featuredinfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <div className="featuredMoneyContainer">
          <Save className="featuredIcon " />
          <span className="featuredMoney">0</span>
        </div>
        <span className="featuredSub">Pending To Assign</span>
      </div>
      <div className="featuredItem">
        <div className="featuredMoneyContainer">
          <Save className="featuredIcon" />
          <span className="featuredMoney">0</span>
        </div>
        <span className="featuredSub">Assigned Complaints</span>
      </div>
      <div className="featuredItem">
        <div className="featuredMoneyContainer">
          <Save className="featuredIcon" />
          <span className="featuredMoney">0</span>
        </div>
        <span className="featuredSub">Resolved Complaints</span>
      </div>
    </div>
  );
}

export default Featuredinfo;
