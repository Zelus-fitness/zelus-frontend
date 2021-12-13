import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "../Styles/NavbarStyles";
import Workout from "../Assets/tabBarIcons/workout.png";
import sidebarLinks from "../NavbarLinks";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOutUser } from "../APIManager";
import { ToastContainer, toast } from "react-toastify";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.currentPath = this.currentPath.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    this.currentPath();
  }

  currentPath() {
    const location = this.props.history.location.pathname;
    const parts = location.split("/");
    return "/" + parts[1];
  }

  async handleSignOut() {
    var result = await signOutUser();
    if (result.success) {
      localStorage.removeItem("token");
      this.props.history.push("/");

      toast.success("Successfully Logged Out", {
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
      <div className={classes.navbarContainer}>
        <div className={classes.navbarLinks}>
          {sidebarLinks.map(({ name, route, icon }, index) => {
            return (
              <Link
                to={route}
                className={`${
                  this.currentPath() === route
                    ? `${classes.sidebarLinkisActive}`
                    : `${classes.sideBarLink}`
                }`}
              >
                <div className={classes.fontAwesomeContainer}>
                  <FontAwesomeIcon icon={icon} />
                </div>
                <div className={classes.navbarItemName}>{`${name}`}</div>
              </Link>
            );
          })}
        </div>

        {/* <Link className={classes.sideBarLink} to="/dashboard">
          <div>
            <FontAwesomeIcon icon={faHome} />
          </div>
          <div>Home</div>
        </Link>
        <Link className={classes.sideBarLink} to="/profile">
          <div>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div>Profile</div>
        </Link>
        <Link className={classes.sideBarLink} to="/find">
          <div>
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <div>Find</div>
        </Link>
        <Link className={classes.sideBarLink} to="/workout">
          <div>
            <FontAwesomeIcon icon={faDumbbell} />
          </div>
          <div>Workout</div>
        </Link>
        <Link className={classes.sideBarLink} to="/exercise">
          <div>
            <FontAwesomeIcon icon={faRunning} />
          </div>
          <div>Exercise</div>
        </Link> */}
        <div className={classes.signOutButtonContainer}>
          <Button
            variant="contained"
            className={classes.signoutButton}
            onClick={this.handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Navbar));
