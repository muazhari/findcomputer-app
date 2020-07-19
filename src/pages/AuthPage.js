import React, { Component } from "react";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRegister = () => {
    this.props.history.push("/auth/register");
  };

  handleLogin = () => {
    this.props.history.push("/auth/login");
  };

  render() {
    return (
      <div className="auth page">
        <div className="container m">
          <button
            className="btn btn-outline-primary m-md-5"
            onClick={() => this.handleRegister()}
          >
            Register
          </button>
        </div>
        <div className="container">
          <button
            className="btn btn-outline-primary"
            onClick={() => this.handleLogin()}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}