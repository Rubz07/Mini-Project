import React from "react";
import Charts from "../../Charts/Charts";
import Featuredinfo from "../../Featuredinfo/Featuredinfo";
import "./AdminHome.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { userData } from "../../../../dummyData";
import WidgetSmall from "../../WidgetSmall/WidgetSmall";
import WidgetLarge from "../../WidgetLarge/WidgetLarge";

function AdminHome() {
  return (
    <Router>
      <Switch>
        <div className="adminHome">
          <Featuredinfo />
          <div className="homeWidgets">
            <WidgetSmall />
            <WidgetLarge />
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default AdminHome;
