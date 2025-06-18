import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tasks from './pages/Tasks';


function App() {
  const [message, setMessage] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/`)
      .then(res => setMessage(res.data))
      .catch(err => console.error(err));
  }, [API_URL]);

  return (
    <div>
      <h1>Dev Dashboard</h1>
      <p>API says: {message}</p>
      <Route path="/tasks" element={<Tasks />} />
    </div>
  );
}

export default App;
