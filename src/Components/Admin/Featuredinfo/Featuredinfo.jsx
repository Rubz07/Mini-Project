import React, { useState } from "react";
import { Save } from "@material-ui/icons";
import "./Featuredinfo.css";
function Featuredinfo({ Users, Departments, officer, subOfficer }) {
  // console.log(Users);
  // console.log(Departments);
  // console.log(offier);
  // console.log(subOfficer);
  var usersCount = Users.filter(function (p) {
    return p;
  });

  var departmentCount = Departments.filter(function (p) {
    return p;
  });

  var officerCount = officer.filter(function (p) {
    return p;
  });

  var subOfficerCount = subOfficer.filter(function (p) {
    return p;
  });
  return (
    <div className="featured">
      <div className="featuredItem">
        <div className="featuredMoneyContainer">
          <Save className="featuredIcon " />
          <span className="featuredMoney">{usersCount.length}</span>
        </div>
        <span className="featuredSub">Users Registered</span>
      </div>
      <div className="featuredItem">
        <div className="featuredMoneyContainer">
          <Save className="featuredIcon" />
          <span className="featuredMoney">{departmentCount.length}</span>
        </div>
        <span className="featuredSub">Department Registered</span>
      </div>
      <div className="featuredItem">
        <div className="featuredMoneyContainer">
          <Save className="featuredIcon" />
          <span className="featuredMoney">{officerCount.length}</span>
        </div>
        <span className="featuredSub">Officers Registered</span>
      </div>
      <div className="featuredItem">
        <div className="featuredMoneyContainer">
          <Save className="featuredIcon" />
          <span className="featuredMoney">{subOfficerCount.length}</span>
        </div>
        <span className="featuredSub">Subofficers Registerd</span>
      </div>
    </div>
  );
}

export default Featuredinfo;
