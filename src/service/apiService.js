import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // URL do JSON Server
  timeout: 5000,
});

export default api;
