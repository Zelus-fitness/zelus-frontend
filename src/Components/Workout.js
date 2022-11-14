import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import { Link, withRouter } from "react-router-dom";
import styles from "../Styles/WorkoutStyles";
import Button from "@mui/material/Button";
import {
  getWorkoutsByUser,
  checkForToken,
  getFavoriteWorkouts,
} from "../APIManager";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

class Workout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [],
      favorite_workouts: [],
      existing_workouts: false,
      existing_favorite_workouts: false,
      loading: false,
    };
  }

  async componentDidMount() {
    // if (!checkForToken()) {
    //   this.props.history.push("/");
    //   toast.error("You have been logged out", {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //   });
    // }

    try {
      var workoutData = await getWorkoutsByUser();
      try {
        var results = await getFavoriteWorkouts();
        if (results.length <= 0) {
          this.setState({
            existing_favorite_workouts: false,
          });
        } else if (results.length > 0) {
          this.setState({
            favorite_workouts: results,
            existing_favorite_workouts: true,
          });
        }
        console.log(results);
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
      if (!workoutData || workoutData.length === 0) {
        this.setState({ existing_workouts: false });
      } else if (workoutData) {
        this.setState({ existing_workouts: true, workouts: workoutData });
      }
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
    const { classes } = this.props;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      <div className={classes.mainContainer}>
        <div className={classes.quickStartHeader}>
          <h2>Quick Start</h2>
        </div>
        <div className={classes.createWorkoutButtonContainer}>
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

        <div className={classes.myWorkoutsHeaderContainer}>
          <h2>My Workouts</h2>
        </div>

        <div>
          {this.state.existing_workouts ? (
            <div>
              <div>
                {this.state.workouts.map((data, key) => {
                  var minutes = Math.floor(data.time / 60);
                  var seconds = ("0" + (data.time % 60)).slice(-2);

                  var timer_string = `${minutes}:${seconds}`;

                  var new_datetime_format = new Date(data.created_at);

                  return (
                    <Link
                      to={`/singleworkout/${data.id}`}
                      className={classes.linkDecoration}
                      key={key}
                    >
                      <div className={classes.workoutContainer}>
                        <div className={classes.workoutNameText}>
                          <div className={classes.workoutName}>{data.name}</div>
                        </div>
                        <div className={classes.workoutNameText}>
                          {`${
                            monthNames[new_datetime_format.getMonth()]
                          } ${new_datetime_format.getDate()}`}
                        </div>
                        <div className={classes.timerStringContainer}>
                          <div className={classes.fontAwesomeContainer}>
                            <FontAwesomeIcon icon={faClock} />
                          </div>
                          <div>{timer_string}</div>
                        </div>
                        <div>
                          <div className={classes.exerciseHeader}>Exercise</div>
                          <div>
                            {data.exercise.map((single_exercise, key) => {
                              return (
                                <div key={key}>{single_exercise.type}</div>
                              );
                            })}
                          </div>
                        </div>
                        <div className={classes.notesStringContainer}>
                          <div className={classes.notesHeader}>{`Notes: `}</div>
                          <div
                            className={classes.notesData}
                          >{` ${data.notes}`}</div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className={classes.noWorkoutText}>
              <p>You don't have any workouts! You should create one</p>
            </div>
          )}
        </div>

        <div className={classes.myWorkoutsHeaderContainer}>
          <h2>My Favorites</h2>
        </div>

        <div>
          {this.state.existing_favorite_workouts ? (
            <div>
              <div>
                {this.state.favorite_workouts.map((data, key) => {
                  var minutes = Math.floor(data.time / 60);
                  var seconds = ("0" + (data.time % 60)).slice(-2);

                  var timer_string = `${minutes}:${seconds}`;

                  var new_datetime_format = new Date(data.created_at);

                  return (
                    <Link
                      to={`/singleworkout/${data.id}`}
                      className={classes.linkDecoration}
                      key={key}
                    >
                      <div className={classes.workoutContainer}>
                        <div className={classes.workoutNameText}>
                          <div className={classes.workoutName}>{data.name}</div>
                        </div>
                        <div className={classes.workoutNameText}>
                          {`${
                            monthNames[new_datetime_format.getMonth()]
                          } ${new_datetime_format.getDate()}`}
                        </div>
                        <div className={classes.timerStringContainer}>
                          <div className={classes.fontAwesomeContainer}>
                            <FontAwesomeIcon icon={faClock} />
                          </div>
                          <div>{timer_string}</div>
                        </div>
                        <div>
                          <div className={classes.exerciseHeader}>Exercise</div>
                          <div>
                            {data.exercise.map((single_exercise, key) => {
                              return (
                                <div key={key}>{single_exercise.type}</div>
                              );
                            })}
                          </div>
                        </div>
                        <div className={classes.notesStringContainer}>
                          <div className={classes.notesHeader}>{`Notes: `}</div>
                          <div
                            className={classes.notesData}
                          >{` ${data.notes}`}</div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className={classes.noWorkoutText}>
              <p>You don't have any favorites! You should favorite one!</p>
              <Button
                component={Link}
                to="/find"
                className={classes.goToFavoritesButton}
              >
                Go and find favorites
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Workout));
