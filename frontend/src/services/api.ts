// src/services/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
 
  headers: {
    "Content-Type": "application/json",
  },
});
// Optional: add interceptors for auth tokens, logging, etc.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
export default apiClient;
