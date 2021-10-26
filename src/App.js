import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
import ShowExercise from "./Components/ShowExercise";
import CreateExercise from "./Components/CreateExercise";
import SingleExercise from "./Components/SingleExercise";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/exercise">
            <ShowExercise />
          </Route>
          <Route exact path="/exercise/:id">
            <SingleExercise />
          </Route>
          <Route exact path="/createexercise">
            <CreateExercise />
          </Route>
        </Switch>
      </Router>
    );
  }
}
