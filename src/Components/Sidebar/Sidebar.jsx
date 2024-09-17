// src/Components/Sidebar/Sidebar.jsx
import React, { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Utiliser NavLink de react-router-dom
import { useUser } from '../../context/UserContext';
import './Sidebar.css';

const Sidebar = ({ onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useUser();

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h4>Logo</h4>
        <Button variant="primary" onClick={handleToggle}>
          {isCollapsed ? '>' : '<'}
        </Button>
      </div>
      <Nav className="flex-column sidebar-nav">
        <NavLink to="/dashboard/datatable" className="nav-link"> {/* Lien correct vers DataTable */}
          Dashboard
        </NavLink>
        {user.user.role === "admin" && (
          <>
            <NavLink to="/dashboard/users" className="nav-link"> {/* Lien correct vers UserManagement */}
              Utilisateurs
            </NavLink>
          </>
        )}
      </Nav>
      <Button variant="danger" onClick={onLogout} className="logout-button">
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
