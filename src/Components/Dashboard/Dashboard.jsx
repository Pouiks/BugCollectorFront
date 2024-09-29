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
  console.log(user)

  if (!user || !user.user) {
    return <p>Chargement...</p>;
  }

  const finalUser = user.user;

  return (
    <div className="dashboard">
      <Sidebar onLogout={onLogout} />
      <div className="content">
        <h2>Welcome, {finalUser.username}!</h2>

        {/* Routes internes pour naviguer entre DataTable et UserManagement */}
        <Routes>
          <Route path="/" element={<Navigate to="datatable" user={user}/>} />
          <Route path="datatable" element={<DataTable user={user}/>} />
          <Route path="users" element={<UserManagement user={user}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
