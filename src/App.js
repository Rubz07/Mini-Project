import React from "react";
import Register from "./Components/Authentication/Registration/Registration";
import Login from "./Components/Authentication/Login/Login";
import OtpAuthentication from "./Components/Authentication/Otp/OtpAuthentication";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={OtpAuthentication} />
          <Route exact path="/register" component={Register} />
          <Route exactpath="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
