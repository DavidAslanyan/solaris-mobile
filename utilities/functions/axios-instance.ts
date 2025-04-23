import axios from "axios";
import {
  clearTokensFromStorage,
  getAccessToken,
  getRefreshToken,
} from "./crud-tokens-storage";
import { BASE, VERSION } from "@/constants/api-endpoints";
import { navigate } from "./navigation-service";

const API_BASE_URL = `${BASE}/${VERSION}`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - Token might be expired");
      await clearTokensFromStorage();
      navigate("Login"); 
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
