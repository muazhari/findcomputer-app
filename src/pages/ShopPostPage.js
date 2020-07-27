import React, { Component } from "react";
import ItemService from "../api/ItemService";
import AuthSession from "../services/AuthSession";

import ShopPostFormComponent from "../components/ShopPostFormComponent";

class ShopPostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: [],
      itemValues: {
        id: "",
        name: "",
        description: "",
        category: "",
        price: "",
      },
      isLoading: false,
    };
  }

  componentDidMount() {
    this.handleItemFetch();
  }

  handleItemUpdate = (itemId) => {
    const { username } = AuthSession.handleGetUser();
    // this.props.history.push(`/shops/${username}/items/${itemId}`);
    window.open(`/shops/${username}/items/${itemId}`, "_self");
  };

  handleItemFetch = () => {
    const { match } = this.props;
    ItemService.getById({ itemId: match.params.itemId })
      .then((res) => {
        console.log(res);

        this.setState({ itemValues: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmit = (val) => {
    const { name, description, category, price } = val;
    const itemToCreate = { name, description, category, price };
    this.setState({ isLoading: true });
    ItemService.create({ itemToCreate })
      .then((res) => {
        console.log(res);
        this.handleItemFetch();
        this.props.history.goBack();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleItemDelete = () => {
    const { match } = this.props;

    ItemService.deleteById({ itemId: match.params.itemId })
      .then((res) => {
        console.log(res);
        this.props.history.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { itemValues, isLoading } = this.state;
    return (
      <div className="container">
        <h1 className="text-center mb-5">My Shop Post</h1>

        <div className="container w-75">
          {isLoading && (
            <div className="container alert alert-info">Loading</div>
          )}
          <ShopPostFormComponent
            initialValues={itemValues}
            handleSubmit={this.handleSubmit}
            handleValidate={this.handleValidate}
          />
        </div>
      </div>
    );
  }
}

export default ShopPostPage;
