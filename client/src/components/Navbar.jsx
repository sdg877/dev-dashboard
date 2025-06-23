import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components.css'; // ✅ Single shared CSS file

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
      </div>
      <button onClick={logout} className="logout-button">Logout</button>
    </nav>
  );
};

export default Navbar;
