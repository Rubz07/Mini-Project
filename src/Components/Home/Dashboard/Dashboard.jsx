import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import Main from "../Main/Main";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import SelectCategory from "../Complaint/SelectCategory/SelectCategory";

import "./Dashboard.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // const [complaints, setComplaints] = useState([]);
  // console.log(complaints);
  // async function getComplaints() {
  //   let response = await axios.get(`/getComplaint`, {
  //     headers: { Authorization: window.localStorage.getItem("auth-token") },
  //   });
  //   if (response.status === 200) {
  //     setComplaints(response.data.complaint);
  //   }
  // }

  useEffect(() => {
    let response = axios.post(`/isAuthenticated`, {
      headers: { Authorization: window.localStorage.getItem("auth-token") },
    });
    if (response.status === 200) {
      console.log("KIKI", response.data);
    } else {
      Redirect("/login");
    }
  }, []);

  return (
    <Switch>
      <div className="dashboardContainer">
        <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <Route exact path="/dashboard" component={Main} />
        <Route exact path="/selectCategory" component={SelectCategory} />
      </div>
    </Switch>
  );
}

export default Dashboard;
