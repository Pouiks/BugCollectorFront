// src/Components/Login/Login.jsx
import React, { useState } from 'react';
import './Login.css'; // Assurez-vous que ce fichier contient le design que vous souhaitez garder

const LoginLayout = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Indicateur de chargement

  // Fonction pour gérer la soumission du formulaire de connexion
  const handleLogin = async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    setLoading(true);   // Activer l'indicateur de chargement
    setError('');       // Réinitialiser les erreurs

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', { // Remplace par l'URL de ton API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Envoyer l'email et le mot de passe à l'API
      });

      if (!response.ok) {
        throw new Error('Échec de la connexion, veuillez vérifier vos identifiants.');
      }

      const data = await response.json(); // Récupérer les données de la réponse
      console.log('Réponse de l\'API:', data);

      // Utilisateur connecté avec succès
      onLogin(data.user);  // Utiliser les données de l'utilisateur (nom d'utilisateur, rôle, etc.)
    } catch (err) {
      console.error('Erreur lors de la connexion:', err);
      setError(err.message); // Afficher le message d'erreur
    } finally {
      setLoading(false); // Désactiver l'indicateur de chargement
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
};

export default LoginLayout;
