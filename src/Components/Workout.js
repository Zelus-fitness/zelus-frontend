import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import { Link, withRouter } from "react-router-dom";
import styles from "../Styles/WorkoutStyles";
import Button from "@mui/material/Button";
import { getWorkoutsByUser, checkForToken } from "../APIManager";
import { toast } from "react-toastify";

class Workout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [],
      existing_workouts: false,
      loading: false,
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

    var workoutData = await getWorkoutsByUser();
    console.log(workoutData);
    if (!workoutData || workoutData.length === 0) {
      this.setState({ existing_workouts: false });
    } else if (workoutData) {
      this.setState({ existing_workouts: true, workouts: workoutData });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
        <div>
          <h2>Quick Start</h2>
        </div>
        <div>
          <Link to="/workout/create">
            <Button
              variant="contained"
              type="submit"
              className={classes.submitButton}
            >
              Start an Empty Workout
            </Button>
          </Link>
        </div>

        <div>
          <h2>My Workouts</h2>
        </div>

        <div>
          {!this.state.existing_workouts ? (
            <div>
              <p>You don't have any workouts! You should create one</p>
            </div>
          ) : (
            <div>
              {this.state.workouts.map((data, i) => {
                return (
                  <div className={classes.workoutContainer}>
                    <div className={classes.workoutNameText}>
                      <h2>{data.name}</h2>
                    </div>
                    <div className={classes.workoutNameText}>{data.notes}</div>
                    <div className={classes.workoutNameText}>{data.time}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Workout));
