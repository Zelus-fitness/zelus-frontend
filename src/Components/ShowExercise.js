import React, { Component } from 'react'
import { withStyles } from "@mui/styles";
import styles from "../Styles/ShowExerciseStyles"
import { Link, withRouter } from "react-router-dom";

class ShowExercise extends Component {
  render() {
    return (
      <div>
        Show Exercise
      </div>
    )
  }
}


export default withRouter(withStyles(styles)(ShowExercise))