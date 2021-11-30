import React, { Component } from "react";
import styles from "../Styles/ProfileStyles";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Link, withRouter } from "react-router-dom";
import { checkForToken, getExtendedUserInfo } from "../APIManager";
import { ToastContainer, toast } from "react-toastify";
import { TextField } from "@mui/material";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      information: {},
    };
  }

  async componentDidMount() {
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

    var info = await getExtendedUserInfo();
    console.log(info);
    if (info.success) {
      this.setState({ information: info });
    }
  }

  render() {
    return (
      <div>
        <div>{JSON.stringify(this.state.information)}</div>
        <div>
          <TextField id="standard-basic" label="Standard" variant="standard" />
        </div>
        <div>
          <TextField id="standard-basic" label="Standard" variant="standard" />
        </div>
        <div>
          <TextField id="standard-basic" label="Standard" variant="standard" />
        </div>
        <div>
          <TextField id="standard-basic" label="Standard" variant="standard" />
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Profile));
