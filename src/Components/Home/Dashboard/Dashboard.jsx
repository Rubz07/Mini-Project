import React, { useState } from "react";
import axios from "../../../axios";
import Main from "../Main/Main";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import SelectCategory from "../Complaint/SelectCategory/SelectCategory";

import "./Dashboard.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const complaintDetails = () => {
    let b;
    try {
      axios.get(`/getComplaint`).then((response) => {
        let a = response.data.complaint;
        b = a.map((complaint) => {
          return complaint.date;
        });
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Switch>
      <div className="dashboardContainer" onLoad={complaintDetails}>
        <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <Route exact path="/dashboard" component={Main} />
        <Route exact path="/selectCategory" component={SelectCategory} />
      </div>
    </Switch>
  );
}

export default Dashboard;
