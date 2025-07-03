// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const GitHubSearch = () => {
//   const [username, setUsername] = useState('sdg877'); 
//   const [profile, setProfile] = useState(null);
//   const [repos, setRepos] = useState([]);

//   const fetchData = async (user) => {
//     try {
//       const userRes = await axios.get(`https://api.github.com/users/${user}`);
//       const reposRes = await axios.get(`https://api.github.com/users/${user}/repos`);
//       setProfile(userRes.data);
//       setRepos(reposRes.data);
//     } catch (err) {
//       alert('GitHub user not found');
//       setProfile(null);
//       setRepos([]);
//     }
//   };

//   useEffect(() => {
//     fetchData(username);
//   }, []);

//   const handleSearch = () => {
//     fetchData(username);
//   };

//   return (
//     <div>
//       <h2>Search GitHub User</h2>
//       <input
//         type="text"
//         value={username}
//         placeholder="Enter GitHub username"
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       {profile && (
//         <div>
//           <h3>{profile.name || 'No name'} ({profile.login})</h3>
//           <img src={profile.avatar_url} alt={profile.login} width="100" />
//           <p>{profile.bio}</p>
//           <a href={profile.html_url} target="_blank" rel="noreferrer">GitHub Profile</a>

//           <h4>Repositories:</h4>
//           <ul>
//             {repos.map(repo => (
//               <li key={repo.id}>
//                 <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GitHubSearch;

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/pages.css';

const GitHubSearch = () => {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!username) return;
    try {
      const res = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepos(res.data);
      setError('');
    } catch (err) {
      console.error('Error fetching repos:', err);
      setError('User not found or error fetching repos.');
      setRepos([]);
    }
  };

  return (
    <div className="github-search-container">
      <div className="search-bar">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="repos-list">
        {repos.map((repo) => (
          <div key={repo.id} className="repo-item">
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
            <p>{repo.description ? repo.description : 'No description'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubSearch;
