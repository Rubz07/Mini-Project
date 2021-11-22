import React from "react";
import Register from "./Components/Authentication/Registration/Registration";
import Login from "./Components/Authentication/Login/Login";
import OtpAuthentication from "./Components/Authentication/Otp/OtpAuthentication";
import SelectCategory from "./Components/Home/Complaint/SelectCategory/SelectCategory";
import Dashboard from "./Components/Home/Dashboard/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <app>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/selectCategory">
            <Dashboard>
              <SelectCategory />
            </Dashboard>
          </Route>
          <Route exact path="/verification" component={OtpAuthentication} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </app>
  );
}

export default App;
