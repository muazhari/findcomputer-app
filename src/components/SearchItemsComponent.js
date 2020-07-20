import React, { Component } from "react";
import AuthSession from "../services/AuthSession";

class SearchItemsComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, handleItemBuy } = this.props;
    const { username } = AuthSession.handleGetUser();
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Owner</th>
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
                <td>{item.username}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  {item.username !== username ? (
                    <button
                      onClick={() => handleItemBuy(item.id)}
                      type="button"
                      className="btn btn-outline-primary"
                    >
                      Buy
                    </button>
                  ) : null}
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
