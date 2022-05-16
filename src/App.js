import React from "react";
import Register from "./Components/Authentication/Registration/Registration";
import Login from "./Components/Authentication/Login/Login";
import OfficerLogin from "./Components/Authentication/OfficerLogin/OfficerLogin";
import OtpAuthentication from "./Components/Authentication/Otp/OtpAuthentication";

import Dashboard from "./Components/Home/UserDashboard/Dashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard/AdminDashboard";
import OfficerDashboard from "./Components/Officer/OfficerDashboard/OfficerDashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import SubOfficerLogin from "./Components/Authentication/SubOfficerLogin/SubOfficerLogin";
import SubOfficerDashboard from "./Components/Subofficer/SubOfficerDashboard/SubOfficerDashboard";
import LandingPage from "./Components/Landingpage/LandingPage";
import ForgotPass from "./Components/Authentication/Forgot_pass/ForgotPass";

function App() {
  return (
    <app>
      <Router>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/otpauth" component={OtpAuthentication} />
          <Route exact path="/forgotPass" component={ForgotPass} />

          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/Officerlogin" component={OfficerLogin} />
          <Route exact path="/SubOfficerlogin" component={SubOfficerLogin} />
          <Route exact path="/Admindashboard" component={AdminDashboard} />
        </Switch>
        <Route exact path="/Officerdashboard" component={OfficerDashboard} />
        <Route
          exact
          path="/SubOfficerdashboard"
          component={SubOfficerDashboard}
        />
      </Router>
    </app>
  );
}

export default App;
