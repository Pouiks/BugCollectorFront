// utils/bugApi.js
export const fetchAllBugs = async (token) => {  // Passer le token en paramètre
  try {
    const response = await fetch('http://ec2-13-53-152-16.eu-north-1.compute.amazonaws.com:3000/api/bugs/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Utiliser le token passé en paramètre
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

export const fetchBugsForDomain = async (domain, token) => {  // Passer le token en paramètre
  try {
    const response = await fetch(`http://ec2-13-53-152-16.eu-north-1.compute.amazonaws.com:3000/api/bugs/domain/${domain}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Utiliser le token passé en paramètre
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des bugs');
    }

    const data = await response.json();
    return data; // Retourner les bugs pour le domaine
  } catch (error) {
    console.error('Erreur lors de la récupération des bugs:', error);
    throw error;
  }
};

export const createBug = async (bugData, token) => {  // Passer le token en paramètre
  try {
    const response = await fetch('http://ec2-13-53-152-16.eu-north-1.compute.amazonaws.com:3000/api/bugs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Utiliser le token passé en paramètre
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

export const deleteBugById = async (domain, bugId, token) => {  // Passer le token en paramètre
  try {
    const response = await fetch(`http://ec2-13-53-152-16.eu-north-1.compute.amazonaws.com:3000/api/bugs/${domain}/bugs/${bugId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Utiliser le token passé en paramètre
      },
      credentials: 'include',
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
