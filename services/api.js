import axios from 'axios';

export const api = axios.create({
    baseURL: "https://localhost:7168/v1/api"
});

// Interceptador para incluir token automaticamente
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};