import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

interface Role {
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
}

const getUserData = () => {
  return axios.get(`${API_URL}/me`, {});
};

const getUserPosts = () => {
  return axios.get(`${API_URL}/me/posts`, {});
};

const userApi = {
  getUserData,
  getUserPosts,
};

export default userApi;
