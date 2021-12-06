import React, { useState, useEffect } from "react";
import Charts from "../../Charts/Charts";
import Featuredinfo from "../../Featuredinfo/Featuredinfo";
import axios from "../../../../axios";
import "./AdminHome.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { userData } from "../../../../dummyData";
import WidgetSmall from "../../WidgetSmall/WidgetSmall";
import WidgetLarge from "../../WidgetLarge/WidgetLarge";

function AdminHome() {
  const [complaints, setComplaints] = useState([]);

  async function getComplaints() {
    let response = await axios.get(`/getComplaint`);
    if (response.status === 200) {
      setComplaints(response.data.complaint);
    }
  }

  useEffect(() => {
    getComplaints();
  }, []);
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
