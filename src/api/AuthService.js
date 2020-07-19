import Axios from "axios";
import AuthSession from "../services/AuthSession";

// eslint-disable-next-line no-undef

class AuthService {
  apiURL = "http://localhost:3000/api/v1/auth";

  handleLogin({ username, password }) {
    return Axios.post(`${this.apiURL}/login`, { username, password });
  }

  handleRegister({ username, email, password }) {
    return Axios.post(`${this.apiURL}/register`, { username, email, password });
  }
}

export default new AuthService();
