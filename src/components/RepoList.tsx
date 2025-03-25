import React from 'react';
import { Repo } from '@/types';
import Link from 'next/link';
import styled from 'styled-components';

// Define the props for RepoListComponent
type RepoListProps = {
  repos: Repo[];
  t: (key: string) => string;
  lng: string;
  submittedUser: string;
  onRepoClick: React.Dispatch<React.SetStateAction<string | null>>;  // Add the onRepoClick prop
};

// Main wrapper for the list
const RepoList = styled.ul`
  width: 100%;
  max-width: 45rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1.5rem;
  list-style: none;
  font-family: 'Roboto', sans-serif;  // Add the font here
`;

// Individual repo item
const RepoItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    background-color: #f9fafb;
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 1.35rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
    color: #4a5568; // Light gray color for the title

    &:hover {
      color: #3b82f6; // Change color on hover (optional)
    }
  }

  p {
    font-size: 1rem;
    color: #4a5568;  // Light gray color for the description text
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  div {
    font-size: 0.9rem;
    color: #718096;
    display: flex;
    gap: 1rem;
    align-items: center;

    span {
      font-weight: 500;
    }
  }
`;

// Link styled component to remove underline
const StyledLink = styled.a`
  text-decoration: none; // Remove underline from the link
  color: inherit; // Inherit color from the parent component
`;

const RepoListComponent: React.FC<RepoListProps> = ({ repos, t, lng, submittedUser, onRepoClick }) => {
  return (
    <RepoList>
      {repos.map((repo) => (
        <Link
          key={repo.id}
          href={{
            pathname: `/${lng}/repos/${repo.name}`, // Include language
            query: { user: submittedUser },
          }}
          passHref
        >
          <StyledLink onClick={() => onRepoClick(repo.name)}>  {/* Wrap the link inside StyledLink */}
            <RepoItem>
              <h2>{repo.name}</h2>
              <p>{repo.description}</p>
              <div>
                <span>⭐ {repo.stargazers_count ?? 0}</span>
                <span>{t('lastUpdated')}: {new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
            </RepoItem>
          </StyledLink>
        </Link>
      ))}
    </RepoList>
  );
};

export default RepoListComponent;
