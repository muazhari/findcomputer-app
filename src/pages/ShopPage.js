import React, { Component } from "react";
import ItemService from "../api/ItemService";
import AuthSession from "../services/AuthSession";
import ShopItemsComponent from "../components/ShopItemsComponent";

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: [],
    };
  }

  componentDidMount() {
    this.handleItemFetch();
  }

  handleItemFetch = () => {
    ItemService.getAll()
      .then((res) => {
        console.log(res);

        const data = [];
        res.data.forEach((item, i) => {
          data.push(item);
        });

        this.setState({ itemData: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleItemUpdate = (itemId) => {
    const { username } = AuthSession.handleGetUser();
    this.props.history.push(`/shops/${username}/items/${itemId}`);
  };

  handleItemPost = (itemId) => {
    const { username } = AuthSession.handleGetUser();
    this.props.history.push(`/shops/${username}/items/`);
  };

  render() {
    const { itemData } = this.state;
    return (
      <div className="container">
        <h1 className="text-center mb-5">My Shop</h1>
        <div className="container">
          <button
            className="btn btn-outline-success mb-5"
            onClick={this.handleItemPost}
          >
            Post an item!
          </button>
        </div>
        {itemData.length > 0 && (
          <ShopItemsComponent
            data={itemData}
            handleItemUpdate={this.handleItemUpdate}
          />
        )}
      </div>
    );
  }
}

export default ShopPage;
