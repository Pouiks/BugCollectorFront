import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginLayout from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await fetchUserProfile(); // Appel à l'API pour récupérer le profil utilisateur
          if (userData && userData.username) {
            loginUser(userData, token); // Mettre à jour l'état utilisateur et token
          }
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'utilisateur connecté :', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn(); // Vérifiez une seule fois si l'utilisateur est logué
  }, [loginUser]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginLayout />}
      />
      <Route
        path="/dashboard/*"
        element={user ? <Dashboard onLogout={logoutUser} /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default App;
