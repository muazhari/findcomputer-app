import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "../components/Layout";

import AuthenticatedRoute from "../routes/AuthenticatedRoute";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";

class RootRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/auth" component={AuthPage} />
          <AuthenticatedRoute path="/home" component={HomePage} />
          <Route path="/" />
        </Switch>
      </Router>
    );
  }
}

export default RootRoute;
