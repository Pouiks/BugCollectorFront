// src/Components/UserTable/UserTable.jsx
import React, { useState } from 'react';
import './UserTable.css'; // Utiliser le même CSS que DataTable

const UserTable = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState(''); // État pour stocker le terme de recherche
  const [sortOrder, setSortOrder] = useState('desc'); // État pour l'ordre de tri (asc ou desc)

  // Mettre à jour le terme de recherche
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Trier les utilisateurs par date de création
  const handleSortByDate = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    return sortedUsers;
  };

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm) || user.email.toLowerCase().includes(searchTerm)
    );
  });

  const usersToDisplay = handleSortByDate(); // Trier les utilisateurs avant de les afficher

  return (
    <div className="data-table">
      <h2>Table des Utilisateurs</h2>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher par nom ou email..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      {filteredUsers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nom d'utilisateur</th>
              <th>Email</th>
              <th>Domaine</th>
              <th onClick={handleSortByDate} style={{ cursor: 'pointer' }}>
                Date de création {sortOrder === 'asc' ? '↑' : '↓'}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id || index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.domain}</td>
                <td>{user.createdAt ? user.createdAt.substring(0, 10) : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun utilisateur trouvé.</p>
      )}
    </div>
  );
};

export default UserTable;
