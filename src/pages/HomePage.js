import React, { Component } from "react";
import ItemService from "../api/ItemService";
import { isStringIn } from "../tools/validations";
import SearchService from "../api/SearchService";
import SearchComponent from "../components/SearchComponent";
import SearchItemsComponent from "../components/SearchItemsComponent";
import SearchFilterComponent from "../components/SearchFilterComponent";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: "",
      itemFound: [],
      itemFilter: {
        parameter: ["username", "name", "description", "category", "price"],
      },
    };
  }

  componentDidMount() {
    const { keywords } = this.state;
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
    const { parameter } = this.state.itemFilter;
    SearchService.getAllItemWithUsername()
      .then((res) => {
        const itemFound = [];
        res.data.forEach((item, i) => {
          const itemFilteredByParameter = Object.keys(item)
            .filter((key) => parameter.includes(key))
            .reduce((obj, key) => {
              return { ...obj, [key]: item[key] };
            }, {});
          if (isStringIn(keywords, itemFilteredByParameter))
            itemFound.push(item);
        });

        this.setState({ itemFound });
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
    const { keywords } = this.state;
    ItemService.deleteById({ itemId })
      .catch((res) => {
        console.log(res);
        this.handleSearchFetch(keywords);
      })
      .then((err) => {
        console.log(err);
      })
      .finally(() => {
        window.open(`/home`, "_self");
      });
  };

  handleUpdateValue = (field) => {
    this.setState({ itemFilter: { parameter: field } });
  };

  render() {
    const { itemFound, itemFilter } = this.state;
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
        <div className="container my-5">
          <SearchFilterComponent
            updateValue={this.handleUpdateValue}
            initialValues={itemFilter}
          />
        </div>
        <div className="container my-5">
          {itemFound.length > 0 && (
            <SearchItemsComponent
              data={itemFound}
              handleItemBuy={this.handleItemBuy}
            />
          )}
        </div>
      </div>
    );
  }
}
