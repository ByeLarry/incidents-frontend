import axios, { HttpStatusCode } from "axios";
import {
  ACCESS_TOKEN_KEY,
  DEFAULT_HTTP_TIMEOUT,
} from "../libs/utils/consts.util";
import { AuthService } from "../libs/services/auth.service";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: DEFAULT_HTTP_TIMEOUT,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    originalRequest._retry = false;
    if (
      error.response.status === HttpStatusCode.Unauthorized &&
      localStorage.getItem(ACCESS_TOKEN_KEY) &&
      !originalRequest._retry &&
      originalRequest &&
      !originalRequest.url.includes("api/auth/refresh")
    ) {
      originalRequest._retry = true;
      const response = await AuthService.refreshToken();
      try {
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.value);
        return apiClient.request(originalRequest);
      } catch (e) {
        console.error("Axios error:", e);
      }
    }
    throw error;
  }
);

export default apiClient;
