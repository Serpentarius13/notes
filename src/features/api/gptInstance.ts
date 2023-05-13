import axios from "axios";

const baseURL = "https://api.openai.com/v1/";

const token = process.env.OPENAI_KEY;

export const gptInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
