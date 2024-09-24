
import axios from 'axios';
import { useUserStore } from '@/stores/userState';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token; 

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
