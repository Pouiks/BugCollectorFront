// Components/DataTable/DataTable.jsx
import React, { useEffect, useState } from 'react';
import { fetchBugsForDomain, createBug } from '../../utils/bugApi';
import './DataTable.css'

const DataTable = () => {
  const [bugs, setBugs] = useState([]);
  const [newBug, setNewBug] = useState({ url: '', description: '', impact: '' });
  const userDomain = localStorage.getItem('userDomain'); // Récupérer le domaine utilisateur du stockage local

  useEffect(() => {
    if (userDomain) {
      fetchBugs(userDomain);  // Utiliser le domaine pour récupérer les bugs
    } else {
      console.error("Erreur : Domaine utilisateur introuvable.");
    }
  }, [userDomain]);

  const fetchBugs = async (domain) => {
    try {
      const fetchedBugs = await fetchBugsForDomain(domain);  // Passe le domaine
      setBugs(fetchedBugs);
    } catch (err) {
      console.error('Erreur lors de la récupération des bugs:', err);
    }
  };

  const handleCreateBug = async () => {
    try {
      await createBug(newBug);
      fetchBugs(userDomain);
    } catch (err) {
      console.error('Erreur lors de la création du bug:', err);
    }
  };

  return (
    <div className="data-table">
      <h2>Table des Bugs</h2>
      {userDomain ? (
        <>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Description</th>
                <th>Impact</th>
              </tr>
            </thead>
            <tbody>
              {bugs.map((bug, index) => (
                <tr key={bug._id || index}> {/* Utiliser `index` comme clé de secours */}
                  <td>{bug.url}</td>
                  <td>{bug.description}</td>
                  <td>{bug.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Erreur : Domaine utilisateur introuvable.</p>
      )}

      {/* <input type="text" placeholder="URL" value={newBug.url} onChange={(e) => setNewBug({ ...newBug, url: e.target.value })} />
      <input type="text" placeholder="Description" value={newBug.description} onChange={(e) => setNewBug({ ...newBug, description: e.target.value })} />
      <input type="text" placeholder="Impact" value={newBug.impact} onChange={(e) => setNewBug({ ...newBug, impact: e.target.value })} />
      <button onClick={handleCreateBug}>Ajouter Bug</button> */}
    </div>
  );
};

export default DataTable;
