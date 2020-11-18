import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./home"

export default function App(props) {
  return (
    <Router>
        <Switch>
          <Route {...props} exact={true} path="/" >
            <Home/>
          </Route>
        </Switch>
    </Router>
  );
}