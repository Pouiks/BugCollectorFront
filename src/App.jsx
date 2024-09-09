// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginLayout from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import UserManagement from './Components/UserManagement/UserManagement';  // Composant de gestion des utilisateurs
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';  // Import du composant de route protégée

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');  // Nouvel état pour le rôle de l'utilisateur

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setUsername(user.username);
    setUserRole(user.role);  // Définir le rôle de l'utilisateur après la connexion
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setUserRole('');
  };

  return (
    <Router>
      <Routes>
        {/* Route de connexion */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginLayout onLogin={handleLogin} />
            )
          }
        />

        {/* Route du tableau de bord */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard username={username} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Route protégée pour la gestion des utilisateurs */}
        <Route
          path="/users"
          element={
            <ProtectedRoute 
              element={UserManagement}  // Le composant à afficher
              isAuthenticated={isAuthenticated}  // Vérifie l'authentification
              userRole={userRole}  // Rôle de l'utilisateur
              allowedRoles={['admin']}  // Seuls les 'admin' peuvent accéder
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
