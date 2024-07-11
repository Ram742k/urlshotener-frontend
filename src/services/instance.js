import axios from 'axios';

// Create an instance of axios
const instance = axios.create({
  baseURL: 'https://urlshortener-backend-e965.onrender.com/api',
  withCredentials: true,
});

// Add a request interceptor to include the token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 403 status code
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      // Redirect to the login page if 403 status code is encountered
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
