import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: "",
    };
  }

  render() {
    const { keywords } = this.state;
    const { handleSubmit, handleChange, handleValidation } = this.props;

    return (
      <div className="container mb-4">
        <Formik
          initialValues={{ keywords }}
          onSubmit={handleSubmit}
          onChange={handleChange}
          validation={handleValidation}
          enableReinitialize
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="search"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="mb-4">
                <label htmlFor="search">Search an items</label>
                <Field
                  id="search"
                  type="text"
                  name="search"
                  className="form-control"
                />
              </fieldset>

              <button type="submit" className="btn btn-outline-primary">
                Search
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default SearchComponent;
