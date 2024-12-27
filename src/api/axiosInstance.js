import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://boardify-qn63.onrender.com',  // Your server URL // https://boardify-qn63.onrender.com  http://localhost:8000
  withCredentials: true,  // Allow cookies to be sent and received
});

// Add a request interceptor to include the token in headers
// axiosInstance.interceptors.request.use((config) => {
//   const token = Cookies.get('tokens');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

export default axiosInstance;