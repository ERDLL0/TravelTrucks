import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const fetchCampers = async (params = {}) => {
  const response = await api.get('/campers', { params });
  return response.data;
};

export const fetchCamperById = async (id) => {
  const response = await api.get(`/campers/${id}`);
  return response.data;
};

export default api;
