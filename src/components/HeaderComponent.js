import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import AuthSession from "../services/AuthSession";

class HeaderComponent extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: AuthSession.handleIsLoggedIn(),
      username: AuthSession.handleIsLoggedIn()
        ? AuthSession.handleGetUser().username
        : null,
    };
  }

  componentDidMount() {
    if (AuthSession.handleIsLoggedIn()) {
      const { id, username, password } = AuthSession.handleGetUser();
      this.setState({
        isLoggedIn: true,
        username,
      });
    }
  }

  handleLogout = () => {
    AuthSession.handleLogoutSucceed();
    this.setState({
      isLoggedIn: AuthSession.handleIsLoggedIn(),
      username: "",
    });
    this.props.history.replace("/logout");
    this.forceUpdate();
    // window.open(`/logout`, "_self");
  };

  handleMyShop = () => {
    const { username, isLoggedIn } = this.state;
    this.props.history.push(`/shops/${username}`);
  };

  handleProfile = () => {
    const { username, isLoggedIn } = this.state;
    this.props.history.push(`/profile/${username}`);
  };

  render() {
    const { username, isLoggedIn } = this.state;

    return (
      <div className="component header mb-5">
        <header>
          <nav className="navbar navbar-expand-md ">
            <div className="navbar-brand">
              <Link to={isLoggedIn ? `/home` : "/auth"}>Find Computer</Link>
            </div>
            <ul className="navbar-nav">
              {true && (
                <>
                  <li className="nav-link">
                    <Link to="/home">Home</Link>
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
                  <Link to="/auth">Authenticate</Link>
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
