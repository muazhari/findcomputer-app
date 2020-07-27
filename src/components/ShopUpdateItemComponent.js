import React, { Component } from "react";

class ShopUpdateItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { initialValues } = this.props;
    const { id, name, description, category, price } = initialValues;

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr key={id}>
            <td>{name}</td>
            <td>{description}</td>
            <td>{category}</td>
            <td>{price}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default ShopUpdateItemComponent;
