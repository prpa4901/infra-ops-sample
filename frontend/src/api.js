import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",  // Django backend
  timeout: 5000,  // 5 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request/response interceptors for logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default api;
