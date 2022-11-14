import React, { Component } from "react";
import styles from "../Styles/ProfileStyles";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Link, withRouter } from "react-router-dom";
import {
  checkForToken,
  getExtendedUserInfo,
  updateExtendedProfile,
} from "../APIManager";
import { ToastContainer, toast } from "react-toastify";
import { FormControl, TextField } from "@mui/material";
import Switch from "@mui/material/Switch";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "",
      feet: "",
      inch: "",
      weight: 0,
      imperial: true,
      age: 0,
    };

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.feetTextField = this.feetTextField.bind(this);
    this.inchTextField = this.inchTextField.bind(this);
    this.weightTextField = this.weightTextField.bind(this);
    this.ageTextField = this.ageTextField.bind(this);
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

    var info = await getExtendedUserInfo();
    if (info.success) {
      console.log(info.data.data);
      var temp_info = info.data.data;
      if (temp_info.height != 0) {
        var temp_feet = temp_info.height?.split("'");
        var temp_inch =
          temp_info.height?.height[temp_info.height.indexOf('"') - 1];
      }
      var temp_weight;
      var temp_age;
      var temp_imperial;

      if (!temp_feet) {
        temp_feet = 0;
        temp_inch = 0;
        temp_weight = 0;
        temp_age = 0;
        temp_imperial = true;
      } else {
        temp_feet = temp_feet[0];
        temp_inch = temp_info.height?.height[temp_info.height.indexOf('"') - 1];
      }

      this.setState({
        height: temp_info?.height,
        feet: temp_feet,
        inch: temp_inch,
        weight: temp_weight,
        imperial: temp_imperial,
        age: temp_age,
      });
    }
  }

  handleSliderChange() {
    this.setState({ imperial: !this.state.imperial });
  }

  feetTextField(e) {
    this.setState({
      feet: e.target.value,
    });
  }

  inchTextField(e) {
    this.setState({
      inch: e.target.value,
    });
  }

  weightTextField(e) {
    this.setState({
      weight: e.target.value,
    });
  }

  ageTextField(e) {
    this.setState({
      age: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    var temp_height = `${e.target.feet.value}' ${e.target.inch.value}"`;
    var temp_obj = {
      height: temp_height,
      weight: e.target.weight.value,
      age: e.target.age.value,
      imperial: this.state.imperial,
    };
    var result = await updateExtendedProfile(temp_obj);

    if (result.success) {
      toast.success("Profile was successfully updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("There has been an error updating your profile", {
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
        <form onSubmit={this.handleSubmit}>
          <div className={classes.textFieldContainerHeight}>
            Height:
            <TextField
              id="standard-basic"
              label="Feet"
              variant="standard"
              name="feet"
              value={this.state.feet}
              className={classes.textFieldFeet}
              onChange={(e) => {
                this.feetTextField(e);
              }}
            />
            <TextField
              id="standard-basic"
              label="Inch"
              variant="standard"
              name="inch"
              value={this.state.inch}
              className={classes.textFieldInch}
              onChange={(e) => {
                this.inchTextField(e);
              }}
            />
          </div>
          <div className={classes.textFieldContainer}>
            <TextField
              id="standard-basic"
              label="Weight"
              variant="standard"
              name="weight"
              value={this.state.weight}
              className={classes.textField}
              onChange={(e) => {
                this.weightTextField(e);
              }}
            />
          </div>
          <div className={classes.textFieldContainer}>
            <TextField
              id="standard-basic"
              label="Age"
              variant="standard"
              name="age"
              value={this.state.age}
              className={classes.textField}
              onChange={(e) => {
                this.ageTextField(e);
              }}
            />
          </div>
          <div className={classes.textFieldContainer}>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Imperial or Metric</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.imperial}
                      onChange={this.handleSliderChange}
                      name="gilad"
                    />
                  }
                  label={this.state.imperial ? "Imperial" : "Metric"}
                />
              </FormGroup>
            </FormControl>
          </div>
          <Button
            className={classes.submitButton}
            variant="contained"
            type="submit"
          >
            Save Changes
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Profile));
