import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ton-api-backend.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token dans chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Récupérer le token depuis le localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Ajouter le token à l'en-tête Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
