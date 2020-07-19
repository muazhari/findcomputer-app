import React, { Component } from "react";

class SearchItemsComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, handleItemUpdate } = this.props;
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    onClick={() => handleItemUpdate(item.id)}
                    type="button"
                    className="btn btn-outline-primary"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchItemsComponents;
