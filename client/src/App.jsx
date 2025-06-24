import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import GitHubSearch from './GitHubSearch';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get(`${API_URL}/`)
      .then((res) => setMessage(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/github" element={<GitHubSearch />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
    </Router>
  );
}

export default App;
