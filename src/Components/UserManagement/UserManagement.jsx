import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser } from '../../utils/userApi'; // Assurez-vous que ces fonctions sont importées correctement
import { useUser } from '../../context/UserContext';

import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]); // État pour stocker les utilisateurs
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', username: '', email: '', domain: '' }); // État pour le nouvel utilisateur
  const [selectedUser, setSelectedUser] = useState(null); // État pour l'utilisateur sélectionné
  const { user } = useUser();

  // Fonction pour récupérer les utilisateurs à partir de l'API
  useEffect(() => {
    {
      user.user.role === "admin" ?
      fetchUsers().then(setUsers).catch(console.error) : null;
    }
  }, []);

  // Fonction pour créer un nouvel utilisateur
  const handleCreateUser = async () => {
    try {
      console.log(newUser)
      const user = await createUser(newUser); // Créer un nouvel utilisateur via l'API
      setUsers([...users, user]); // Ajouter le nouvel utilisateur à la liste
      setNewUser({ firstName: '', lastName: '', username: '', email: '', domain: '' }); // Réinitialiser le formulaire
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
    }
  };

  // Fonction pour mettre à jour un utilisateur existant
  const handleUpdateUser = async (userId) => {
    try {
      const updatedUser = await updateUser(userId, selectedUser); // Mettre à jour l'utilisateur via l'API
      setUsers(users.map(user => (user._id === userId ? updatedUser : user))); // Mettre à jour la liste des utilisateurs
      setSelectedUser(null); // Réinitialiser l'utilisateur sélectionné
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    }
  };

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

      {/* Liste des utilisateurs */}
      <div className="user-list">
        <h3>Liste des utilisateurs</h3>
        {users.map(user => (
          <div key={user._id}>
            <p>{user.firstName} {user.lastName} ({user.username} - {user.email})</p>
            <button onClick={() => setSelectedUser(user)}>Modifier</button>
            {/* Ajouter plus de logique pour la gestion de l'édition */}
          </div>
        ))}
      </div>

      {/* Affichage des détails de l'utilisateur sélectionné */}
      {selectedUser && (
        <div className="edit-user">
          <h3>Modifier l'utilisateur</h3>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={selectedUser.username}
            onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
          />
          {/* Autres champs pour l'édition */}
          <button onClick={() => handleUpdateUser(selectedUser._id)}>Mettre à jour</button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
