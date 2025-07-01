import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GitHubCallback = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      setError('No code found in URL');
      return;
    }

    fetch('http://localhost:5000/github/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.access_token) {
          localStorage.setItem('github_token', data.access_token);
          navigate('/dashboard');  // Redirect after successful login
        } else {
          setError('Failed to get access token');
        }
      })
      .catch(() => setError('Error exchanging code'));
  }, [navigate]);

  if (error) return <p>Error: {error}</p>;

  return <p>Loading GitHub login...</p>;
};

export default GitHubCallback;
