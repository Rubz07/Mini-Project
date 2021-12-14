import React from "react";
import "./OfficerCount.css";
import { Save, ArrowUpward } from "@material-ui/icons";
function OfficerCount() {
  // var pendingCount = officer.filter(function (p) {
  //   return p.status == "Pending";
  // });

  return (
    <div className="officerfeatured">
      <div className="officerFeaturedItem">
        <div className="officerFeaturedMoneyContainer">
          <span className="officerFeaturedMoney">0</span>
          <Save className="officerFeaturedIcon " />
        </div>
        <span className="officerFeaturedSub">Pending to Resolve</span>
      </div>
      <div className="officerFeaturedItem">
        <div className="officerFeaturedMoneyContainer">
          <span className="officerFeaturedMoney">0</span>

          <Save className="officerFeaturedIcon" />
        </div>
        <span className="officerFeaturedSub">Resolved Grievances</span>
      </div>
      <div className="officerFeaturedItem">
        <div className="officerFeaturedMoneyContainer">
          <span className="officerFeaturedMoney">0</span>
          <ArrowUpward className="officerFeaturedIcon" />
        </div>
        <span className="officerFeaturedSub">Number of Grievances Closed</span>
      </div>
    </div>
  );
}

export default OfficerCount;
