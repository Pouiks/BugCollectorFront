import React, { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import './Sidebar.css';

const Sidebar = ({ onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#dashboard">Dashboard</Nav.Link>
        <Nav.Link href="#Users">Utilisateurs</Nav.Link>
        <Nav.Link href="#profil">Profil</Nav.Link>
      </Nav>
      <Button variant="danger" onClick={onLogout} className="logout-button">
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
