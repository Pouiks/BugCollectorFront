import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser } from '../../utils/userApi'; // Assurez-vous que ces fonctions sont importées correctement
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: '', password: '', domain: '' });
  const [selectedUser, setSelectedUser] = useState(null); // Pour la mise à jour des utilisateurs existants

  useEffect(() => {
    fetchUsers().then(setUsers).catch(console.error);
  }, []);

  const handleCreateUser = async () => {
    try {
      const user = await createUser(newUser);
      setUsers([...users, user]); // Ajouter le nouvel utilisateur à la liste
      setNewUser({ username: '', email: '', role: '', password: '', domain: '' }); // Réinitialiser le formulaire
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
    }
  };

  const handleUpdateUser = async (userId) => {
    try {
      const updatedUser = await updateUser(userId, selectedUser);
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
          placeholder="Nom d'utilisateur"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        {/* Autres champs pour l'email, rôle, mot de passe, etc. */}
        <button onClick={handleCreateUser}>Créer l'utilisateur</button>
      </div>

      {/* Liste des utilisateurs */}
      <div className="user-list">
        <h3>Liste des utilisateurs</h3>
        {users.map(user => (
          <div key={user._id}>
            <p>{user.username} ({user.email})</p>
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
