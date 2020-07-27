import React, { Component } from "react";
import ItemService from "../api/ItemService";
import AuthSession from "../services/AuthSession";

import ShopUpdateFormComponent from "../components/ShopUpdateFormComponent";
import ShopUpdateItemComponent from "../components/ShopUpdateItemComponent";

class ShopUpdatePage extends Component {
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
    const { match } = this.props;
    const { name, description, category, price } = val;
    const itemToUpdate = { name, description, category, price };
    this.setState({ isLoading: true });

    ItemService.updateById({ itemId: match.params.itemId, itemToUpdate })
      .then((res) => {
        console.log(res);
        this.handleItemFetch();
        // this.props.history.goBack();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleDelete = () => {
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

  handleValidate = (val) => {
    const error = {};
    if (!val.name) {
      error.name = "Enter a name";
    }

    if (!val.description) {
      error.description = "Enter a description";
    }

    if (!val.category) {
      error.category = "Enter a category";
    }

    if (!val.price) {
      error.price = "Enter a price";
    }

    return error;
  };

  render() {
    const { itemValues, isLoading } = this.state;
    return (
      <div className="container">
        <h1 className="text-center mb-5">My Shop Update</h1>

        <ShopUpdateItemComponent initialValues={itemValues} />
        {isLoading && <div className="container alert alert-info">Loading</div>}
        <ShopUpdateFormComponent
          initialValues={itemValues}
          handleSubmit={this.handleSubmit}
          handleDelete={this.handleDelete}
          handleValidate={this.handleValidate}
        />
      </div>
    );
  }
}

export default ShopUpdatePage;
