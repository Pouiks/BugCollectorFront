import React, { useEffect, useState, useRef } from 'react';
import { fetchBugsForDomain, fetchAllBugs, deleteBugById } from '../../utils/bugApi';
import './DataTable.css';
import { useUser } from '../../context/UserContext';

const DataTable = () => {
  const [bugs, setBugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [confirmDelete, setConfirmDelete] = useState({}); // Gérer l'état de confirmation
  const { user } = useUser();
  
  // Variable pour stocker les bugs temporairement
  const bugsRef = useRef([]);

  // Charger les bugs au chargement initial et après suppression
  const loadBugs = async () => {
    if (user && user.user) {
      try {
        let fetchedBugs = [];
        const userDomain = user.user.domain || null;
        if (user.user.role === 'admin') {
          fetchedBugs = await fetchAllBugs();
        } else if (userDomain) {
          fetchedBugs = await fetchBugsForDomain(userDomain);
        }
        
        // Comparer avec les bugs actuels et mettre à jour si différent
        if (JSON.stringify(fetchedBugs) !== JSON.stringify(bugsRef.current)) {
          bugsRef.current = fetchedBugs;
          setBugs(fetchedBugs);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des bugs:', err);
      }
    }
  };

  // Appel au chargement des bugs au démarrage
  useEffect(() => {
    loadBugs(); // Charger les bugs
  }, [user]); // Ne déclenche que si le `user` change

  // Gestion de la suppression des bugs
  const handleDeleteBug = async (domainName, bugId) => {
    if (!domainName) {
      console.error('Le domaine est introuvable.');
      return;
    }

    if (!confirmDelete[bugId]) {
      setConfirmDelete((prev) => ({ ...prev, [bugId]: true })); // Premier clic : on active la confirmation
      return;
    }

    try {
      await deleteBugById(domainName, bugId); // Suppression du bug
      await loadBugs(); // Recharger les bugs après suppression
      console.log('Bug supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du bug :', error);
    }

    setConfirmDelete((prev) => ({ ...prev, [bugId]: false })); // Réinitialiser la confirmation après suppression
  };

  const handleCancelDelete = (bugId) => {
    setConfirmDelete((prev) => ({ ...prev, [bugId]: false })); // Annuler la suppression
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
              <th>Impact</th>
              <th onClick={handleSortByDate} style={{ cursor: 'pointer' }}>
                Date {sortOrder === 'asc' ? '↑' : '↓'}
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
                <td style={{ display: 'flex', minWidth: '100px' }}>
                  <a href={bug.screenshotUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Voir l'image
                  </a>
                  {confirmDelete[bug._id] ? (
                    <>
                      <button className="btn btn-danger" onClick={() => handleDeleteBug(bug.domainName, bug._id)}>
                        Confirmer
                      </button>
                      <button className="btn btn-secondary" onClick={() => handleCancelDelete(bug._id)}>
                        Annuler
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-danger" onClick={() => handleDeleteBug(bug.domainName, bug._id)}>
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
