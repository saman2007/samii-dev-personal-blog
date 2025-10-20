import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.WEBSITE_URL || process.env.NEXT_PUBLIC_WEBSITE_URL,
  headers: { "Content-Type": "application/json" },
});
