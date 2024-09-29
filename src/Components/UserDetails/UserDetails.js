// components/UserDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://ec2-13-53-152-16.eu-north-1.compute.amazonaws.com:3000/api/users/${id}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Erreur lors de la récupération de l\'utilisateur:', error));
  }, [id]);

  const handleSubmit = () => {
    fetch(`http://ec2-13-53-152-16.eu-north-1.compute.amazonaws.com:3000/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Utilisateur mis à jour:', data);
      navigate('/users'); // Redirection vers la liste des utilisateurs
    })
    .catch(error => console.error('Erreur lors de la mise à jour de l\'utilisateur:', error));
  };

  if (!user) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Détail de l'utilisateur</h2>
      <label>
        Username: 
        <input type="text" value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} />
      </label>
      <label>
        Email: 
        <input type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
      </label>
      <label>
        Rôle: 
        <select value={user.role} onChange={e => setUser({ ...user, role: e.target.value })}>
        <option value="user">Utilisateur</option>
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <label>
        Date d'expiration de la licence: 
        <input 
          type="date" 
          value={new Date(user.license.endDate).toISOString().split('T')[0]} 
          onChange={e => setUser({ 
            ...user, 
            license: { 
              ...user.license, 
              endDate: new Date(e.target.value) 
            } 
          })} 
        />
      </label>
      <button onClick={handleSubmit}>Enregistrer les modifications</button>
    </div>
  );
};

export default UserDetail;
