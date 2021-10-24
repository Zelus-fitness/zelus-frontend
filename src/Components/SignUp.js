import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signUpUser } from "../APIManager";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import styles from "../Styles/SignUpStyles";
import CloseIcon from "@mui/icons-material/Close";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeSuccessAlert = this.closeSuccessAlert.bind(this);
    this.closeErrorAlert = this.closeErrorAlert.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    var SignUpData = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email_address: e.target.email_address.value.toLowerCase(),
      password: e.target.password.value,
    };

    var signUpInformation = await signUpUser(SignUpData);
    console.log(signUpInformation.dataValues);
    if (signUpInformation.success) {
      this.setState({ success: true, error: false });
    } else {
      this.setState({ error: true, success: false });
    }
  }

  closeSuccessAlert() {
    this.setState({ success: false });
  }

  closeErrorAlert() {
    this.setState({ error: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {/* Close success alert */}
        <Collapse in={this.state.success}>
          <Alert
            variant="filled"
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={this.closeSuccessAlert}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ maxWidth: "50%", margin: "auto", width: "50%", mt: "2vh" }}
          >
            Sign Up Successful!{" "}
            <Link to="/" style={{ color: "white" }}>
              Back to Sign In
            </Link>
          </Alert>
        </Collapse>

        {/* Close error alert */}
        <Collapse in={this.state.error}>
          <Alert
            variant="filled"
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={this.closeErrorAlert}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ maxWidth: "50%", margin: "auto", width: "50%", mt: "2vh" }}
          >
            There has been an error, please try again
          </Alert>
        </Collapse>
        <div className={classes.mainContainer}>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <div className={classes.loginHeader}>Zelus Signup</div>
            <div className={classes.firstNameTextField}>
              <TextField
                required
                id="outlined-required"
                label="First Name"
                name="first_name"
                className={classes.firstNameInput}
              />
            </div>

            <div className={classes.lastNameTextField}>
              <TextField
                required
                id="outlined-required"
                label="Last Name"
                name="last_name"
                className={classes.lastNameInput}
              />
            </div>

            <div className={classes.passwordTextField}>
              <TextField
                required
                id="outlined-required"
                label="Email Address"
                name="email_address"
                className={classes.passwordInput}
              />
            </div>

            <div className={classes.passwordTextField}>
              <TextField
                required
                id="outlined-required"
                label="Password"
                name="password"
                type="password"
                className={classes.passwordInput}
              />
            </div>

            <div className={classes.submitButtonContainer}>
              <Button
                className={classes.submitButton}
                variant="contained"
                type="submit"
              >
                Sign Up
              </Button>
            </div>
            <div className={classes.signUpLink}>
              <Link to="/">Back to Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SignUp);
