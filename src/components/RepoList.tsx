// components/RepoList.tsx
import React from 'react';
import { Repo } from '@/types'; // Ensure Repo type is defined
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

const RepoList = styled.ul`
  width: 100%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const RepoItem = styled.li`
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.2rem;
  background-color: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: #f1f5f9;
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.3rem;
  }

  p {
    font-size: 0.9rem;
    color: #64748b;
    margin-bottom: 0.5rem;
  }

  div {
    font-size: 0.8rem;
    color: #94a3b8;
  }
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
          onClick={() => onRepoClick(repo.name)}  // Trigger onRepoClick when a repo is clicked
        >
          <RepoItem>
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
            <div>
              ⭐ {repo.stargazers_count ?? 0} | {t('lastUpdated')}:{" "}
              {new Date(repo.updated_at).toLocaleDateString()}
            </div>
          </RepoItem>
        </Link>
      ))}
    </RepoList>
  );
};

export default RepoListComponent;
