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
  useHistory,
} from "react-router-dom";
function Dashboard() {
  const history = useHistory();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  async function isAuthenticated() {
    let response = await axios.post(`/isAuthenticated`, {
      headers: { Authorization: localStorage.getItem("auth") },
    });
    console.log("status", response.status);
    if (response.status == 401) {
      console.log("done");
    } else {
      console.log("pooooiiiii");
      history.push("/login");
      //return <Redirect to="/login"></Redirect>;
    }
  }

  useEffect(() => {
    isAuthenticated();
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
