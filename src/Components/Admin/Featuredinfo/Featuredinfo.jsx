import React, { useState } from "react";
import { Save } from "@material-ui/icons";
import "./Featuredinfo.css";
function Featuredinfo({ complaint }) {
  var pendingCount = complaint.filter(function (p) {
    return p.status === "Pending";
  });

  var processingCount = complaint.filter(function (p) {
    return p.status === "Assigned";
  });
  var ResolvedCount = complaint.filter(function (p) {
    return p.status === "Resolved";
  });
  return (
    <div className="featured">
      <div className="featuredItem">
        <div className="featuredMoneyContainer">
          <Save className="featuredIcon " />
          <span className="featuredMoney">{pendingCount.length}</span>
        </div>
        <span className="featuredSub">Pending To Assign</span>
      </div>
      <div className="featuredItem">
        <div className="featuredMoneyContainer">
          <Save className="featuredIcon" />
          <span className="featuredMoney">{processingCount.length}</span>
        </div>
        <span className="featuredSub">On Process</span>
      </div>
      <div className="featuredItem">
        <div className="featuredMoneyContainer">
          <Save className="featuredIcon" />
          <span className="featuredMoney">{ResolvedCount.length}</span>
        </div>
        <span className="featuredSub">Resolved Complaints</span>
      </div>
    </div>
  );
}

export default Featuredinfo;
