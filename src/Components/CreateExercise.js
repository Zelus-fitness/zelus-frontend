import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import styles from "../Styles/CreateExerciseStyles";
import { Link, withRouter } from "react-router-dom";
import { createExercise } from "../APIManager";

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
        console.log("success");
      }
    } catch (err) {
      console.log(err);
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
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Name"
              name="name"
            />
          </div>

          <div>
            <TextField
              id="outlined-number"
              name="sets"
              label="Sets"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div>
            <TextField
              id="outlined-number"
              name="reps"
              label="Reps"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div>
            <TextField
              id="outlined-number"
              name="rpe"
              label="RPE"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Type of Exercise"
              value={this.state.type}
              onChange={this.handleDropDownMenuChange}
              helperText="Please select your exercise type"
              name="type"
            >
              {exercise_type.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              checked={this.state.checked}
              onChange={this.handleCheckBox}
              label="Public"
              name="public"
            />
          </div>
          <div>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(CreateExercise));
