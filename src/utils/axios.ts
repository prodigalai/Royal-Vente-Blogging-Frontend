import axios from 'axios';

const api = axios.create({
  baseURL: 'https://royal-vente-blogging-system.onrender.com/api/v1',
  // You can add other default configs here (headers, timeout, etc.)
});

export default api; 