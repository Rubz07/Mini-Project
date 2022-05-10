import React from "react";
import "./OfficerDashboard.css";

import Navbar from "../OfficerNavbar/OfficerNavbar";
import Sidebar from "../OfficerSidebar/OfficerSidebar";
import OfficerMain from "../OfficerHome/OfficerMain/OfficerMain";
import OfficerLogin from "../../Authentication/OfficerLogin/OfficerLogin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SubOfficers from "../OfficerHome/SubOfficers/SubOfficers";
import ManageSubOfficers from "../OfficerHome/ManageSubOfficers/ManageSubOfficers";
import ComplaintData from "../OfficerHome/ComplaintData/ComplaintData";

function OfficerDashboard() {
  return (
    <div>
      <Router>
        <Route path="/Officerlogin" component={OfficerLogin} />
        <Navbar />
        <div className="officerWrapper">
          <Sidebar />
          <Switch>
            <Route exact path="/Officerdashboard">
              <OfficerMain />
            </Route>
            <Route path="/add-subofficer">
              <SubOfficers />
            </Route>
            <Route path="/manage-officers">
              <ManageSubOfficers />
            </Route>
            <Route path="/Complaint-data">
              <ComplaintData />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default OfficerDashboard;
