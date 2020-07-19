import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ItemService from "../api/ItemService";
import AuthSession from "../services/AuthSession";
import AuthService from "../api/AuthService";

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
    const { username } = AuthSession.handleGetUser();
    const { match } = this.props;
    const { name, description, category, price } = val;
    const itemToCreate = { name, description, category, price };

    ItemService.create({ itemToCreate })
      .then((res) => {
        console.log(res);
        this.handleItemFetch();
        this.props.history.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleItemDelete = () => {
    const { username } = AuthSession.handleGetUser();
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
    const { itemData, itemValues } = this.state;
    const { id, name, description, category, price } = itemValues;
    return (
      <div className="container">
        <h1 className="text-center mb-5">My Shop Post</h1>

        <ShopPostFormComponent
          initialValues={itemValues}
          handleSubmit={this.handleSubmit}
          handleValidate={this.handleValidate}
        />
      </div>
    );
  }
}

export default ShopPostPage;
