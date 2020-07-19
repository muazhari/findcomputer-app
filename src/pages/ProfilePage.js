import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ItemService from "../api/ItemService";
import AuthSession from "../services/AuthSession";
import AuthService from "../api/AuthService";

import ProfileUpdateFormComponent from "../components/ProfileUpdateFormComponent";
import ProfileUpdateItemComponent from "../components/ProfileUpdateItemComponent";

import UserService from "../api/UserService";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      itemValues: {
        id: "",
        username: "",
        email: "",
        password: "",
      },
    };
  }

  componentDidMount() {
    this.handleItemFetch();
  }

  handleItemFetch = () => {
    const { username: currentUsername } = AuthSession.handleGetUser();
    UserService.getByUsername({ username: currentUsername })
      .then((res) => {
        console.log(res);

        this.setState({ itemValues: res.data });
        const { id, username, email, password } = res.data;
        AuthSession.handleLoginSucceed({ id, username, email, password });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmit = (val) => {
    const { username: currentUsername } = AuthSession.handleGetUser();
    const { username, email, password } = val;
    const userToUpdate = { username, email, password };

    UserService.update({ userToUpdate })
      .then((res) => {
        console.log(res);
        if (res.status !== 200) return null;

        this.handleItemFetch();
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });
  };

  handleValidate = (val) => {
    const error = {};
    if (!val.username) {
      error.username = "Enter a username";
    }

    if (!val.email) {
      error.email = "Enter a email";
    }

    if (!val.password) {
      error.password = "Enter a password";
    }

    return error;
  };

  render() {
    const { itemData, itemValues, error } = this.state;
    const { id, username, email, password } = itemValues;
    return (
      <div className="container">
        <h1 className="text-center mb-5">Profile Page</h1>

        <div className="container mb-5">
          <ProfileUpdateItemComponent initialValues={itemValues} />
        </div>

        {error && (
          <div className="container alert alert-danger">
            Invalid credentials
          </div>
        )}

        <h2 className="text-center mb-3">Update Profile</h2>
        <ProfileUpdateFormComponent
          initialValues={itemValues}
          handleSubmit={this.handleSubmit}
          handleValidate={this.handleValidate}
        />
      </div>
    );
  }
}

export default ProfilePage;
