import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://boardify-qn63.onrender.com',  // Your server URL // https://boardify-qn63.onrender.com  http://localhost:8000
  withCredentials: true,  // Allow cookies to be sent and received
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('tokens') || Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
// Add a request interceptor to log request details
// axiosInstance.interceptors.request.use(
//   (config) => {
//     console.log('Request Config:', config); // Logs the entire request configuration
//     if (config.data) {
//       console.log('Request Body:', config.data); // Logs the request body if present
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;