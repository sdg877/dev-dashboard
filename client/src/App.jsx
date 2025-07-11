import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import GitHub from './pages/GitHub';
import GitHubCallback from './pages/GitHubCallback';

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
        <Route path="/github" element={<GitHub />} /> 
        <Route path="/github/callback" element={<GitHubCallback />} />
        <Route path="/" element={<Home />} /> 
      </Routes>
    </Router>
  );
};

export default App;
