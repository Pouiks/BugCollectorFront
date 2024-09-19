const API_BASE_URL = 'http://localhost:3000/api/users';

// Fonction pour récupérer tous les utilisateurs
export const fetchUsers = async () => {
  try {
    console.log("Envoi de la requête pour fetchUsers...");
    const response = await fetch(`${API_BASE_URL}/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Inclure les cookies avec la requête
    });

    // Log des informations sur la requête et la réponse
    console.log("Status de la réponse:", response.status);
    console.log("Headers de la réponse:", response.headers);

    if (!response.ok) {
      const errorText = await response.text(); // Afficher le texte de l'erreur
      console.error('Erreur lors de la récupération des utilisateurs:', errorText);
      throw new Error('Erreur lors de la récupération des utilisateurs');
    }

    const data = await response.json();
    console.log("Données chargées fetchUsers:", data);
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    throw error;
  }
};



// Fonction pour créer un nouvel utilisateur
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Assurez-vous que les cookies sont envoyés avec la requête
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Extraire les détails de l'erreur
      throw { response, data: errorData };
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};


// Fonction pour mettre à jour un utilisateur
export const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Assurez-vous que les cookies sont envoyés avec la requête
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    throw error;
  }
};
