import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import styles from "../Styles/FindStyles";
import { Link, withRouter } from "react-router-dom";
import {
  findPublicWorkout,
  checkForToken,
  getFavoriteWorkouts,
  favoriteWorkoutAPI,
  unfavoriteWorkoutAPI,
} from "../APIManager";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      public_workouts: [],
      favorite_workouts_array: [],
      rerender: true,
    };

    this.favoriteWorkout = this.favoriteWorkout.bind(this);
    this.favoriteWorkout = this.favoriteWorkout.bind(this);
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
    try {
      var results = await findPublicWorkout();
      try {
        var favorite_workouts = await getFavoriteWorkouts();
        if (favorite_workouts) {
          var temp_array = [];
          for (var i = 0; i < favorite_workouts.length; i++) {
            temp_array.push(favorite_workouts[i].id);
          }
          this.setState({
            public_workouts: results.data,
            loading: false,
            favorite_workouts_array: temp_array,
          });

          localStorage.setItem("favorited_workouts", temp_array);
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

  async favoriteWorkout(id) {
    try {
      var results = await favoriteWorkoutAPI(id);
      if (results.success) {
        var temp_array = [...this.state.favorite_workouts_array];
        temp_array.push(id);
        console.log(temp_array);
        localStorage.setItem("favorited_workouts", temp_array);
        this.setState({
          favorite_workouts_array: temp_array,
          rerender: !this.state.rerender,
        });
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

  async unfavoriteWorkout(id) {
    try {
      var results = await unfavoriteWorkoutAPI(id);
      if (results.success) {
        var temp_array = [...this.state.favorite_workouts_array];

        const index = temp_array.indexOf(id);
        if (index > -1) {
          temp_array.splice(index, 1);
        }

        console.log(temp_array);
        localStorage.setItem("favorited_workouts", temp_array);
        this.setState({
          favorite_workouts_array: temp_array,
          rerender: !this.state.rerender,
        });
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
        {!this.state.loading ? (
          <div>
            {this.state.public_workouts.map((data, key) => {
              var minutes = Math.floor(data.time / 60);
              var seconds = ("0" + (data.time % 60)).slice(-2);

              var timer_string = `${minutes}:${seconds}`;

              var new_datetime_format = new Date(data.created_at);

              return (
                <div className={classes.workoutCardsParentContainer}>
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
                          {data.exercise.map(
                            (single_exercise, key_exercise) => {
                              return (
                                <div key={key_exercise}>
                                  {single_exercise.type}
                                </div>
                              );
                            }
                          )}
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

                  {this.state.favorite_workouts_array.includes(data.id) ? (
                    <FavoriteIcon
                      className={classes.favoriteHeart}
                      onClick={(e) => this.unfavoriteWorkout(data.id)}
                    />
                  ) : (
                    <FavoriteBorderOutlinedIcon
                      className={classes.unfavoriteHeart}
                      onClick={(e) => this.favoriteWorkout(data.id)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <div>
              <Spinner animation="border" role="status">
                Loading...
              </Spinner>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Find));
