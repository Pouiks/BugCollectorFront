import React, { useState } from 'react';
import { handleLogin } from '../../utils/authApi';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await handleLogin(email, password);
      onLogin(userData);
    } catch (err) {
      setError('Erreur lors de la connexion. Veuillez vérifier vos informations.');
    }
  };

  const showPassword = () => {
    const passwordInput = document.getElementById("passwordInput");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

  return (
    <div className='Card_Container'>
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Se connecter</h2>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="">Mot de passe * : </label>
        <input
        id="passwordInput"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="showPasswordContainer">
        <input type='checkbox' onClick={showPassword}/><label> Show password</label>
        </div>
        <button className="loginFormSubmit" type="submit">Se connecter</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
