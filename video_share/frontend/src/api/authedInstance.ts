import axios from "axios";

export const authedInstance = axios.create({
  // Set the baseURL for your API requests
  baseURL: "/api/",
});

// Add a request interceptor to add the Authorization header
authedInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      config.headers.Authorization = `Bearer ${token.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
