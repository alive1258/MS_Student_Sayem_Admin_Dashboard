import { getNewAccessToken } from "@/services/auth.services";
import axios from "axios";

// Create an instance of axios
const instance = axios.create({
  withCredentials: true, // Enable cookies in requests
  timeout: 60000, // Set a default timeout of 60 seconds
});

// Flag to track refresh token request status and pending requests queue
let isRefreshing = false;
let pendingRequests = [];

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const config = error.config;

    // Check if error status is 400 (or another status your backend uses for token refresh)

    // if (error.response?.status === 403 && !config.sent) {
    if (error.response?.status === 403 && !config.sent) {
      if (!isRefreshing) {
        isRefreshing = true;
        config.sent = true;

        try {
          await getNewAccessToken();

          // Retry all pending requests after token refresh
          pendingRequests.forEach((callback) => callback());
          pendingRequests = [];

          return instance(config);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Queue requests if refresh is in progress
      return new Promise((resolve) => {
        pendingRequests.push(() => resolve(instance(config)));
      });
    } else {
      // Return a structured error response
      const responseObject = {
        statusCode: error?.response?.status || 500,
        message: error?.response?.data?.message || "Something went wrong!",
      };
      return Promise.reject(responseObject);
    }
  }
);

export { instance };
