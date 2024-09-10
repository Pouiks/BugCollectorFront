// utils/bugApi.js

// utils/bugApi.js
export const fetchBugsForDomain = async (domain) => {
    console.log("domain front", domain)
    try {
      const token = localStorage.getItem('token'); // Assurez-vous d'inclure le token pour l'authentification
      const response = await fetch(`http://localhost:3000/api/bugs/domain/${domain}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Inclure le token d'authentification
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des bugs');
      }
  
      const data = await response.json();
      return data;
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
  