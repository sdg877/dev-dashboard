import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchDashboard = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMessage(res.data.msg);
      } catch (err) {
        console.error('Dashboard error:', err);
        localStorage.removeItem('token'); // clear invalid token
        navigate('/login');
      }
    };

    fetchDashboard();
  }, [navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dev Dashboard</h1>
      <p>{message || 'Loading...'}</p>
    </div>
  );
};

export default Dashboard;
