// src/components/RepoDetail.tsx
import React, { useEffect, useState } from 'react';
import { getUserRepos } from '@/services/github'; // Assuming this is a function that fetches repo details
import { Repo } from '@/types';

type RepoDetailProps = {
  repoName: string;
  user: string;
};

const RepoDetail: React.FC<RepoDetailProps> = ({ repoName, user }) => {
  const [repo, setRepo] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRepoDetails = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getUserRepos(user, repoName);  // Ensure both are strings, as repoName is likely a string
        setRepo(data);
      } catch (err: any) {
        setError('Error loading repository details.');
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [repoName, user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!repo) return <div>Repository not found.</div>;

  return (
    <div>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
      <div>
        ⭐ {repo.stargazers_count} | Last updated: {new Date(repo.updated_at).toLocaleDateString()}
      </div>
    </div>
  );
};

export default RepoDetail;
