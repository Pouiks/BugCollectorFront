// utils/authApi.js

export const handleLogin = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Important pour inclure les cookies dans les requêtes
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la connexion');
    }

    const data = await response.json();
    return data; // Retourner les données de l'utilisateur
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error; // Renvoyer l'erreur
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Inclure les cookies dans la requête
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du profil utilisateur');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur:', error);
    throw error;
  }
};

// Fonction pour se déconnecter
export const handleLogout = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // Inclure les cookies pour la requête de déconnexion
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la déconnexion');
    }

    return true; // Déconnexion réussie
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    throw error;
  }
};
