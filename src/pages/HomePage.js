import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import ItemService from "../api/ItemService";
import { isStringIn } from "../tools/validations";
import SearchService from "../api/SearchService";
import SearchComponent from "../components/SearchComponent";
import SearchItemsComponent from "../components/SearchItemsComponent";
import AuthSession from "../services/AuthSession";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: "",
      foundItems: [],
    };
  }

  componentDidMount() {
    const { keywords, foundItems } = this.state;
    this.handleSearchFetch(keywords);
  }

  handleSearchValidation = (val) => {
    const error = {};
    if (!val.search) {
      error.search = "Enter a search keyword";
    }
    return error;
  };

  handleSearchSubmit = (val) => {
    const { search } = val;
    this.handleSearchFetch(search);
  };

  handleSearchFetch = (keywords) => {
    const { username } = AuthSession.handleGetUser();
    SearchService.getAllItemWithUsername()
      .then((res) => {
        console.log(res);

        const foundItems = [];
        res.data.forEach((item, i) => {
          if (isStringIn(keywords, item) && item.username !== username)
            foundItems.push(item);
        });

        this.setState({ foundItems });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSearchChange = (event) => {
    console.log(event);
    const { target } = event;
    this.setstate({ keywords: target.search });
  };

  handleItemBuy = (itemId) => {
    const { keywords, foundItems } = this.state;
    ItemService.deleteById({ itemId })
      .catch((res) => {
        console.log(res);
        this.handleSearchFetch(keywords);
      })
      .then((err) => {
        console.log(err);
      });

    window.open(`/home`, "_self");
  };

  render() {
    const { keywords, foundItems } = this.state;
    return (
      <div className="home page container">
        <h1 className="mb-5">Home page</h1>

        <div className="container w-50">
          <SearchComponent
            handleSubmit={this.handleSearchSubmit}
            handleChange={this.handleSearchChange}
            handleValidation={this.handleSearchValidation}
          />
        </div>
        {foundItems.length > 0 && (
          <SearchItemsComponent
            data={foundItems}
            handleItemBuy={this.handleItemBuy}
          />
        )}
      </div>
    );
  }
}
