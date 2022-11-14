import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "../Styles/SingleExerciseStyles";
import { ToastContainer, toast } from "react-toastify";
import { checkForToken, getExerciseByID } from "../APIManager";
import { TextField } from "@mui/material";
import Spinner from "react-bootstrap/Spinner";

class SingleExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      exercise_data: {},
      loading: true,
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
    var url = window.location.pathname;
    this.state.id = url.substring(url.lastIndexOf("/") + 1);
    try {
      var exerciseData = await getExerciseByID(this.state.id);
      this.setState({ exercise_data: exerciseData, loading: false });
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
            <div className={classes.oneRow}>
              <div className={classes.textFieldHeader}>Name:</div>
              <div className={classes.textFieldContainer}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  value={this.state.exercise_data.type}
                  style={{ width: "15vw" }}
                />
              </div>
            </div>

            <div className={classes.oneRow}>
              <div className={classes.textFieldHeader}>Type:</div>
              <div className={classes.textFieldContainer}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  value={this.state.exercise_data.type}
                  style={{ width: "15vw" }}
                />
              </div>
            </div>

            <div className={classes.oneRow}>
              <div className={classes.textFieldHeader}>Category:</div>
              <div className={classes.textFieldContainer}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  value={this.state.exercise_data.category}
                  style={{ width: "15vw" }}
                />
              </div>
            </div>

            <div className={classes.oneRow}>
              <div className={classes.textFieldHeader}>Details:</div>
              <div className={classes.textFieldContainer}>
                {this.state.exercise_data.details.map((single_row, key) => {
                  return (
                    <div key="key" className={classes.oneDetailRow}>
                      <TextField
                        id="standard-basic"
                        label="Reps"
                        variant="standard"
                        style={{ width: "15vw", marginLeft: "20px" }}
                        value={single_row.set}
                      />
                      <TextField
                        id="standard-basic"
                        label="Reps"
                        variant="standard"
                        style={{ width: "15vw", marginLeft: "20px" }}
                        value={single_row.reps}
                      />
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        label="Weight"
                        style={{ width: "15vw", marginLeft: "20px" }}
                        value={single_row.weight}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Spinner animation="border" role="status">
              Loading...
            </Spinner>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(SingleExercise));
