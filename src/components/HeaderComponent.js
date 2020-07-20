import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import AuthSession from "../services/AuthSession";

class HeaderComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleLogout = () => {
    AuthSession.handleLogoutSucceed();
    this.props.history.replace("/logout");
  };

  handleAuthenticate = () => {
    this.forceUpdate();
  };

  handleMyShop = () => {
    const { id, username, password } = AuthSession.handleGetUser();
    this.props.history.push(`/shops/${username}`);
  };

  handleProfile = () => {
    const { id, username, password } = AuthSession.handleGetUser();
    this.props.history.push(`/profile/${username}`);
  };

  handleHome = () => {
    const { id, username, password } = AuthSession.handleGetUser();
    this.props.history.push(`/home`);
  };

  render() {
    const isLoggedIn = AuthSession.handleIsLoggedIn();

    return (
      <div className="component header mb-5">
        <header>
          <nav className="navbar navbar-expand-md ">
            <div className="navbar-brand">
              <Link to={isLoggedIn ? `/home` : "/auth"}>Find Computer</Link>
            </div>
            <ul className="navbar-nav">
              {isLoggedIn && (
                <>
                  <li className="nav-link">
                    <Link onClick={() => this.handleHome()}>Home</Link>
                  </li>
                  <li className="nav-link">
                    <Link onClick={() => this.handleMyShop()}>My Shop</Link>
                  </li>
                  <li className="nav-link">
                    <Link onClick={() => this.handleProfile()}>Profile</Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end">
              {!isLoggedIn && (
                <li className="nav-link">
                  <Link onClick={() => this.handleAuthenticate()} to="/auth">
                    Authenticate
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-link">
                  <Link onClick={() => this.handleLogout()}>Logout</Link>
                </li>
              )}
            </ul>
          </nav>
          <hr />
        </header>
      </div>
    );
  }
}

export default withRouter(HeaderComponent);
