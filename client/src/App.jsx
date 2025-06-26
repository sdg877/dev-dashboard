import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import Navbar from './components/Navbar'; // new import

const App = () => {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} /> 
      </Routes>
    </Router>
  );
};

export default App;
