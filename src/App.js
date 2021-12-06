import React from "react";
import Register from "./Components/Authentication/Registration/Registration";
import Login from "./Components/Authentication/Login/Login";
import OtpAuthentication from "./Components/Authentication/Otp/OtpAuthentication";

import Dashboard from "./Components/Home/UserDashboard/Dashboard";

import AdminDashboard from "./Components/Admin/AdminDashboard/AdminDashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <app>
      <Router>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />

          <Route exact path="/" component={OtpAuthentication} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>

        <Route exact path="/Admindashboard" component={AdminDashboard} />
      </Router>
    </app>
  );
}

export default App;
