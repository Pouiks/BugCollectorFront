// utils/authApi.js
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
      localStorage.setItem('token', data.token); // Stocker le token JWT
      localStorage.setItem('userDomain', data.user.domain); // Stocker le domaine utilisateur
      return data; // Retourner les données de l'utilisateur
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error; // Renvoyer l'erreur
    }
  };
  
  export const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/api/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
  