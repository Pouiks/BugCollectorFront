// utils/authApi.js
import { useUser } from '../context/UserContext';

// Fonction pour se connecter
export const handleLogin = async (email, password) => {
  try {
    const response = await fetch('http://ec2-13-53-152-16.eu-north-1.compute.amazonaws.com:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Inclure les cookies dans la requête
    });
    console.log("response handleLogin: ", response)
    if (!response.ok) {
      throw new Error('Erreur lors de la connexion');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token); // Stocker le token dans le localStorage

    return data; // Retourner les données de l'utilisateur
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error; // Renvoyer l'erreur
  }
};


// utils/authApi.js

export const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token manquant dans localStorage');
  }

  const response = await fetch('http://ec2-13-53-152-16.eu-north-1.compute.amazonaws.com:3000/api/auth/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Envoyer le token via l'en-tête Authorization
    },
    credentials: 'include' // Utilisation des cookies si nécessaire
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du profil utilisateur');
  }

  const data = await response.json();
  return data;
};



// Fonction pour la déconnexion
export const handleLogout = async () => {
  const response = await fetch('http://ec2-13-53-152-16.eu-north-1.compute.amazonaws.com:3000/api/auth/logout', {
    method: 'POST',
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la déconnexion');
  }

  // Supprimer le token du localStorage lors de la déconnexion
  localStorage.removeItem('token');
};
