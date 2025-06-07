import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  // any other defaults: timeout, content-type, etc.
});

// Before each request, grab the token from localStorage and attach it
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Bearer scheme is most common, but adjust if your backend expects something else
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
