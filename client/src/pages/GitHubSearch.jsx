// GitHubSearch.jsx
import React, { useState } from 'react';
import axios from 'axios';

const GitHubSearch = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleSearch = async () => {
    try {
      const userRes = await axios.get(`https://api.github.com/users/${username}`);
      const reposRes = await axios.get(`https://api.github.com/users/${username}/repos`);
      setProfile(userRes.data);
      setRepos(reposRes.data);
    } catch (err) {
      alert('GitHub user not found');
      setProfile(null);
      setRepos([]);
    }
  };

  return (
    <div>
      <h2>Search GitHub User</h2>
      <input
        type="text"
        value={username}
        placeholder="Enter GitHub username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {profile && (
        <div>
          <h3>{profile.name} ({profile.login})</h3>
          <img src={profile.avatar_url} alt={profile.login} width="100" />
          <p>{profile.bio}</p>
          <a href={profile.html_url} target="_blank" rel="noreferrer">GitHub Profile</a>

          <h4>Repositories:</h4>
          <ul>
            {repos.map(repo => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GitHubSearch;
