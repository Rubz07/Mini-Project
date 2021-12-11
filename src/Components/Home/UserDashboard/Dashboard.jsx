import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import ComplaintDetails from "../UserHome/ComplaintDetails/ComplaintDetails";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { userContext } from "../../../AppContext";
import "./Dashboard.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import Catagories from "../UserHome/ComplaintCategories/Catagories";
import ComplaintForm from "../UserHome/ComplaintForm/ComplaintForm";
import Login from "../../Authentication/Login/Login";
import ComplaintStatus from "../UserHome/ComplaintStatus/ComplaintStatus";
import ChangePassword from "../UserHome/ChangePassword/ChangePassword";
function Dashboard() {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  async function isAuthenticated() {
    let response = await axios.post(`/isAuthenticated`, {
      headers: { Authorization: localStorage.getItem("auth-token") },
    });
    if (response.status === 200) {
      setUser(response.data.user);
      setAuthenticated(true);
    } else {
    }
  }

  useEffect(() => {
    const isToken = localStorage.getItem("auth-token");
    if (!isToken) {
      history.push("/login");
    } else {
      isAuthenticated();
    }
  }, [history]);

  return (
    <Router>
      <userContext.Provider value={{ userdata: user }}>
        <Route path="/login" component={Login} />
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
            <Route path="/water">
              <ComplaintForm />
            </Route>
            <Route path="/complaint-status">
              <ComplaintStatus />
            </Route>
            <Route path="/change-password">
              <ChangePassword />
            </Route>
          </Switch>
        </div>
      </userContext.Provider>
    </Router>
  );
}

export default Dashboard;
