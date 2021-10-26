import React, { Component } from "react";
import { toast } from "react-toastify";
import { checkForToken } from "../APIManager";
import { withStyles } from "@mui/styles";
import styles from "../Styles/DashboardStyles";
import { Link, withRouter } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    if (!checkForToken()) {
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
        <div>
          <Link to="/createexercise">Create Exercise</Link>
        </div>

        <div>
          <Link to="/exercise">Show Exercise</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Dashboard));
