import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components.css';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/profile', label: 'Profile' },
    { to: '/settings', label: 'Settings' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/login', label: 'Login' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {links
          .filter(link => link.to !== location.pathname)
          .map(link => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
