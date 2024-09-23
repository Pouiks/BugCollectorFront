import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Utiliser useNavigate pour la redirection
import { updatePassword } from '../../utils/userApi';

const SetupPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { token } = useParams(); // Récupérer le token depuis l'URL
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      await updatePassword(token, password); // Appel à l'API pour mettre à jour le mot de passe
      setSuccess(true);
      setError('');
      
      // Redirection vers la page de login après succès
      setTimeout(() => {
        navigate('/'); // Rediriger vers la page de login après 2 secondes
      }, 2000);
    } catch (err) {
      setError('Erreur lors de la mise à jour du mot de passe.');
    }
  };

  return (
    <div>
      <h2>Configurer votre mot de passe</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success ? (
        <p>Mot de passe mis à jour avec succès ! Vous serez redirigé vers la page de login.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Valider</button>
        </form>
      )}
    </div>
  );
};

export default SetupPassword;
