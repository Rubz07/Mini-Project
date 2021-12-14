import React from "react";
import "./OfficerMain.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import axios from "../../../../axios";
import OfficerCount from "../OfficerCount/OfficerCount";
function OfficerMain() {
  return (
    <Router>
      <Switch>
        <div className="officerHome">
          <OfficerCount />/
        </div>
      </Switch>
    </Router>
  );
}

export default OfficerMain;
