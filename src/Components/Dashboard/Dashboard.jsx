import React from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import DataTable from '../DataTable/DataTable.jsx';
import './Dashboard.css';

const Dashboard = ({ username, onLogout }) => {
  return (
    <div className="dashboard">
      <Sidebar onLogout={onLogout} />
      <div className="content">
        <h2>Welcome, {username}!</h2>
        <DataTable />
      </div>
    </div>
  );
};

export default Dashboard;
