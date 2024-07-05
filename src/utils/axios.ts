import axios from "axios";
import { getStringData } from "./storage";

const axiosInstance = axios.create({
  baseURL: "https://workwell-api.azurewebsites.net/api",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // Do something before request is sent

    const token = await getStringData("token");
    config.headers.Authorization = "Bearer " + token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
