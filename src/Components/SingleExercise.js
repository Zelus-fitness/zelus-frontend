import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "../Styles/SingleExerciseStyles";
import { ToastContainer, toast } from "react-toastify";
import { checkForToken, getExerciseByID } from "../APIManager";

class SingleExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      exercise_data: {},
    };
  }
  async componentDidMount() {
    if (!checkForToken()) {
      this.props.history.push("/");
      toast.error("You have been logged out", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    var url = window.location.pathname;
    this.state.id = url.substring(url.lastIndexOf("/") + 1);
    try {
      var exerciseData = await getExerciseByID(this.state.id);
      this.setState({ exercise_data: exerciseData });
    } catch (err) {
      toast.error("There has been some problems", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  render() {
    return (
      <div>
        <div>ID: {this.state.exercise_data.id}</div>
        <div>Name: {this.state.exercise_data.name}</div>
        <div>Sets: {this.state.exercise_data.sets}</div>
        <div>Reps: {this.state.exercise_data.reps}</div>
        <div>RPE: {this.state.exercise_data.rpe}</div>
        <div>Type: {this.state.exercise_data.type}</div>
        <div>Public: {this.state.exercise_data.public}</div>
        <div>Created By: {this.state.exercise_data.created_by}</div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(SingleExercise));
