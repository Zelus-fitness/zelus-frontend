import React, { Component } from 'react'
import { withStyles } from '@mui/styles'
import styles from "../Styles/FindStyles"
import { Link, withRouter } from "react-router-dom";
import { findPublicWorkout, checkForToken } from '../APIManager';
import { ToastContainer, toast } from "react-toastify";

class Find extends Component {
  constructor(props){
    super(props)
    this.state={}
  }

  async componentDidMount(){
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
    var results = await findPublicWorkout()
    if(results.success){
      console.log(results.data)
    }
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Find))