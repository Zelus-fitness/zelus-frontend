import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "../Styles/NavbarStyles";
import Workout from "../Assets/tabBarIcons/workout.png";
import sidebarLinks from "../NavbarLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.currentPath = this.currentPath.bind(this);
  }

  componentDidMount() {
    this.currentPath();
  }

  currentPath() {
    const location = this.props.history.location.pathname;
    const parts = location.split("/");
    return "/" + parts[1];
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.navbarContainer}>
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
              <div>
                <FontAwesomeIcon icon={icon} />
              </div>
              <div>{`${name}`}</div>
            </Link>
          );
        })}
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
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Navbar));
