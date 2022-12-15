import axios from "axios";

const API_URL = "http://localhost:3000/api/animalTypes";

const getAllAnimalTypes = () => {
  return axios.get(`${API_URL}`, {});
};

const getAnimalType = (id: string) => {
  return axios.get(`${API_URL}/${id}`);
};

const createAnimalType = (data: { name: string; description: string }) => {
  return axios.post(`${API_URL}`, data);
};

const updateAnimalType = (
  data: { name: string; description: string },
  id: string
) => {
  return axios.put(`${API_URL}/${id}`, data);
};

const deleteAnimalType = (id: string) => {
  return axios.delete(`${API_URL}/${id}`);
};

const animalTypeApi = {
  getAllAnimalTypes,
  getAnimalType,
  createAnimalType,
  updateAnimalType,
  deleteAnimalType,
};

export default animalTypeApi;
