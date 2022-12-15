import axios from "axios";

const API_URL = "http://localhost:3000/api/animalTypes";

const getPosts = (animalTypeId: string, topicId: string) => {
  return axios.get(`${API_URL}/${animalTypeId}/topic/${topicId}/post`, {});
};

const getPost = (animalTypeId: string, topicId: string, id: string) => {
  return axios.get(`${API_URL}/${animalTypeId}/topic/${topicId}/post/${id}`);
};

const createPost = (
  animalTypeId: string,
  topicId: string,
  data: { title: string; content: string }
) => {
  return axios.post(`${API_URL}/${animalTypeId}/topic/${topicId}/post`, data);
};

const updatePost = (
  data: {
    title: string;
    content: string;
  },
  animalTypeId: string,
  topicId: string,
  id: string
) => {
  return axios.put(
    `${API_URL}/${animalTypeId}/topic/${topicId}/post/${id}`,
    data
  );
};

const deletePost = (animalTypeId: string, topicId: string, id: string) => {
  return axios.delete(`${API_URL}/${animalTypeId}/topic/${topicId}/post/${id}`);
};

const postApi = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};

export default postApi;
