import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "../Styles/SingleWorkoutStyles";
import { ToastContainer, toast } from "react-toastify";
import groupedOptions from "../exercises_type";
import { checkForToken, getWorkoutByID, updateWorkout } from "../APIManager";
import {
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import Spinner from "react-bootstrap/Spinner";
import jwt_decode from "jwt-decode";

class SingleWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: null,
      workoutID: "",
      loading: true,
      id: "",
      workout_data: {},
      exercises: [],
      name: "",
      timerString: "",
      public: true,
      notes: "",
      time: 0,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeNotes = this.handleChangeNotes.bind(this);
    this.switchPublic = this.switchPublic.bind(this);
    this.handleAddExercise = this.handleAddExercise.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleDeleteExercise = this.handleDeleteExercise.bind(this);
    this.handleChangeRepsNumber = this.handleChangeRepsNumber.bind(this);
    this.handleChangeWeightNumber = this.handleChangeWeightNumber.bind(this);
    this.handleDeleteSet = this.handleDeleteSet.bind(this);
    this.handleAddSet = this.handleAddSet.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      var workoutData = await getWorkoutByID(this.state.id);
      console.log(workoutData.data.id);
      var workout_id = workoutData.id;
      if (workoutData.success) {
        workoutData = workoutData.data;
        this.setState({ workout_data: workoutData });

        //Timer String
        var minutes = Math.floor(workoutData.time / 60);
        var seconds = ("0" + (workoutData.time % 60)).slice(-2);

        this.setState({
          timerString: `${minutes}:${seconds}`,
          public: workoutData.public,
          name: workoutData.name,
          notes: workoutData.notes,
          exercises: workoutData.exercise,
          loading: false,
          time: workoutData.time,
          workoutID: workoutData.id,
        });
      }
    } catch (err) {
      console.log(err);
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

  switchPublic() {
    this.setState({ public: !this.state.public });
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleChangeNotes(e) {
    this.setState({ notes: e.target.value });
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

  handleDeleteExercise(exercise_id) {
    var temp_exercise_state = this.state.exercises;
    for (var i = 0; i < temp_exercise_state.length; i++) {
      if (temp_exercise_state[i].id === exercise_id) {
        temp_exercise_state.splice(i, 1);
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

  async handleSubmit(e) {
    e.preventDefault();

    if (this.state.button === 2) {
      console.log(this.state.workoutID);
      var tempobj = {
        workout: {
          id: this.state.workoutID,
          time: this.state.time,
          name: e.target.name.value,
          notes: e.target.notes.value,
          public: this.state.public,
          exercise: this.state.exercises,
        },
      };
      var result = await updateWorkout(this.state.workoutID, tempobj);

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
    }
  }

  render() {
    const { classes } = this.props;
    var owner =
      this.state.workout_data.created_by ===
      jwt_decode(localStorage.getItem("token")).id;
    return (
      <div className={classes.mainContainer}>
        {!this.state.loading ? (
          <div>
            <div className={classes.editingWorkoutHeader}>
              {`Editing Workout ${this.state.name}`}
            </div>
            <form onSubmit={this.handleSubmit} className={classes.form}>
              <div className={classes.timer}>
                Timer: {this.state.timerString}
              </div>
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
                {owner ? (
                  <TextField
                    required
                    label="Name"
                    name="name"
                    variant="standard"
                    id="standard-required"
                    value={this.state.name}
                    onChange={this.handleChangeName}
                    className={classes.textField}
                  />
                ) : (
                  <TextField
                    required
                    disabled
                    label="Name"
                    name="name"
                    variant="standard"
                    id="standard-required"
                    value={this.state.name}
                    onChange={this.handleChangeName}
                    className={classes.textField}
                  />
                )}
              </div>

              <div className={classes.textFieldContainer}>
                {owner ? (
                  <TextField
                    required
                    label="Notes"
                    name="notes"
                    id="standard-required"
                    label="Notes"
                    variant="standard"
                    value={this.state.notes}
                    onChange={this.handleChangeNotes}
                    className={classes.textField}
                  />
                ) : (
                  <TextField
                    required
                    disabled
                    label="Notes"
                    name="notes"
                    id="standard-required"
                    label="Notes"
                    variant="standard"
                    value={this.state.notes}
                    onChange={this.handleChangeNotes}
                    className={classes.textField}
                  />
                )}
              </div>

              <div className={classes.buttonContainer}>
                {this.state.workout_data.created_by ===
                jwt_decode(localStorage.getItem("token")).id ? (
                  <Button
                    variant="contained"
                    className={classes.addExerciseButton}
                    onClick={() => {
                      this.handleAddExercise();
                    }}
                  >
                    Add Exercise
                  </Button>
                ) : (
                  <div></div>
                )}
              </div>

              <div className={classes.buttonContainer}>
                {this.state.workout_data.created_by ===
                jwt_decode(localStorage.getItem("token")).id ? (
                  <Button
                    variant="contained"
                    type="submit"
                    className={classes.submitButton}
                    onClick={() => {
                      this.setState({ button: 2 });
                    }}
                  >
                    Save Changes
                  </Button>
                ) : (
                  <div></div>
                )}
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
                            {this.state.workout_data.created_by ===
                            jwt_decode(localStorage.getItem("token")).id ? (
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
                            ) : (
                              <Select
                                isDisabled
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
                            )}
                            {this.state.workout_data.created_by ===
                            jwt_decode(localStorage.getItem("token")).id ? (
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
                            ) : (
                              <div></div>
                            )}
                          </div>
                          {this.state.exercises[key].details.map(
                            (detail, detail_key) => {
                              return (
                                <div
                                  key={detail_key}
                                  className={classes.groupOfSets}
                                >
                                  <div className={classes.textFieldContainer}>
                                    {owner ? (
                                      <TextField
                                        id="standard-required"
                                        label="Reps"
                                        label="Set"
                                        defaultValue={detail_key + 1}
                                        variant="standard"
                                      />
                                    ) : (
                                      <TextField
                                        disabled
                                        id="standard-required"
                                        label="Reps"
                                        label="Set"
                                        defaultValue={detail_key + 1}
                                        variant="standard"
                                      />
                                    )}
                                  </div>

                                  <div className={classes.textFieldContainer}>
                                    {owner ? (
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
                                    ) : (
                                      <TextField
                                        disabled
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
                                    )}
                                  </div>

                                  <div className={classes.textFieldContainer}>
                                    {owner ? (
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
                                    ) : (
                                      <TextField
                                        id="standard-required"
                                        disabled
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
                                    )}
                                  </div>
                                  {this.state.workout_data.created_by ===
                                  jwt_decode(localStorage.getItem("token"))
                                    .id ? (
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
                                  ) : (
                                    <div></div>
                                  )}
                                </div>
                              );
                            }
                          )}
                          <div className={classes.addSetButtonContainer}>
                            {this.state.workout_data.created_by ===
                            jwt_decode(localStorage.getItem("token")).id ? (
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
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <div>
                      {this.state.workout_data.created_by ===
                      jwt_decode(localStorage.getItem("token")).id ? (
                        <div></div>
                      ) : (
                        <div>
                          <Link
                            to={{
                              pathname: "/customcreateworkout",
                              state: { workout: this.state.workout_data },
                            }}
                          >
                            <Button
                              variant="contained"
                              className={classes.submitButton}
                            >
                              Use this template
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </form>
          </div>
        ) : (
          <Spinner animation="border" role="status">
            Loading...
          </Spinner>
        )}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(SingleWorkout));
