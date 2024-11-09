import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/customers', // Adjust base URL as needed
});

export default axiosInstance;
