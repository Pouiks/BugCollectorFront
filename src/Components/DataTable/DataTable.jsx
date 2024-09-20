import React, { useEffect, useState } from 'react';
import { fetchBugsForDomain, fetchAllBugs } from '../../utils/bugApi';
import './DataTable.css';
import { useUser } from '../../context/UserContext';
import ScreenModal from '../ScreenModal/ScreenModal';

const DataTable = () => {
  const [bugs, setBugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showModal, setShowModal] = useState(false);
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

  const handleShowModal = (screenshotUrl) => {
    const fileId = screenshotUrl.match(/\/d\/(.*?)\//)[1]; // Extraire l'ID du fichier depuis l'URL Google Drive
    const directImageUrl = `https://drive.google.com/file/d/${fileId}`; // Créer l'URL directe pour l'image
    console.log("Direct Image URL: ", directImageUrl); // Log pour vérifier l'URL
    setSelectedScreenshotUrl(directImageUrl); // Mettre à jour l'URL du screenshot avec l'URL directe
    setShowModal(true);  // Ouvrir la modal
  };
  https://drive.google.com/file/d/1uHuvrvVfM6lFmZ5_y-jH4y5Rxm1P34Fq/view
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
                  <button onClick={() => console.log("Supprimer")}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun bug trouvé.</p>
      )}
      <ScreenModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        screenshotUrl={selectedScreenshotUrl}  // URL du screenshot à afficher dans la modal
      />
    </div>
  );
};

export default DataTable;
