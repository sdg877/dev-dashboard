import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GitHubContributions from "./GitHubContributions";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [githubProfile, setGithubProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessage(res.data.msg);

        // You might also want to fetch GitHub data here:
        const githubRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/github/sdg877`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setGithubProfile(githubRes.data.profile);
        setRepos(githubRes.data.repos.slice(0, 5)); // example: show 5 latest
      } catch (err) {
        console.error("Dashboard error:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Dev Dashboard</h1>
      <p>{message || "Loading..."}</p>

      {githubProfile && (
        <div>
          <img
            src={githubProfile.avatar_url}
            alt={githubProfile.login}
            width="100"
          />
          <h2>
            {githubProfile.name} ({githubProfile.login})
          </h2>
          <p>{githubProfile.bio}</p>
          <a href={githubProfile.html_url} target="_blank" rel="noreferrer">
            View GitHub
          </a>
        </div>
      )}

      <h3>Recent Repositories</h3>
      <div>
        {repos.map((repo) => (
          <div key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
          </div>
        ))}
      </div>

      <GitHubContributions />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
