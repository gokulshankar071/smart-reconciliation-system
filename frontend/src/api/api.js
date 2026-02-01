import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: `https://smart-reconciliation-backend-6cpj.onrender.com/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
