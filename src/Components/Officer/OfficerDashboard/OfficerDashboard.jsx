import React, { useState, useEffect } from "react";
import "./OfficerDashboard.css";
import axios from "../../../axios";
import Navbar from "../OfficerNavbar/OfficerNavbar";
import Sidebar from "../OfficerSidebar/OfficerSidebar";
import OfficerMain from "../OfficerHome/OfficerMain/OfficerMain";
import OfficerLogin from "../../Authentication/OfficerLogin/OfficerLogin";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import SubOfficers from "../OfficerHome/SubOfficers/SubOfficers";

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
              <SubOfficers/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default OfficerDashboard;
