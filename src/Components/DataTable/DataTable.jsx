// Components/DataTable/DataTable.jsx
import React, { useEffect, useState } from 'react';
import { fetchBugsForDomain, fetchAllBugs } from '../../utils/bugApi';
import './DataTable.css';
import { useUser } from '../../context/UserContext';

const DataTable = () => {
  const [bugs, setBugs] = useState([]); // État pour stocker les bugs récupérés
  const [searchTerm, setSearchTerm] = useState(''); // État pour stocker le terme de recherche
  const { user } = useUser(); // Obtenir l'utilisateur connecté depuis le contexte

  useEffect(() => {
    if (user && user.user) { // Vérifie que `user` et `user.user` existent
      console.log("Utilisateur connecté:", user.user);  // Log de l'utilisateur connecté

      if (user.user.role === 'admin') { // Corrige l'accès au rôle d'utilisateur
        // Si l'utilisateur est admin, récupérer tous les bugs
        fetchAllBugs()
          .then((data) => {
            console.log("Bugs récupérés pour admin:", data);  // Log des bugs récupérés pour admin
            setBugs(data);
          })
          .catch((err) => console.error('Erreur lors de la récupération de tous les bugs:', err));
      } else {
        // Pour les utilisateurs non-admin, récupérer les bugs pour le domaine de l'utilisateur
        const userDomain = user.user.domain; // Corrige l'accès au domaine de l'utilisateur
        if (!userDomain) {
          console.error("Erreur : Domaine utilisateur introuvable."); // Log d'erreur si le domaine est introuvable
          return;
        }
        console.log("Domaine de l'utilisateur:", userDomain); // Log du domaine de l'utilisateur
        fetchBugs(userDomain);
      }
    } else {
      console.error("Erreur : Utilisateur non connecté ou données utilisateur manquantes.");
    }
  }, [user]);

  const fetchBugs = async (domain) => {
    try {
      console.log("Récupération des bugs pour le domaine:", domain); // Log avant la récupération
      const fetchedBugs = await fetchBugsForDomain(domain); // Récupérer les bugs pour le domaine
      console.log("Bugs récupérés pour domaine:", fetchedBugs);  // Log des bugs récupérés pour le domaine
      setBugs(fetchedBugs); // Assigner les bugs récupérés à l'état
    } catch (err) {
      console.error('Erreur lors de la récupération des bugs:', err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Mettre à jour le terme de recherche en minuscules pour une recherche insensible à la casse
  };

  // Filtrer les bugs en fonction du terme de recherche et de la partie du domaine, y compris les sous-domaines
  const filteredBugs = bugs.filter((bug) => {
    const domain = new URL(bug.url).hostname.toLowerCase(); // Extraire le domaine complet (inclut sous-domaines)
    return domain.includes(searchTerm); // Vérifier si le domaine contient le terme de recherche
  });

  return (
    <div className="data-table">
      <h2>Table des Bugs</h2>

      {/* Barre de recherche pour les admins */}
      {user && user.user.role === 'admin' && (
        <input
          type="text"
          placeholder="Rechercher par domaine ou sous-domaine..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
        />
      )}

      {filteredBugs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Description</th>
              <th>Impact</th>
            </tr>
          </thead>
          <tbody>
            {filteredBugs.map((bug, index) => (
              <tr key={bug._id || index}>
                <td>{bug.url}</td>
                <td>{bug.description}</td>
                <td>{bug.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun bug trouvé.</p>
      )}
    </div>
  );
};

export default DataTable;
