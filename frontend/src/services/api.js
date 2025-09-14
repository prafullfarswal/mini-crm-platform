import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    config.headers.Authorization = `Bearer ${user.id}`;
  }
  return config;
});

// Auth API
export const loginWithGoogle = (token) => api.post('/auth/google', { token });

// Segments API
export const createSegment = (segmentData) => api.post('/segments', segmentData);
export const getAudiencePreview = (rules) => api.post('/segments/preview', { rules });

// Campaigns API
export const getCampaigns = () => api.get('/campaigns');

// Customers API
export const getCustomers = () => api.get('/customers');

export default api;