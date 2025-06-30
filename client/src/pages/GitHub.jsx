import React from 'react';
import GitHubSearch from './GitHubSearch';
import GitHubContributions from './GitHubContributions';

const GitHub = () => {
  return (
    <div>
      <h2>My GitHub Overview</h2>
      <GitHubSearch />
      <GitHubContributions />
    </div>
  );
};

export default GitHub;
