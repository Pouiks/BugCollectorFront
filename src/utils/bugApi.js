// utils/bugApi.js
// utils/bugApi.js
export const fetchAllBugs = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/bugs/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Inclure les cookies pour l'authentification
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de tous les bugs');
    }

    const data = await response.json();
    return data; // Retourner tous les bugs
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les bugs:', error);
    throw error;
  }
};


export const fetchBugsForDomain = async (domain) => {
  try {
    const response = await fetch(`http://localhost:3000/api/bugs/domain/${domain}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Inclure les cookies pour l'authentification si nécessaire
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des bugs');
    }

    const data = await response.json();
    return data; // Vérifie que `data` est un tableau contenant tous les bugs pour le domaine
  } catch (error) {
    console.error('Erreur lors de la récupération des bugs:', error);
    throw error;
  }
};



  
  
  export const createBug = async (bugData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/api/bugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bugData),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la création du bug');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du bug:', error);
      throw error;
    }
  };
  