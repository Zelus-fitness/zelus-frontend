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
      this.setState({ exercise_list: exerciseData.data["0"] });
    } catch (err) {
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
  }

  render() {
    return (
      <div>
        {this.state.exercise_list.map((exercise) => {
          return (
            <div>
              <div>{JSON.stringify(exercise)}</div>
              <Link to={`/exercise/${exercise.id}`}>Link!</Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ShowExercise));