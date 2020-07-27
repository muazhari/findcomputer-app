import React, { Component } from "react";
import { Formik, Field } from "formik";

const Checkbox = (props) => {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label>
          <input
            {...props}
            type="checkbox"
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  (value) => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
                props.updateValue(nextValue);
              } else {
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
                props.updateValue(nextValue);
              }
            }}
          />
          {` ${props.text}`}
        </label>
      )}
    </Field>
  );
};

class SearchFilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { initialValues, updateValue } = this.props;
    return (
      <div className="container ">
        <Formik initialValues={initialValues} enableReinitialize>
          {(props) => (
            <div className="container d-md-flex flex-md-row justify-content-center">
              <div className="mx-3">
                <Checkbox
                  updateValue={updateValue}
                  name="parameter"
                  value="username"
                  text="Owner"
                />
              </div>
              <div className="mx-3">
                <Checkbox
                  updateValue={updateValue}
                  name="parameter"
                  value="name"
                  text="Name"
                />
              </div>
              <div className="mx-3">
                <Checkbox
                  updateValue={updateValue}
                  name="parameter"
                  value="description"
                  text="Description"
                />
              </div>
              <div className="mx-3">
                <Checkbox
                  updateValue={updateValue}
                  name="parameter"
                  value="category"
                  text="Category"
                />
              </div>
              <div className="mx-3">
                <Checkbox
                  updateValue={updateValue}
                  name="parameter"
                  value="price"
                  text="Price"
                />
              </div>
            </div>
          )}
        </Formik>
      </div>
    );
  }
}

export default SearchFilterComponent;
