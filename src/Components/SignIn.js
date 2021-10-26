import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { logInUser } from "../APIManager";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
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
        toast.success(loginInformation.success, {
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
      console.log(err);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* Close error alert */}
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
