import axios from "axios";
import { baseUrl } from "../constants/baseUrl";

export const serverFetcher = axios.create({
  baseURL: baseUrl,
});
