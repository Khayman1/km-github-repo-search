'use client';

import { useState, useEffect } from 'react';
import { getUserRepos } from '@/services/github';

type Repo = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  updated_at: string;
};

export default function Home() {
  const [username, setUsername] = useState('');
  const [submittedUser, setSubmittedUser] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedUser(username);
  };

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getUserRepos(submittedUser);
        setRepos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (submittedUser) fetchRepos();
  }, [submittedUser]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6">
      <h1 className="text-2xl font-bold mb-4">🔍 GitHub 사용자 검색</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="GitHub 사용자명 입력"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          검색
        </button>
      </form>

      {loading && <p>⏳ 로딩 중...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}

      <ul className="w-full max-w-xl space-y-4">
        {repos.map((repo) => (
          <li key={repo.id} className="border p-4 rounded-md shadow">
            <h2 className="text-lg font-semibold">{repo.name}</h2>
            <p className="text-sm text-gray-600">{repo.description}</p>
            <div className="text-sm text-gray-500">
              ⭐ {repo.stargazers_count} | 🕒{' '}
              {new Date(repo.updated_at).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
