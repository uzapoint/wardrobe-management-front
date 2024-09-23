import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Add a request interceptor to include the token in all requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Get the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add token to the Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;