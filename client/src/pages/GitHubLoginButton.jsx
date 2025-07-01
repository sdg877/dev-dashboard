import React from 'react';

const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;

const GitHubLoginButton = () => {
  const redirectUri = `${window.location.origin}/github/callback`;

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=read:user repo`;

  return (
    <button
      onClick={() => {
        window.location.href = githubAuthUrl;
      }}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#24292e',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
      }}
    >
      Login with GitHub
    </button>
  );
};

export default GitHubLoginButton;
