import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser } from '../../utils/userApi';
import UserTable from '../UserTable/UserTable'; 
import { useUser } from '../../context/UserContext';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', domain: '' });
  const { user } = useUser();

  // Charger les utilisateurs si l'utilisateur connecté est un admin
  useEffect(() => {
    if (user && user.user && user.user.role === "admin") {
      fetchUsers()
        .then((data) => {
          if (data) {
            setUsers(data);
          }
        })
        .catch((err) => {
          console.error("Erreur dans useEffect:", err);
        });
    }
  }, [user]); // Déclencher uniquement si `user` change

  // Créer un nouvel utilisateur
  const handleCreateUser = async () => {
    try {
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]); // Ajouter l'utilisateur créé à la liste
      setNewUser({ email: '', domain: '' }); // Réinitialiser les champs du formulaire
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Un utilisateur avec cet email existe déjà.");
      } else {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
      }
    }
  };

  return (
    <div>
      <h2>Gestion des utilisateurs</h2>

      {/* Formulaire de création avec uniquement l'e-mail et le domaine */}
      <div className="user-form">
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

      {/* Tableau des utilisateurs */}
      <UserTable users={users} />
    </div>
  );
};

export default UserManagement;
