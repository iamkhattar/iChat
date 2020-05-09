import React from "react";
import "./App.css";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => (
  <Router>
    <Route path="/" exact component={Login} />
    <Switch>
      <Route path="/register" component={Register} />
    </Switch>
  </Router>
);

export default App;
