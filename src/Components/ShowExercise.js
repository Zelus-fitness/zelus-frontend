import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import styles from "../Styles/ShowExerciseStyles";
import { Link, withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { checkForToken, getExercisesByUser } from "../APIManager";

class ShowExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise_list: [],
      existing_exercises: false,
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
    try {
      var exerciseData = await getExercisesByUser();
      console.log(exerciseData);
      if (exerciseData.success || exerciseData.data.data.length === 0) {
        this.setState({
          exercise_list: exerciseData.data.data,
          existing_exercises: true,
        });
      }
    } catch (err) {
      // localStorage.removeItem("token");
      // this.props.history.push("/");
      // toast.error("You have been logged out", {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
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
        <div className={classes.myExercisesHeaderContainer}>
          <h2>My Exercises</h2>
        </div>
        {this.state.existing_exercises ||
        this.state.exercise_list.length === 0 ? (
          this.state.exercise_list.map((exercise, i) => {
            console.log(exercise);
            var new_datetime_format = new Date(exercise.created_at);
            console.log(new_datetime_format);
            return (
              <div key={i}>
                <Link
                  to={`/exercise/${exercise.id}`}
                  className={classes.linkDecoration}
                >
                  <div className={classes.exerciseContainer}>
                    <div className={classes.exerciseNameText}>
                      <div className={classes.exerciseType}>
                        {exercise.type
                          ? exercise.type
                          : `${
                              monthNames[new_datetime_format.getMonth()]
                            } ${new_datetime_format.getDate()} Exercise`}
                      </div>
                    </div>
                    <div className={classes.exerciseNameText}>
                      {`${
                        monthNames[new_datetime_format.getMonth()]
                      } ${new_datetime_format.getDate()}`}
                    </div>
                    <div>
                      <div className={classes.detailHeader}>Details</div>
                      <div>
                        {exercise.details.map((single_set) => {
                          return (
                            <div className={classes.oneSetRow}>
                              <div
                                className={classes.oneSetRowChild}
                              >{`Set: ${single_set.set},`}</div>
                              <div
                                className={classes.oneSetRowChild}
                              >{`Reps: ${single_set.reps},`}</div>
                              <div
                                className={classes.oneSetRowChild}
                              >{`Weight: ${single_set.weight},`}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div>You don't have any exercises!</div>
        )}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ShowExercise));
