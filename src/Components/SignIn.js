import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { logInUser } from "../APIManager";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../Styles/SignInStyles";
import Loader from "react-loader-spinner";
import logo from "../Assets/img/expo-bg1.png";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: false,
      error_message: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeSuccessAlert = this.closeSuccessAlert.bind(this);
    this.closeErrorAlert = this.closeErrorAlert.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    var logInData = {
      email_address: e.target.email_address.value.toLowerCase(),
      password: e.target.password.value,
    };

    try {
      var loginInformation = await logInUser(logInData);
      if (loginInformation.success) {
        this.setState({ success: true, error: false });
        setTimeout(
          function () {
            this.props.history.push("/dashboard");
          }.bind(this),
          1000
        );
      } else {
        this.setState({
          error: true,
          success: false,
          error_message: loginInformation.message,
        });
      }
    } catch (err) {
      console.log(err);
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
            {this.state.error_message}
          </Alert>
        </Collapse>
        <div className={classes.mainContainer}>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <img src={logo} alt="Logo" />
            <div className={classes.brandHeader}>Zelus</div>
            <div className={classes.login}>Account Login</div>
            <div className={classes.emailTextField}>
              <TextField
                required
                id="outlined-required"
                label="Email Address"
                name="email_address"
                className={classes.emailInput}
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
              {this.state.success ? (
                <Button
                  className={classes.submitButton}
                  variant="contained"
                  type="submit"
                  disabled
                >
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height={"4vh"}
                    width={"4vh"}
                    // timeout={3000} //3 secs
                  />
                </Button>
              ) : (
                <Button
                  className={classes.submitButton}
                  variant="contained"
                  type="submit"
                >
                  Sign In
                </Button>
              )}
            </div>
            <div className={classes.signUpLink}>
              <Link to="/signup">No account? Sign Up Now</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(SignIn));
