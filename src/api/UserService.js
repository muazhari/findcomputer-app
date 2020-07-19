import Axios from "axios";
import AuthSession from "../services/AuthSession";

class UserService {
  apiURL = "http://localhost:3000/api/v1";

  getAll() {
    const { id, username, password } = AuthSession.handleGetUser();
    return Axios.get(`${this.apiURL}/users/`);
  }

  getByUsername({ username }) {
    // const { id, username, password } = AuthSession.handleGetUser();
    return Axios.get(`${this.apiURL}/users/${username}`);
  }

  update({ userToUpdate }) {
    const { username, email, password } = userToUpdate;
    const {
      id: currentId,
      username: currentUsername,
      password: currentPassword,
    } = AuthSession.handleGetUser();

    return Axios.put(`${this.apiURL}/users/${currentUsername}`, {
      username,
      email,
      password,
    });
  }
}

export default new UserService();
