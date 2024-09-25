// utils/bugApi.js
// utils/bugApi.js
// fetchAllBugs.js
export const fetchAllBugs = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/bugs/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Indispensable pour inclure les cookies
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
  const token = localStorage.getItem('token'); // Récupère le token depuis le localStorage

  try {
    const response = await fetch(`http://localhost:3000/api/bugs/domain/${domain}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization

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
  
  export const deleteBugById = async (domain, bugId) => {
    console.log("Passage avant delete: ",domain, bugId)
    try {
      const token = localStorage.getItem('token'); // Récupère le token depuis le localStorage

      const response = await fetch(`http://localhost:3000/api/bugs/${domain}/bugs/${bugId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization

          
        },
        credentials: 'include', // Inclure les cookies si nécessaire
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du bug');
      }
  
      const data = await response.json();
      return data; // Retourner la réponse pour confirmer la suppression
    } catch (error) {
      console.error('Erreur lors de la suppression du bug:', error);
      throw error;
    }
  };
  