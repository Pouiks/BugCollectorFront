// src/utils/api.js
import axios from 'axios';
import { useUser } from '../context/UserContext';  // Importer le hook du contexte utilisateur

const api = axios.create({
  baseURL: 'https://ton-api-backend.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token dans chaque requête
api.interceptors.request.use(
  (config) => {
    const { token } = useUser();  // Récupérer le token depuis le contexte utilisateur
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
