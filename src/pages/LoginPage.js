import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import AuthService from "../api/AuthService";
import AuthSession from "../services/AuthSession";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: false,
    };
  }

  handleSubmit = (val) => {
    const { username: currentUsername, password: currentPassword } = val;

    AuthService.handleLogin({
      username: currentUsername,
      password: currentPassword,
    })
      .then((res) => {
        console.log(res);
        if (res.status !== 200) return null;

        const { id, username, email, password } = res.data;
        AuthSession.handleLoginSucceed({ id, username, email, password });
        // this.props.history.push("/home");
        window.open(`/home`, "_self");
      })
      .catch((err) => {
        this.setState({ error: true });
        console.log(err);
      });
  };

  handleValidate = (val) => {
    const error = {};
    if (!val.username) {
      error.username = "Enter a username";
    }

    if (!val.password) {
      error.password = "Enter a password";
    }

    return error;
  };

  render() {
    const { username, password, error } = this.state;
    return (
      <div className="container">
        <h1 className="mb-5">Login Page</h1>
        <div className="container display-flex w-25">
          {error && (
            <div className="container alert alert-danger">
              Invalid credentials
            </div>
          )}
          <Formik
            initialValues={{ username, password }}
            onSubmit={this.handleSubmit}
            validate={this.handleValidate}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="mb-4">
                  <label htmlFor="username">Username</label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    className="form-control"
                  />
                </fieldset>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="mb-4">
                  <label htmlFor="password">Password</label>
                  <Field
                    id="password"
                    name="password"
                    type="text"
                    className="form-control"
                  />
                </fieldset>

                <button type="submit" className="btn btn-outline-primary mb-4">
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default LoginPage;
