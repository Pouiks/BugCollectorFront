// src/Components/Dashboard/Dashboard.jsx
import React from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import DataTable from '../DataTable/DataTable.jsx';
import UserManagement from '../UserManagement/UserManagement.jsx';
import { useUser } from '../../context/UserContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const { user } = useUser();

  if (!user || !user.user) {
    return <p>Chargement...</p>;
  }

  const finalUser = user.user;

  return (
    <div className="dashboard">
      {/* Sidebar toujours affichée */}
      <Sidebar onLogout={onLogout} />
      <div className="content">
        <h2>Welcome, {finalUser.username}!</h2>

        {/* Routes internes pour naviguer entre DataTable et UserManagement */}
        <Routes>
          <Route path="/" element={<Navigate to="datatable" />} />
          <Route path="datatable" element={<DataTable />} />
          <Route path="users" element={<UserManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
