import React, { createContext, useState, useContext } from 'react';

// Créer le contexte utilisateur
const UserContext = createContext();

// Créer un hook personnalisé pour accéder au contexte utilisateur
export const useUser = () => useContext(UserContext);

// Fournisseur de Contexte
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
