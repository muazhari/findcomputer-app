import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import AuthService from "../services/AuthSession";

class AuthenticatedRoute extends Component {
  constructor(props) {
    super();
    this.state = { isAuthenticated: AuthService.handleIsLoggedIn() };
  }

  render() {
    // const isAuthenticated = AuthService.handleIsLoggedIn();
    const { isAuthenticated } = this.state;

    if (isAuthenticated) {
      return <Route {...this.props} />;
    }
    return <Redirect to="/auth" />;
  }
}

export default withRouter(AuthenticatedRoute);
