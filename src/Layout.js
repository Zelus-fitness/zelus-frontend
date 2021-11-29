import React, { Component } from "react";
import Navbar from "./Components/Navbar";

export default class Layout extends Component {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Navbar />
        <div style={{ width: "85%", left: "15%", position: "absolute" }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
