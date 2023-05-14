import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../constants/baseUrl";

export const serverFetcher: AxiosInstance = axios.create({
  baseURL: baseUrl,
});
