// src/Components/UserManagement/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser } from '../../utils/userApi';
import UserTable from '../UserTable/UserTable'; // Utiliser UserTable
import { useUser } from '../../context/UserContext';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', username: '', email: '', domain: '' });
  const { user } = useUser();

  // Charger les utilisateurs
  useEffect(() => {
    console.log("User state in useEffect:", user);
    if (user && user.user && user.user.role === "admin") {
      console.log("Admin detected, fetching users...");
      fetchUsers()
        .then((data) => {
          console.log("Fetched users:", data);
          setUsers(data); // Problème ici si `data` est `undefined`
        })
        .catch((err) => {
          console.error("Erreur dans useEffect:", err);
        });
    }
  }, [user]);

  // Créer un nouvel utilisateur
  const handleCreateUser = async () => {
    try {
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]); // Ajouter le nouvel utilisateur à la liste
      setNewUser({ firstName: '', lastName: '', username: '', email: '', domain: '' }); // Réinitialiser le formulaire
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
    }
  };

  return (
    <div>
      <h2>Gestion des utilisateurs</h2>

      {/* Formulaire de création */}
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

      {/* Table des utilisateurs */}
      <UserTable users={users} /> {/* Passer les utilisateurs à UserTable */}
    </div>
  );
};

export default UserManagement;
