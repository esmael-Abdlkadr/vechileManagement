import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 10000,
});

// Request Interceptor
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      window.location.href = "/auth?mode=signin";
    }
    return Promise.reject(error);
  }
);

export default instance;
