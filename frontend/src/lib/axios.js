import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chwmq.onrender.com/api",
  withCredentials: true,
});