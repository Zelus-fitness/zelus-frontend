import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
import ShowExercise from "./Components/ShowExercise";
import CreateExercise from "./Components/CreateExercise";
import SingleExercise from "./Components/SingleExercise";
import Workout from "./Components/Workout";
import CreateWorkout from "./Components/CreateWorkout";
import Profile from "./Components/Profile";
import Layout from "./Layout";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <ToastContainer />

          <Switch>
            <Route exact path="/">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>

            <Layout>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/workout">
                <Workout />
              </Route>
              <Route exact path="/workout/create">
                <CreateWorkout />
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
            </Layout>
          </Switch>
        </Router>
      </div>
    );
  }
}
