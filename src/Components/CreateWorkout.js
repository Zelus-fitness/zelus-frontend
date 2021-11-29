import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import { Link, withRouter } from "react-router-dom";
import styles from "../Styles/CreateWorkoutStyles";
import { checkForToken } from "../APIManager";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import groupedOptions from "../exercises_type";

class CreateWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: null,
      exercises: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddExercise = this.handleAddExercise.bind(this);
    this.handleAddSet = this.handleAddSet.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
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
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.state.button === 2) {
      console.log("hello");
    }
  }

  handleAddExercise() {
    this.setState((prevState) => ({
      exercises: [
        ...prevState.exercises,
        {
          id: uuidv4(),
          type: "",
          category: "",
          details: [{ set: 1, lbs: 0, reps: 0 }],
        },
      ],
    }));
  }

  handleAddSet(id) {
    this.state.exercises.forEach(
      function (single_exercise, index) {
        if (single_exercise.id === id) {
          var tempobj = single_exercise;
          var number_set = single_exercise.details.length + 1;
          var tempexercise = this.state.exercises[index].details.concat([
            { set: number_set, lbs: 0, reps: 0 },
          ]);
          tempobj.details = tempexercise;
          this.setState((prevState) => {
            let newData = prevState.exercises;
            let exercise_object = newData.find((d) => d.id === tempobj.id);
            Object.assign(exercise_object, tempobj);
            return { exercise: newData };
          });
          console.log(this.state.exercises);
        }
      }.bind(this)
    );
  }

  handleChangeType(type, id) {
    console.log(type);
    console.log(id);
    this.state.exercises.forEach(
      function (single_exercise, index) {
        if (single_exercise.id === id) {
          var tempobj = single_exercise;
          tempobj.type = type.value;
          tempobj.category = type.category;
          this.setState((prevState) => {
            let newData = prevState.exercises;
            let exercise_object = newData.find((d) => d.id === tempobj.id);
            Object.assign(exercise_object, tempobj);
            return { exercise: newData };
          });
          console.log(this.state.exercises);
        }
      }.bind(this)
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <div className={classes.textFieldContainer}>
            <TextField
              required
              id="outlined-required"
              label="Name"
              name="name"
              className={classes.textField}
            />
          </div>

          <div className={classes.textFieldContainer}>
            <TextField
              required
              id="outlined-required"
              label="Notes"
              name="notes"
              className={classes.textField}
            />
          </div>

          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              className={classes.addExerciseButton}
              onClick={() => {
                this.handleAddExercise();
              }}
            >
              Add Exercise
            </Button>
          </div>

          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              type="submit"
              className={classes.submitButton}
              onClick={() => {
                this.setState({ button: 2 });
              }}
            >
              Submit
            </Button>
          </div>

          <div>
            {this.state.exercises.length !== 0 ? (
              <div>
                {this.state.exercises.map((exercise, key) => {
                  return (
                    <div key={exercise.id}>
                      <Select
                        options={groupedOptions}
                        onChange={(e) => {
                          this.handleChangeType(e, exercise.id);
                        }}
                      />
                      {this.state.exercises[key].details.map(
                        (detail, detail_key) => {
                          return (
                            <div key={detail_key}>
                              <TextField /> <TextField />
                              <TextField />
                            </div>
                          );
                        }
                      )}
                      <Button
                        key={exercise.id}
                        variant="contained"
                        className={classes.addSetButton}
                        onClick={() => {
                          this.handleAddSet(exercise.id);
                        }}
                      >
                        Add Set
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(CreateWorkout));
