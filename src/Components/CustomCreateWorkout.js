import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import { Link, withRouter } from "react-router-dom";
import styles from "../Styles/CustomCreateWorkoutStyles";
import { checkForToken, createWorkout } from "../APIManager";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import groupedOptions from "../exercises_type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

class CustomCreateWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: null,
      exercises: [],
      timer: 0,
      timerString: "0:00",
      public: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddExercise = this.handleAddExercise.bind(this);
    this.handleAddSet = this.handleAddSet.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleDeleteSet = this.handleDeleteSet.bind(this);
    this.handleDeleteExercise = this.handleDeleteExercise.bind(this);
    this.handleChangeWeightNumber = this.handleChangeWeightNumber.bind(this);
    this.handleChangeRepsNumber = this.handleChangeRepsNumber.bind(this);
    this.countUp = this.countUp.bind(this);
    this.startCounting = this.startCounting.bind(this);
    this.switchPublic = this.switchPublic.bind(this);
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

    var template_object = this.props.history.location.state.workout;
    console.log(template_object.exercise);

    var temp_exercise = template_object.exercise;
    for (var i = 0; i < temp_exercise.length; i++) {
      for (var j = 0; j < temp_exercise[i].details.length; j++) {
        temp_exercise[i].details[j].reps = 0;
        temp_exercise[i].details[j].weight = 0;
      }
    }

    console.log(temp_exercise);

    this.setState({
      exercises: temp_exercise,
    });

    this.startCounting();
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.state.button === 2) {
      var tempobj = {
        workout: {
          name: e.target.name.value,
          notes: e.target.notes.value,
          public: this.state.public,
          time: this.state.timer,
          exercise: this.state.exercises,
        },
      };
      var result = await createWorkout(tempobj);
      console.log(result);
      if (result.success) {
        toast.success("Workout was created successfully", {
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
      console.log(result);
    }
  }

  switchPublic() {
    this.setState({ public: !this.state.public });
  }

  handleChangeWeightNumber(set, exercise_id, new_weight) {
    if (!new_weight.target.validity.valid) {
      return;
    }

    var temp_exercise_state = this.state.exercises;

    for (var exercise_obj of temp_exercise_state) {
      var details_array;
      if (exercise_obj.id === exercise_id) {
        details_array = exercise_obj.details;
        for (var i = 0; i < details_array.length; i++) {
          if (details_array[i].set === set) {
            details_array[i].weight = new_weight.target.value;
          }
        }
        exercise_obj.details = details_array;
      }
    }

    this.setState({ exercises: temp_exercise_state });
  }

  handleChangeRepsNumber(set, exercise_id, new_reps) {
    if (!new_reps.target.validity.valid) {
      return;
    }

    var temp_exercise_state = this.state.exercises;

    for (var exercise_obj of temp_exercise_state) {
      var details_array;
      if (exercise_obj.id === exercise_id) {
        details_array = exercise_obj.details;
        for (var i = 0; i < details_array.length; i++) {
          if (details_array[i].set === set) {
            details_array[i].reps = new_reps.target.value;
          }
        }
        exercise_obj.details = details_array;
      }
    }

    this.setState({ exercises: temp_exercise_state });
  }

  handleDeleteSet(set, exercise_id) {
    var temp_exercise_state = this.state.exercises;

    for (var exercise_obj of temp_exercise_state) {
      var details_array;
      if (exercise_obj.id === exercise_id) {
        details_array = exercise_obj.details;
        for (var i = 0; i < details_array.length; i++) {
          if (details_array[i].set === set) {
            details_array.splice(i, 1);
          }
        }
        var count = 1;
        for (var i = 0; i < details_array.length; i++) {
          if (details_array[i].set !== count) {
            details_array[i].set = count;
          }
          count++;
        }
      }
    }

    this.setState({ exercises: temp_exercise_state });
  }

  handleDeleteExercise(exercise_id) {
    var temp_exercise_state = this.state.exercises;
    for (var i = 0; i < temp_exercise_state.length; i++) {
      if (temp_exercise_state[i].id === exercise_id) {
        temp_exercise_state.splice(i, 1);
      }
    }
    this.setState({ exercises: temp_exercise_state });
  }

  handleAddExercise() {
    this.setState((prevState) => ({
      exercises: [
        ...prevState.exercises,
        {
          id: uuidv4(),
          type: "",
          category: "",
          details: [{ set: 1, weight: 0, reps: 0 }],
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
            { set: number_set, weight: 0, reps: 0 },
          ]);
          tempobj.details = tempexercise;
          this.setState((prevState) => {
            let newData = prevState.exercises;
            let exercise_object = newData.find((d) => d.id === tempobj.id);
            Object.assign(exercise_object, tempobj);
            return { exercise: newData };
          });
        }
      }.bind(this)
    );
  }

  handleChangeType(type, id) {
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
        }
      }.bind(this)
    );
  }

  startCounting() {
    setInterval(this.countUp, 1000);
  }

  countUp() {
    this.setState(({ timer }) => ({ timer: timer + 1 }));

    this.setState(() => {
      var minutes = Math.floor(this.state.timer / 60);
      var seconds = ("0" + (this.state.timer % 60)).slice(-2);

      return { timerString: `${minutes}:${seconds}` };
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <div className={classes.timer}>Timer: {this.state.timerString}</div>
          <FormGroup className={classes.switchButton}>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.public}
                  onChange={this.switchPublic}
                />
              }
              label="Public"
            />
          </FormGroup>

          <div className={classes.textFieldContainer}>
            <TextField
              required
              label="Name"
              name="name"
              variant="standard"
              id="standard-required"
              className={classes.textField}
            />
          </div>

          <div className={classes.textFieldContainer}>
            <TextField
              required
              label="Notes"
              name="notes"
              id="standard-required"
              label="Notes"
              variant="standard"
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
                    <div
                      key={exercise.id}
                      className={classes.exercisesContainer}
                    >
                      <div className={classes.exerciseType}>
                        <div className={classes.type}>Type:</div>
                        <Select
                          defaultValue={{
                            value: exercise.type,
                            label: exercise.type,
                          }}
                          options={groupedOptions}
                          onChange={(e) => {
                            this.handleChangeType(e, exercise.id);
                          }}
                          className={classes.dropDownMenu}
                        />
                        <Tooltip
                          title="Delete Exercise"
                          className={classes.exerciseTrashContainer}
                        >
                          <IconButton
                            onClick={() => {
                              this.handleDeleteExercise(exercise.id);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className={classes.trashIcon}
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                      {this.state.exercises[key].details.map(
                        (detail, detail_key) => {
                          return (
                            <div
                              key={detail_key}
                              className={classes.groupOfSets}
                            >
                              <div className={classes.textFieldContainer}>
                                <TextField
                                  id="standard-required"
                                  label="Set"
                                  defaultValue={detail_key + 1}
                                  variant="standard"
                                />
                              </div>

                              <div className={classes.textFieldContainer}>
                                <TextField
                                  id="standard-required"
                                  label="Reps"
                                  value={detail.reps}
                                  variant="standard"
                                  onChange={(e) => {
                                    this.handleChangeRepsNumber(
                                      detail_key + 1,
                                      exercise.id,
                                      e
                                    );
                                  }}
                                />
                              </div>

                              <div className={classes.textFieldContainer}>
                                <TextField
                                  id="standard-required"
                                  label="Weight"
                                  value={detail.weight}
                                  variant="standard"
                                  onChange={(e) => {
                                    this.handleChangeWeightNumber(
                                      detail_key + 1,
                                      exercise.id,
                                      e
                                    );
                                  }}
                                />
                              </div>

                              <Tooltip
                                title="Delete Set"
                                className={classes.setTrashContainer}
                              >
                                <IconButton
                                  onClick={() => {
                                    this.handleDeleteSet(
                                      detail_key + 1,
                                      exercise.id
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className={classes.trashIcon}
                                  />
                                </IconButton>
                              </Tooltip>
                            </div>
                          );
                        }
                      )}
                      <div className={classes.addSetButtonContainer}>
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

export default withRouter(withStyles(styles)(CustomCreateWorkout));
