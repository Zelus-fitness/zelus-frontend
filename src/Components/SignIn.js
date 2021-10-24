import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logInUser } from "../APIManager";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "../Styles/SignInStyles";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    var logInData = {
      email_address: e.target.email_address.value.toLowerCase(),
      password: e.target.password.value,
    };

    var loginInformation = await logInUser(logInData);
    console.log(loginInformation);
    this.setState({
      token: loginInformation.token,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <div className={classes.loginHeader}>Zelus Login</div>
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
            <Button
              className={classes.submitButton}
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </div>
          <div className={classes.signUpLink}>
            <Link to="/signup">No account? Sign Up Now</Link>
          </div>
        </form>

        <p>{this.state.token}</p>
      </div>
    );
  }
}

export default withStyles(styles)(SignIn);
