import axios from "axios";
import { getAccessToken, getRefreshToken } from "./crud-tokens-storage";
import { BASE, VERSION } from "@/constants/api-endpoints";

const API_BASE_URL = `${BASE}/${VERSION}`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    // if (accessToken) {
    //   config.headers["Authorization"] = `Bearer ${accessToken}`;
    // }
    // if (refreshToken) {
    //   config.headers["x-refresh-token"] = refreshToken;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - Token might be expired");
      // secureLocalStorage.removeItem(ACCESS_TOKEN);
      // secureLocalStorage.removeItem(REFRESH_TOKEN);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
