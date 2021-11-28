import React from "react";
import "./ComplaintCount.css";
import { Save, ArrowUpward } from "@material-ui/icons";
function ComplaintCount({ complaint }) {
  return (
    <div className="Complaintfeatured">
      <div className="complaintFeaturedItem">
        <div className="complaintcomplaintFeaturedMoneyContainer">
          <span className="complaintFeaturedMoney">{complaint.length}</span>

          <Save className="complaintFeaturedIcon " />
        </div>
        <span className="complaintFeaturedSub">Compared to last month</span>
      </div>
      <div className="complaintFeaturedItem">
        <div className="complaintcomplaintFeaturedMoneyContainer">
          <span className="complaintFeaturedMoney">$4,415</span>

          <Save className="complaintFeaturedIcon" />
        </div>
        <span className="complaintFeaturedSub">Compared to last month</span>
      </div>
      <div className="complaintFeaturedItem">
        <div className="complaintcomplaintFeaturedMoneyContainer">
          <span className="complaintFeaturedMoney">$2,225</span>
          <ArrowUpward className="complaintFeaturedIcon" />
        </div>
        <span className="complaintFeaturedSub">Compared to last month</span>
      </div>
    </div>
  );
}

export default ComplaintCount;
