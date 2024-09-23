import React, { useEffect, useState } from 'react';
import { fetchBugsForDomain, fetchAllBugs, deleteBugById } from '../../utils/bugApi';
import './DataTable.css';
import { useUser } from '../../context/UserContext';

const DataTable = () => {
  const [bugs, setBugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedScreenshotUrl, setSelectedScreenshotUrl] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user && user.user) {
      if (user.user.role === 'admin') {
        fetchAllBugs()
          .then((data) => setBugs(data))
          .catch((err) => console.error('Erreur lors de la récupération de tous les bugs:', err));
      } else {
        const userDomain = user.user.domain;
        if (!userDomain) return;
        fetchBugs(userDomain);
      }
    }
  }, [user]);

  const fetchBugs = async (domain) => {
    try {
      const fetchedBugs = await fetchBugsForDomain(domain);
      setBugs(fetchedBugs);
    } catch (err) {
      console.error('Erreur lors de la récupération des bugs:', err);
    }
  };
  const handleDeleteBug = async (domainName, bugId) => {
    if (!domainName) {
      console.error('Le domaine est introuvable.');
      return;
    }
  
    const confirmation = window.confirm('Es-tu sûr de vouloir supprimer ce bug ?');
    if (!confirmation) return; // Annule si l'utilisateur ne confirme pas
  
    try {
      await deleteBugById(domainName, bugId); // Appel à la fonction API pour supprimer le bug
      setBugs((prevBugs) => prevBugs.filter((bug) => bug._id !== bugId)); // Mise à jour locale de la liste des bugs
      console.log('Bug supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du bug :', error);
    }
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

  useEffect(() => {
    console.log("Updated Screenshot URL: ", selectedScreenshotUrl); // Vérification de l'URL mise à jour
  }, [selectedScreenshotUrl]);

  const filteredBugs = bugs.filter((bug) => {
    const domain = new URL(bug.url).hostname.toLowerCase();
    return domain.includes(searchTerm);
  });

  return (
    <div className="data-table">
      <h2>Table des Bugs</h2>
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
                <td>
                  <a href={bug.screenshotUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Voir l'image</a>
                  {/* On utilise maintenant le domainName directement récupéré avec les bugs */}
                  <button onClick={() => handleDeleteBug(bug.domainName, bug._id)}>Supprimer</button>
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
