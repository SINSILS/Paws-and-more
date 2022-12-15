import axios from "axios";

const API_URL = "http://localhost:3000/api/animalTypes";

const getAllTopics = (animalTypeId: string) => {
  return axios.get(`${API_URL}/${animalTypeId}/topic`, {});
};

const getTopic = (animalTypeId: string, id: string) => {
  return axios.get(`${API_URL}/${animalTypeId}/topic/${id}`);
};

const createTopic = (
  animalTypeId: string,
  data: { title: string; description: string }
) => {
  return axios.post(`${API_URL}/${animalTypeId}/topic`, data);
};

const updateTopic = (
  animalTypeId: string,
  id: string,
  data: { title: string; description: string }
) => {
  return axios.put(`${API_URL}/${animalTypeId}/topic/${id}`, data);
};

const deleteTopic = (animalTypeId: string, id: string) => {
  return axios.delete(`${API_URL}/${animalTypeId}/topic/${id}`);
};

const topicApi = {
  getAllTopics,
  getTopic,
  createTopic,
  updateTopic,
  deleteTopic,
};

export default topicApi;
