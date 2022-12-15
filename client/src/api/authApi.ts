import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

const login = (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, {
    email,
    password,
  });
};

const register = (username: string, email: string, password: string) => {
  return axios.post(`${API_URL}/register`, {
    email,
    username,
    password,
  });
};

const authApi = {
  login,
  register,
};

export default authApi;
