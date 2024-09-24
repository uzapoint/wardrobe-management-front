import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust based on your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
