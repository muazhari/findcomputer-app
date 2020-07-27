import Axios from "axios";

class SearchService {
  // apiURL = "http://localhost:3000/api/v1";
  apiURL = process.env.REACT_APP_API_URL;

  getAllItem() {
    return Axios.get(`${this.apiURL}/items`);
  }

  getAllItemWithUsername() {
    return Axios.get(`${this.apiURL}/items/with/username`);
  }

  getItemById(itemId) {
    return Axios.get(`${this.apiURL}/items/${itemId}`);
  }
}

export default new SearchService();
