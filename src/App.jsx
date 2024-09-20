// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginLayout from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import { UserContextProvider, useUser } from './context/UserContext';
import { fetchUserProfile, handleLogout } from './utils/authApi';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserContextProvider>
  );
};

const AppRoutes = () => {
  const { user, loginUser, logoutUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserProfile();
        if (userData && userData.username) {
          loginUser({ user: userData });
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'utilisateur connecté :', error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    if (!initialized) {
      checkUserLoggedIn();
    }
  }, [loginUser, initialized]);

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      logoutUser();
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginLayout onLogin={loginUser} />
          )
        }
      />
      {/* Route pour le dashboard, toujours accessible si connecté */}
      <Route
        path="/dashboard/*"
        element={
          user ? (
            <Dashboard onLogout={handleLogoutClick} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
};

export default App;
