import React, { Component } from "react";

import Layout from "../components/Layout";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // <Layout className="auth page">
      <Layout>
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2</p>
        <link to="/">Go back to the homepage</link>
      </Layout>
      // </Layout>
    );
  }
}
