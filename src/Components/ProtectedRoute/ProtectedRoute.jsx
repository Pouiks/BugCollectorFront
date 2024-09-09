// src/Components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// Composant de route protégée
const ProtectedRoute = ({ element: Element, isAuthenticated, userRole, allowedRoles, ...rest }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Element {...rest} />;
};

export default ProtectedRoute;
