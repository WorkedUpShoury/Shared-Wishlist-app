import axios from 'axios';

// Automatically prepend this to all axios requests
axios.defaults.baseURL = 'http://localhost:5000/api';

// Include JWT if present
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
