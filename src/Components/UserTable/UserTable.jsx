import React, { useState } from 'react';
import './UserTable.css';

const UserTable = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSortByDate = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const filteredUsers = sortedUsers.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
  });

  return (
    <div className="data-table">
      <h2>Table des Utilisateurs</h2>

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
