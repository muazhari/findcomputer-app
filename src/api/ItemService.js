import Axios from "axios";
import AuthSession from "../services/AuthSession";

class ItemService {
  apiURL = "http://localhost:3000/api/v1";

  getAll() {
    const { id, username, password } = AuthSession.handleGetUser();
    return Axios.get(`${this.apiURL}/users/${username}/items`);
  }

  getById({ itemId }) {
    const { id, username, password } = AuthSession.handleGetUser();
    return Axios.get(`${this.apiURL}/users/${username}/items/${itemId}`);
  }

  create({ itemToCreate }) {
    const { id, username, password } = AuthSession.handleGetUser();
    const { name, description, category, price } = itemToCreate;
    return Axios.post(`${this.apiURL}/users/${username}/items`, {
      name,
      description,
      category,
      price,
    });
  }

  updateById({ itemId, itemToUpdate }) {
    const { id, username, password } = AuthSession.handleGetUser();
    const { name, description, category, price } = itemToUpdate;
    return Axios.put(`${this.apiURL}/users/${username}/items/${itemId}`, {
      name,
      description,
      category,
      price,
    });
  }

  deleteById({ itemId }) {
    const { id, username, password } = AuthSession.handleGetUser();
    // return Promise.all(
    //   Axios.delete(`${this.apiURL}/users/${username}/items/${itemId}`),
    //   Axios.delete(`${this.apiURL}/items/${itemId}`)
    // );

    return Axios.delete(`${this.apiURL}/items/${itemId}`);
  }
}

export default new ItemService();
