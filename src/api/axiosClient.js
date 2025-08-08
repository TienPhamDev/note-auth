// Axios client configuration
import axios from "axios";

// import store from "../redux/store";
// import { logout } from "../redux/slices/authSlice";
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL_KEY,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const userToken = JSON.parse(token).accessToken;
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${userToken}`; // Adjust based on how you store the token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // store.dispatch(logout());
      localStorage.removeItem("token");
      console.log(error.response);
    }
    return Promise.reject(error);
  }
);
