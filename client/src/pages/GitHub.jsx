import React from "react";
import GitHubSearch from "./GitHubSearch";
import GitHubContributions from "./GitHubContributions";

const GitHub = () => {
  return (
    <div className="github-container">
      <h2>My GitHub Overview</h2>
      <GitHubSearch />
      <GitHubContributions />
    </div>
  );
};

export default GitHub;
