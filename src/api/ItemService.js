import Axios from "axios";
import AuthSession from "../services/AuthSession";

class ItemService {
  // apiURL = "http://localhost:3000/api/v1";
  apiURL = process.env.REACT_APP_API_URL;

  getAll() {
    const { username } = AuthSession.handleGetUser();
    return Axios.get(`${this.apiURL}/users/${username}/items`);
  }

  getById({ itemId }) {
    const { username } = AuthSession.handleGetUser();
    return Axios.get(`${this.apiURL}/users/${username}/items/${itemId}`);
  }

  create({ itemToCreate }) {
    const { username } = AuthSession.handleGetUser();
    const { name, description, category, price } = itemToCreate;
    return Axios.post(`${this.apiURL}/users/${username}/items`, {
      name,
      description,
      category,
      price,
    });
  }

  updateById({ itemId, itemToUpdate }) {
    const { username } = AuthSession.handleGetUser();
    const { name, description, category, price } = itemToUpdate;
    return Axios.put(`${this.apiURL}/users/${username}/items/${itemId}`, {
      name,
      description,
      category,
      price,
    });
  }

  deleteById({ itemId }) {
    // const { id, username, password } = AuthSession.handleGetUser();
    // return Promise.all(
    //   Axios.delete(`${this.apiURL}/users/${username}/items/${itemId}`),
    //   Axios.delete(`${this.apiURL}/items/${itemId}`)
    // );

    return Axios.delete(`${this.apiURL}/items/${itemId}`);
  }
}

export default new ItemService();
