import React from "react";
import Register from "./Components/Authentication/Registration/Registration";
import Login from "./Components/Authentication/Login/Login";
import OtpAuthentication from "./Components/Authentication/Otp/OtpAuthentication";
import SelectCategory from "./Components/Home/Complaint/SelectCategory/SelectCategory";
import Dashboard from "./Components/Home/Dashboard/Dashboard";
import Waterauthority from "./Components/Home/Complaint/SelectCategory/Categories/Water_Authority/Waterauthority";
import AdminDashboard from "./Components/Admin/AdminDashboard/AdminDashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <app>
      <Router>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/selectCategory">
            <Dashboard>
              <SelectCategory />
            </Dashboard>
          </Route>
          <Route exact path="/waterauthority" component={Waterauthority} />
          <Route exact path="/Admindashboard" component={AdminDashboard} />
          <Route exact path="/" component={OtpAuthentication} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </app>
  );
}

export default App;
