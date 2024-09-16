// src/Components/Dashboard/Dashboard.jsx
import React from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import DataTable from '../DataTable/DataTable.jsx';
import { useUser } from '../../context/UserContext'; // Importer le hook pour accéder au contexte utilisateur
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const { user } = useUser(); // Utiliser le hook pour obtenir les données de l'utilisateur

  if (!user || !user.user) {
    // Vérifier que user et user.user sont définis
    return <p>Chargement...</p>; // Afficher un état de chargement approprié
  }

  const finalUser = user.user; // Extraire les données utilisateur du contexte
  console.log("Utilisateur final:", finalUser);

  return (
    <div className="dashboard">
      <Sidebar onLogout={onLogout} />
      <div className="content">
        <h2>Welcome, {finalUser.username}!</h2> {/* Utilisation de finalUser */}
        <DataTable />
      </div>
    </div>
  );
};

export default Dashboard;
