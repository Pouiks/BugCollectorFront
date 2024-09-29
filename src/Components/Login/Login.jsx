// src/Components/Login/Login.jsx
import React, { useState } from 'react';
import { handleLogin } from '../../utils/authApi';
import { useUser } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useUser(); // Utiliser le hook pour accéder à la fonction de connexion

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await handleLogin(email, password); // Authentification avec l'API
      localStorage.setItem('token', userData.token); // Stocker le token dans le localStorage
      loginUser(userData); // Mettre à jour le contexte avec les données de l'utilisateur
    } catch (err) {
      setError('Erreur lors de la connexion. Veuillez vérifier vos informations.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Se connecter</h2>
        {error && <p>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
