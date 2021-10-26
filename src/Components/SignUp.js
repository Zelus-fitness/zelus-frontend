import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signUpUser } from "../APIManager";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../Styles/SignUpStyles";
import { ToastContainer, toast } from "react-toastify";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (signUpInformation.success) {
      toast.success("Sign Up Successful!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"colored"
      });
    } else {
      toast.error("There has been an error, please try again", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"colored"
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <div className={classes.mainContainer}>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <div className={classes.brandHeader}>Zelus</div>
            <div className={classes.signUpHeader}>Account Signup</div>
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
