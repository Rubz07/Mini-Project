import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SubOfficerLogin from "../../Authentication/SubOfficerLogin/SubOfficerLogin";
import Navbar from "../SubOfficerNavbar/SubOfficerNavbar";
import Sidebar from "../SubOfficerSidebar/SubOfficerSidebar";
import "./SubOfficerDashboard.css";
function SubOfficerDashboard() {
  return (
    <div>
      <Router>
        <Route path="/SubOfficerlogin" component={SubOfficerLogin} />
        <Navbar />
        <div className="officerWrapper">
          <Sidebar />
          <Switch></Switch>
        </div>
      </Router>
    </div>
  );
}

export default SubOfficerDashboard;
