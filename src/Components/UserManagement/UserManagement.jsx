// src/Components/UserManagement/UserManagement.jsx
import React, { useEffect, useState } from 'react';
import './UserManagement.css'; // Assurez-vous d'avoir les styles nécessaires

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Pour gérer l'utilisateur sélectionné
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Récupérer les utilisateurs de l'API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour mettre à jour l'utilisateur
  const updateUser = async (updatedUser) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${updatedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
      }
      fetchUsers(); // Mettre à jour la liste des utilisateurs
      setSelectedUser(null); // Réinitialiser l'utilisateur sélectionné
    } catch (err) {
      setError(err.message);
    }
  };

  // Fonction pour gérer la sélection d'un utilisateur dans le tableau
  const handleUserClick = (user) => {
    setSelectedUser(user); // Sélectionner l'utilisateur
  };

  // Gestion de l'affichage de la page utilisateur avec les champs modifiables
  const renderUserDetail = () => {
    if (!selectedUser) return null;

    return (
      <div className="user-detail">
        <h3>Modifier l'utilisateur</h3>
        <input
          type="text"
          value={selectedUser.email}
          onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
        />
        <input
          type="text"
          value={selectedUser.username}
          onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
        />
        <select
          value={selectedUser.role}
          onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="date"
          value={new Date(selectedUser.license.endDate).toISOString().substring(0, 10)} // Affichage de la date pour modification
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              license: { ...selectedUser.license, endDate: e.target.value },
            })
          }
        />
        <button onClick={() => updateUser(selectedUser)}>Enregistrer les modifications</button>
      </div>
    );
  };

  return (
    <div className="user-management-container">
      <h2>Gestion des Utilisateurs</h2>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Chargement des utilisateurs...</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Nom d'utilisateur</th>
              <th>Rôle</th>
              <th>Date de fin de validité de la licence</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} onClick={() => handleUserClick(user)}>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{new Date(user.license.endDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {renderUserDetail()}
    </div>
  );
};

export default UserManagement;
