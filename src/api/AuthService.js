import Axios from "axios";
import AuthSession from "../services/AuthSession";

// eslint-disable-next-line no-undef

class AuthService {
  // apiURL = "http://localhost:3000/api/v1";
  apiURL = process.env.REACT_APP_API_URL;

  handleLogin({ username, password }) {
    return Axios.post(`${this.apiURL}/auth/login`, { username, password });
  }

  handleRegister({ username, email, password }) {
    return Axios.post(`${this.apiURL}/auth/register`, {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
