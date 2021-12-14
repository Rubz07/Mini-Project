import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import Navbar from "../OfficerNavbar/OfficerNavbar";
import Sidebar from "../OfficerSidebar/OfficerSidebar";
import { userContext } from "../../../AppContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import OfficerMain from "../OfficerHome/OfficerMain/OfficerMain";
function OfficerDashboard() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="officerWrapper">
          <Sidebar />
          <Switch>
            <Route exact path="/Officerdashboard">
              <OfficerMain />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default OfficerDashboard;
