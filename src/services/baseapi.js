import axios from "axios";
import { getSession } from "next-auth/react";

const ApiClient = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

   // Create a new Axios instance
   const instance = axios.create({
    baseURL,
  });

 // Request interceptor — runs before every request
  instance.interceptors.request.use(
    async (config) => {
      const session = await getSession();

      Object.assign(config.headers, { "Content-Type": "application/json" });

      if (session) {
        Object.assign(config.headers || {}, {
          "x-access-token": session?.user?.accessToken,
        });
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // 🛬 Response interceptor — runs after every response
  instance.interceptors.response.use(
    (response) => {
      // Return the actual data object from API response
      return response.data;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export default ApiClient; // 🚀 Export the API client for use across app
