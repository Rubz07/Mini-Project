import React from "react";
import "./SubOfficerCount.css";
import { Save } from "@material-ui/icons";
function SubOfficerCount({ complaint }) {
  var PendingCount = complaint.filter(function (p) {
    return p.status === "Pending";
  });
  var ProcessingCount = complaint.filter(function (p) {
    return p.status === "Processing";
  });
  var ResolvedCount = complaint.filter(function (p) {
    return p.status === "Resolved";
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
          <span className="featuredMoney">{ProcessingCount.length}</span>
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

export default SubOfficerCount;
