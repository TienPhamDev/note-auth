// Axios client configuration
import axios from "axios";

import store from "../redux/store";
import { logout } from "../redux/slices/authSlice";
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL_KEY,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);

      if (token) {
        try {
          // Try to parse as JSON first
          const parsedToken = JSON.parse(token);
          const userToken = parsedToken.accessToken || parsedToken;
          config.headers.Authorization = `Bearer ${userToken}`;
          console.log("Using parsed token:", userToken);
        } catch {
          // If JSON parse fails, use token directly
          config.headers.Authorization = `Bearer ${token}`;
          console.log("Using token directly:", token);
        }
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.error("Request interceptor error:", error);
      localStorage.removeItem("token");
    }

    return config;
  },
  (error) => {
    console.error("Request setup error:", error);
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error);

    // Safe check for response and 401 status
    if (error.response && error.response.status === 401) {
      console.log("401 Unauthorized - clearing token");
      localStorage.removeItem("token");

      // Optional: Uncomment to dispatch logout action
      store.dispatch(logout());

      // Optional: Redirect to login
      // window.location.href = "/login";
    }

    // Detailed error logging
    if (error.response) {
      console.error("Server responded with error:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("No response received from server");
      console.error(
        "Check if server is running on:",
        import.meta.env.VITE_API_URL_KEY
      );
    } else {
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  }
);
