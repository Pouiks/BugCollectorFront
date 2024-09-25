// utils/authApi.js

// Fonction pour se connecter
export const handleLogin = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la connexion');
    }

    const data = await response.json();
    // Stocker le token dans le localStorage après login réussi
    localStorage.setItem('token', data.token);  
    return data;  // Retourner les données utilisateur
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};


// Fonction pour récupérer le profil utilisateur
export const fetchUserProfile = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Inclure le token dans l'en-tête
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

// Fonction pour la déconnexion
export const handleLogout = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/auth/logout`, {
      method: 'POST',
      credentials: 'include', // Assurez-vous que le cookie est inclus
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la déconnexion');
    }

    // Supprimer le token du localStorage lors de la déconnexion
    localStorage.removeItem('token');
    
    return response.json();
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    throw error;
  }
};
