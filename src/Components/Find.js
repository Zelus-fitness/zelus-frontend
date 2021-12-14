import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import styles from "../Styles/FindStyles";
import { Link, withRouter } from "react-router-dom";
import { findPublicWorkout, checkForToken } from "../APIManager";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      public_workouts: [],
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
      var results = await findPublicWorkout();
      console.log(results);
      if (results.success) {
        this.setState({
          public_workouts: results.data,
          loading: false,
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

    return (
      <div className={classes.mainContainer}>
        {!this.state.loading ? (
          <div>
            
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
