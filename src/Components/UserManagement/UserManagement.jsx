// src/Components/UserManagement/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser } from '../../utils/userApi';
import { useUser } from '../../context/UserContext';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', username: '', email: '', domain: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useUser();

  // Fonction pour récupérer les utilisateurs à partir de l'API
  useEffect(() => {
    if (user.user.role === "admin") {
      fetchUsers()
        .then(setUsers)
        .catch(console.error);
    }
  }, [user]);

  // Fonction pour créer un nouvel utilisateur
  const handleCreateUser = async () => {
    try {
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]); // Ajouter le nouvel utilisateur à la liste
      setNewUser({ firstName: '', lastName: '', username: '', email: '', domain: '' }); // Réinitialiser le formulaire
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
    }
  };

  // Fonction pour mettre à jour un utilisateur existant
  const handleUpdateUser = async (userId) => {
    try {
      const updatedUser = await updateUser(userId, selectedUser);
      setUsers(users.map(user => (user._id === userId ? updatedUser : user))); // Mettre à jour la liste des utilisateurs
      setSelectedUser(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    }
  };

  // Fonction de recherche d'utilisateur
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  // Filtrer les utilisateurs
  const filteredUsers = users.filter((user) =>
    (`${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm))
  );

  return (
    <div>
      <h2>Gestion des utilisateurs</h2>

      {/* Formulaire de création d'un nouvel utilisateur */}
      <div className="user-form">
        <input
          type="text"
          placeholder="Prénom"
          value={newUser.firstName}
          onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Nom"
          value={newUser.lastName}
          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Surnom"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Domaine"
          value={newUser.domain}
          onChange={(e) => setNewUser({ ...newUser, domain: e.target.value })}
          required
        />
        <button onClick={handleCreateUser}>Créer l'utilisateur</button>
      </div>

      {/* Recherche */}
      <input
        type="text"
        placeholder="Rechercher par nom ou email..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      {/* Tableau des utilisateurs */}
      {filteredUsers.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>Nom complet</th>
              <th>Email</th>
              <th>Domaine</th>
              <th>Date de création</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id || index}>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.domain}</td>
                <td>{user.createdAt ? user.createdAt.substring(0, 10) : ''}</td> {/* Date de création */}
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

export default UserManagement;
