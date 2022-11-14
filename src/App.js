import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import Find from "./Components/Find";
import SingleWorkout from "./Components/SingleWorkout";
import CustomCreateWorkout from "./Components/CustomCreateWorkout";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <ToastContainer />

          <Switch>
            {/* <Route exact path="/">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route> */}

            <Layout>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/find">
                <Find />
              </Route>
              <Route exact path="/workout">
                <Workout />
              </Route>
              <Route exact path="/workout/create">
                <CreateWorkout />
              </Route>
              <Route exact path="/customcreateworkout">
                <CustomCreateWorkout />
              </Route>
              <Route exact path="/exercise">
                <ShowExercise />
              </Route>
              <Route exact path="/exercise/:id">
                <SingleExercise />
              </Route>
              <Route exact path="/singleworkout/:id">
                <SingleWorkout />
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
