// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginLayout from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import UserManagement from './Components/UserManagement/UserManagement';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { UserContextProvider, useUser } from './context/UserContext';
import { fetchUserProfile, handleLogout } from './utils/authApi';

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
  const [loading, setLoading] = useState(true); // État de chargement initial
  const [initialized, setInitialized] = useState(false); // Nouvel état pour suivre l'initialisation

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserProfile(); // Récupérer les informations de l'utilisateur
        if (userData && userData.username) {
          loginUser({ user: userData }); // Charger les données utilisateur dans le contexte
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'utilisateur connecté :', error);
        // Ne pas déconnecter immédiatement pour éviter la boucle
      } finally {
        setLoading(false);
        setInitialized(true); // Initialisation terminée
      }
    };

    if (!initialized) { // N'exécuter qu'une seule fois après le montage
      checkUserLoggedIn();
    }
  }, [loginUser, initialized]); // Dépendances mises à jour

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

      <Route
        path="/dashboard"
        element={
          user ? (
            <Dashboard onLogout={handleLogoutClick} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute
            element={UserManagement}
            isAuthenticated={!!user}
            userRole={user?.role}
            allowedRoles={['admin']}
          />
        }
      />
    </Routes>
  );
};

export default App;
