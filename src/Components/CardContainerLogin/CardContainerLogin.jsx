import { useState } from 'react';
import './CardContainerLogin.css';
import Users from '../../data/users';

const CardContainerLogin = ({ handleLoginOrSignup, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const verifyLogin = () => {
    const user = Users.find((user) => user.username === username && user.password === password);
    if (user) {
      onLogin(user); // Pass the user data to App component
    } else {
      setError('Invalid username or password!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form>
          <div className="input-container">
            <label htmlFor="username">Username 👤</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              required
              onChange={handleUsername}
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
              onChange={handlePassword}
              value={password}
            />
          </div>
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            type="submit"
            className="login-button"
            onClick={(e) => {
              e.preventDefault();
              verifyLogin();
            }}
          >
            LOGIN
          </button>
          <div className="forgot-password">Forgot your password?</div>
        </form>
        <div className="signup-link">
          New here? <a href="#" onClick={handleLoginOrSignup}>Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default CardContainerLogin;
