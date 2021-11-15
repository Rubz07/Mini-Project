import React from "react";
import Nav from "./Components/Authentication/Registration/Registration";
import Login from "./Components/Authentication/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Nav} />
          <Route path="/register" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
