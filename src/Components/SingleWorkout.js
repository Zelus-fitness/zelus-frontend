import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "../Styles/SingleWorkoutStyles";
import { ToastContainer, toast } from "react-toastify";
import { checkForToken, getWorkoutByID } from "../APIManager";

class SingleWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      workout_data: {},
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
      var workoutData = await getWorkoutByID(this.state.id);
      this.setState({ workout_data: workoutData });
      console.log(workoutData)
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
        <div>
          
        </div>
      </div>
    );
  }
}

export default SingleWorkout;
