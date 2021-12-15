import React from "react";
import "./ComplaintCount.css";
import { Save, ArrowUpward } from "@material-ui/icons";
function ComplaintCount({ complaint }) {
  var pendingCount = complaint.filter(function (p) {
    return p.status === "Pending";
  });

  return (
    <div className="Complaintfeatured">
      <div className="complaintFeaturedItem">
        <div className="complaintFeaturedMoneyContainer">
          <span className="complaintFeaturedMoney">{complaint.length}</span>
          <Save className="complaintFeaturedIcon " />
        </div>
        <span className="complaintFeaturedSub">
          Total Grievances Registered
        </span>
      </div>
      <div className="complaintFeaturedItem">
        <div className="complaintFeaturedMoneyContainer">
          <span className="complaintFeaturedMoney">{pendingCount.length}</span>

          <Save className="complaintFeaturedIcon" />
        </div>
        <span className="complaintFeaturedSub">Grievance Under Processing</span>
      </div>
      <div className="complaintFeaturedItem">
        <div className="complaintFeaturedMoneyContainer">
          <span className="complaintFeaturedMoney">0</span>
          <ArrowUpward className="complaintFeaturedIcon" />
        </div>
        <span className="complaintFeaturedSub">Resolved Grievances</span>
      </div>
    </div>
  );
}

export default ComplaintCount;
