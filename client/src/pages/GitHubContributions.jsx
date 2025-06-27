import React, { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';
import '../styles/pages.css'

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

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

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      };
      try {
        const data = await request('https://api.github.com/graphql', query, {}, headers);
        const allDays = data.viewer.contributionsCollection.contributionCalendar.weeks
          .flatMap(week => week.contributionDays);
        setDays(allDays);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>GitHub Contribution Calendar</h2>
      <div className="contribution-calendar">
        {days.map((day, i) => (
          <div
            key={i}
            className="contribution-day"
            style={{ backgroundColor: day.color }}
            title={`${day.date}: ${day.contributionCount} contributions`}
          />
        ))}
      </div>
    </div>
  );
};

export default GitHubContributions;
