import axios from "axios";

export const axiosInstance = axios.create({
  // Set the baseURL for your API requests
  baseURL: "http://127.0.0.1:8000/api",
});

// Add a request interceptor to add the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log({ token });
    if (token) {
      config.headers.Authorization = `Bearer ${token.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
