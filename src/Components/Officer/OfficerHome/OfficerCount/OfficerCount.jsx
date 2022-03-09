import React from "react";
import "./OfficerCount.css";
import { Save, ArrowUpward } from "@material-ui/icons";
function OfficerCount({ complaint }) {
  var AssignedCount = complaint.filter(function (p) {
    return p.status === "Assigned";
  });

  var PendingCount = complaint.filter(function (p) {
    return p.status === "Pending";
  });

  return (
    <div className="featured">
      <div className="featuredItem">
        <div className="featuredMoneyContainer">
          <Save className="featuredIcon " />
          <span className="featuredMoney">{PendingCount.length}</span>
        </div>
        <span className="featuredSub">Pending To Process</span>
      </div>
      <div className="featuredItem">
        <div className="featuredMoneyContainer">
          <Save className="featuredIcon" />
          <span className="featuredMoney">{AssignedCount.length}</span>
        </div>
        <span className="featuredSub">On Process</span>
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

export default OfficerCount;
