import React, { useEffect, useState, useRef } from 'react';
import { fetchBugsForDomain, fetchAllBugs, deleteBugById } from '../../utils/bugApi';
import './DataTable.css';
import { useUser } from '../../context/UserContext';

const DataTable = () => {
  const [bugs, setBugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortBy, setSortBy] = useState('date');
  const [confirmDelete, setConfirmDelete] = useState({});
  const { user } = useUser();  // Récupérer l'utilisateur avec son token
  const token = user.user.token;
  
  const bugsRef = useRef([]);

  // Fonction pour charger les bugs
  const loadBugs = async () => {
    if (user && user.user) {
      try {
        let fetchedBugs = [];
        const userDomain = user.user.domain || null;
        if (user.user.role === 'admin') {
          fetchedBugs = await fetchAllBugs(token);  // Passer le token ici
        } else if (userDomain) {
          fetchedBugs = await fetchBugsForDomain(userDomain, token);  // Passer le token ici
        }

        if (JSON.stringify(fetchedBugs) !== JSON.stringify(bugsRef.current)) {
          bugsRef.current = fetchedBugs;
          setBugs(fetchedBugs);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des bugs:', err);
      }
    }
  };

  useEffect(() => {
    loadBugs(); 
  }, [user]);

  // Fonction pour gérer la suppression de bug avec confirmation en 2 clics
  const handleDeleteBug = async (domainName, bugId) => {
    if (!domainName) {
      console.error('Le domaine est introuvable.');
      return;
    }

    if (!confirmDelete[bugId]) {
      // Premier clic pour confirmer la suppression
      setConfirmDelete((prev) => ({ ...prev, [bugId]: true })); 

      // Réinitialisation de l'état de confirmation après 4 secondes
      setTimeout(() => {
        setConfirmDelete((prev) => ({ ...prev, [bugId]: false }));
      }, 4000);

      return;
    }

    try {
      await deleteBugById(domainName, bugId, token); // Suppression avec token
      await loadBugs(); // Recharger les bugs après suppression
      console.log('Bug supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du bug :', error);
    }

    setConfirmDelete((prev) => ({ ...prev, [bugId]: false })); // Réinitialiser la confirmation après suppression
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSortByDate = () => {
    const sortedBugs = [...bugs].sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
    setBugs(sortedBugs);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortBy('date');
  };

  const handleSortByImpact = () => {
    const sortedBugs = [...bugs].sort((a, b) => {
      const impactOrder = ['Peu gênant', 'Perturbant', 'Grave'];
      if (sortOrder === 'asc') {
        return impactOrder.indexOf(a.impact) - impactOrder.indexOf(b.impact);
      } else {
        return impactOrder.indexOf(b.impact) - impactOrder.indexOf(a.impact);
      }
    });
    setBugs(sortedBugs);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortBy('impact');
  };

  const filteredBugs = bugs.filter((bug) => {
    const domain = new URL(bug.url).hostname.toLowerCase();
    return domain.includes(searchTerm);
  });

  return (
    <div className="data-table">
      <h2>Table des Bugs</h2>
      <input
        type="text"
        placeholder="Rechercher par domaine ou sous-domaine..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />
      {filteredBugs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Description</th>
              <th onClick={handleSortByImpact} style={{ cursor: 'pointer' }}>
                Impact {sortBy === 'impact' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th onClick={handleSortByDate} style={{ cursor: 'pointer' }}>
                Date {sortBy === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBugs.map((bug, index) => (
              <tr key={bug._id || index}>
                <td>{bug.url}</td>
                <td>{bug.description}</td>
                <td>{bug.impact}</td>
                <td>{bug.date.substring(0, 10)}</td>
                <td>
                  <a href={bug.screenshotUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Voir l'image
                  </a>
                  {confirmDelete[bug._id] ? (
                    <button className="btn btn-danger" onClick={() => handleDeleteBug(bug.domainName, bug._id)}>
                      Confirmer Suppression
                    </button>
                  ) : (
                    <button className="btn btn-warning" onClick={() => handleDeleteBug(bug.domainName, bug._id)}>
                      Supprimer
                    </button>
                  )}
                </td>
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
