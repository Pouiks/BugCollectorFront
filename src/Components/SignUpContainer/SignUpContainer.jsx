import { useState } from 'react';
import '../CardContainerLogin/CardContainerLogin';
import Users from '../../data/users';
import './SignUpContainer.css'

const SignUpContainer = ({ handleLoginOrSignup }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleVerifyPasswordChange = (e) => {
    setVerifyPassword(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Vérifier si l'utilisateur existe déjà
    const userExists = Users.some(
      (user) => user.username === username || user.email === email
    );

    if (userExists) {
      setError('Username or Email already exists!');
      return;
    }

    // Ajouter le nouvel utilisateur
    Users.push({
      email,
      username,
      password,
    });

    alert('Account created successfully!');
    setEmail('');
    setUsername('');
    setPassword('');
    setVerifyPassword('');
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign Up</h2>
        <form>
          <div className="input-container">
            <label htmlFor="email">Email 📧</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              onChange={handleEmailChange}
              value={email}
            />
          </div>
          <div className="input-container">
            <label htmlFor="username">Username 👤</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              required
              onChange={handleUsernameChange}
              value={username}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password 🔒</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <div className="input-container">
            <label htmlFor="verify-password">Verify Password 🔒</label>
            <input
              type="password"
              id="verify-password"
              placeholder="Verify Password"
              required
              onChange={handleVerifyPasswordChange}
              value={verifyPassword}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button" onClick={handleSignUp}>
            SIGN UP
          </button>
        </form>
        <div className="signup-link">
          Already have an account? <a href="#" onClick={handleLoginOrSignup}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpContainer;
