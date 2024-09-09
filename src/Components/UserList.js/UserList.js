// components/UserList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erreur lors de la récupération des utilisateurs:', error));
  }, []);

  return (
    <div>
      <h2>Liste des Utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Rôle</th>
            <th>Licence Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <input 
                  type="date" 
                  value={new Date(user.license.endDate).toISOString().split('T')[0]} 
                  onChange={(e) => {
                    const newDate = e.target.value;
                    setUsers(users.map(u => u._id === user._id ? { ...u, license: { ...u.license, endDate: new Date(newDate) } } : u));
                  }} 
                />
              </td>
              <td>
                <Link to={`/user/${user._id}`}>Modifier</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
