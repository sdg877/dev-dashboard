import React, { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';
import '../styles/pages.css';

const token = process.env.REACT_APP_GITHUB_TOKEN;

const query = gql`
  query {
    viewer {
      login
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`;

const GitHubContributions = () => {
  const [days, setDays] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('GitHub Token:', token);  
      if (!token) {
        setError('GitHub token is missing. Please check your .env file.');
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const data = await request('https://api.github.com/graphql', query, {}, headers);

        const allDays = data.viewer.contributionsCollection.contributionCalendar.weeks
          .flatMap(week => week.contributionDays);

        setDays(allDays);
        setError(null);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError('Failed to fetch GitHub data. Check your token permissions or network.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div>
      <h2>GitHub Contribution Calendar</h2>
      <div className="contribution-calendar" style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '420px' }}>
        {days.map((day, i) => (
          <div
            key={i}
            className="contribution-day"
            style={{
              backgroundColor: day.color,
              width: '14px',
              height: '14px',
              margin: '1px',
              borderRadius: '3px',
            }}
            title={`${day.date}: ${day.contributionCount} contributions`}
          />
        ))}
      </div>
    </div>
  );
};

export default GitHubContributions;
