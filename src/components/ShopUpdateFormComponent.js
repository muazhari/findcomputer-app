import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

class ShopUpdateFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      initialValues,
      handleValidate,
      handleDelete,
      handleSubmit,
    } = this.props;

    return (
      <div className="container w-75">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={handleValidate}
          enableReinitialize
        >
          {(props) => (
            <Form>
              <div className="container d-md-flex">
                <div className="container ">
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="alert alert-warning"
                  />
                  <fieldset className="mb-4">
                    <label htmlFor="username">Name</label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      className="form-control"
                    />
                  </fieldset>

                  <ErrorMessage
                    name="description"
                    component="div"
                    className="alert alert-warning"
                  />
                  <fieldset className="mb-4">
                    <label htmlFor="password">Description</label>
                    <Field
                      id="description"
                      name="description"
                      type="text"
                      className="form-control"
                    />
                  </fieldset>
                </div>

                <div className="container display-flex">
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="alert alert-warning"
                  />
                  <fieldset className="mb-4">
                    <label htmlFor="password">Category</label>
                    <Field
                      id="category"
                      name="category"
                      type="text"
                      className="form-control"
                    />
                  </fieldset>

                  <ErrorMessage
                    name="price"
                    component="div"
                    className="alert alert-warning"
                  />
                  <fieldset className="mb-4">
                    <label htmlFor="password">Price</label>
                    <Field
                      id="price"
                      name="price"
                      type="text"
                      className="form-control"
                    />
                  </fieldset>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary m-4 mb-5"
              >
                Save
              </button>

              <button
                type="button"
                className="btn btn-outline-danger m-4 mb-5"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default ShopUpdateFormComponent;
