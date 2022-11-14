import React, { Component } from "react";
import { toast } from "react-toastify";
import { checkForToken } from "../APIManager";
import { withStyles } from "@mui/styles";
import styles from "../Styles/DashboardStyles";
import { Link, withRouter } from "react-router-dom";
import { getWorkoutsByUser } from "../APIManager";
import Button from "@mui/material/Button";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: null,
      existing_workouts: false,
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

    var workoutData = await getWorkoutsByUser();

    if (!workoutData || workoutData.length === 0) {
      this.setState({ existing_workouts: false });
    } else if (workoutData) {
      this.setState({ existing_workouts: true });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
        {!this.state.existing_workouts ? (
          <div>
            <h1>You don't have any workouts!</h1>
            <Link to="/workout">
              <Button className={classes.submitButton} variant="contained">
                Create one!
              </Button>
            </Link>
          </div>
        ) : (
          <div>{this.state.workouts}</div>
        )}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Dashboard));
