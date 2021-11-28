import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import ComplaintDetails from "../UserHome/ComplaintDetails/ComplaintDetails";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import Catagories from "../UserHome/ComplaintCategories/Catagories";
function Dashboard() {
  const history = useHistory();

  // async function isAuthenticated() {
  //   let response = await axios.post(`/isAuthenticated`, {
  //     headers: { Authorization: localStorage.getItem("auth") },
  //   });
  //   console.log("status", response.status);
  //   if (response.status == 401) {
  //     console.log("done");
  //   } else {
  //     console.log("pooooiiiii");
  //     history.push("/login");
  //     //return <Redirect to="/login"></Redirect>;
  //   }
  // }

  // useEffect(() => {
  //   isAuthenticated();
  // }, []);

  return (
    <Router>
      <Navbar />
      <div className="userWrapper">
        <Sidebar />
        <Switch>
          <Route exact path="/dashboard">
            <ComplaintDetails />
          </Route>
          <Route path="/categories">
            <Catagories />
          </Route>
          {/* <div className="dashboardContainer">
            <Route exact path="/dashboard" component={Main} />
            <Route exact path="/selectCategory" component={SelectCategory} />
          </div> */}
        </Switch>
      </div>
    </Router>
  );
}

export default Dashboard;
