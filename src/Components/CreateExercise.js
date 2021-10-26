import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import styles from "../Styles/CreateExerciseStyles";
import { Link, withRouter } from "react-router-dom";
import { checkForToken, createExercise } from "../APIManager";

class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      checked: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropDownMenuChange = this.handleDropDownMenuChange.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  componentDidMount() {
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

    var exerciseData = {
      name: e.target.name.value,
      sets: e.target.sets.value,
      reps: e.target.reps.value,
      rpe: e.target.rpe.value,
      type: e.target.type.value,
      public: this.state.checked,
    };

    try {
      var exerciseResponse = await createExercise(exerciseData);
      if (exerciseResponse.success) {
        toast.success("Exercise was created successfully", {
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
    } catch (err) {
      toast.error(err, {
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

  handleDropDownMenuChange(event) {
    this.setState({ type: event.target.value });
  }

  handleCheckBox(event) {
    this.setState({ checked: event.target.checked });
  }

  render() {
    const exercise_type = [
      { value: "forearms", label: "Forearms" },
      { value: "bicep", label: "Bicep" },
      { value: "tricep", label: "Tricep" },
      { value: "shoulder", label: "Shoulder" },
      { value: "lats", label: "Lats" },
      { value: "lower_back", label: "Lower Back" },
      { value: "traps", label: "Traps" },
      { value: "chest", label: "Chest" },
      { value: "abs", label: "Abs" },
      { value: "glutes", label: "Glutes" },
      { value: "hips", label: "Hips" },
      { value: "quads", label: "Quads" },
      { value: "hamstring", label: "Hamstring" },
      { value: "calves", label: "Calves" },
    ];
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
        <ToastContainer />
        <div className={classes.brandHeader}>Create Exercise</div>
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
              id="outlined-number"
              name="sets"
              label="Sets"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.textField}
            />
          </div>

          <div className={classes.textFieldContainer}>
            <TextField
              id="outlined-number"
              name="reps"
              label="Reps"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.textField}
            />
          </div>

          <div className={classes.textFieldContainer}>
            <TextField
              id="outlined-number"
              name="rpe"
              label="RPE"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.textField}
            />
          </div>
          <div className={classes.textFieldContainer}>
            <TextField
              id="outlined-select-currency"
              select
              label="Type of Exercise"
              value={this.state.type}
              onChange={this.handleDropDownMenuChange}
              name="type"
              className={classes.textField}
            >
              {exercise_type.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className={classes.textFieldContainer}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              checked={this.state.checked}
              onChange={this.handleCheckBox}
              label="Public"
              name="public"
            />
          </div>
          <div>
            <Button
              variant="contained"
              type="submit"
              className={classes.submitButton}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(CreateExercise));
