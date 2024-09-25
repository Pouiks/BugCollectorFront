import React, { createContext, useState, useContext } from 'react';

// Créer le contexte utilisateur
const UserContext = createContext();

// Créer un hook personnalisé pour accéder au contexte utilisateur
export const useUser = () => useContext(UserContext);

// Fournisseur de Contexte
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);  // Stocker le token ici

  const loginUser = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);  // Stocker le token lors du login
    localStorage.setItem('token', authToken);  // Optionnel : stocker dans localStorage pour persistance
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');  // Nettoyer le localStorage lors du logout
  };

  return (
    <UserContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
