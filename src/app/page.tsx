'use client';

import { useState, useEffect } from 'react';
import { getUserRepos } from '@/services/github';
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';

type Repo = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  updated_at: string;
  language: string;
};

export default function Home() {
  const [username, setUsername] = useState('');
  const [submittedUser, setSubmittedUser] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortOption, setSortOption] = useState('updated');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRepos([]);
    setPage(1);
    setHasMore(true);
    setSubmittedUser(username);
  };

  useEffect(() => {
    if (!submittedUser) return;

    const fetchRepos = async () => {
      setLoading(true);
      setError('');

      try {
        const newRepos = await getUserRepos(submittedUser, page, 10);

        if (newRepos.length === 0) {
          setHasMore(false);
        }

        setRepos((prev) => [...prev, ...newRepos]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [submittedUser, page]);

  const filteredRepos = repos
    .filter((repo) =>
      languageFilter === 'all' ? true : repo.language === languageFilter
    )
    .sort((a, b) => {
      if (sortOption === 'stars') {
        const starsA = a.stargazers_count ?? 0;
        const starsB = b.stargazers_count ?? 0;
        return starsB - starsA;
      } else if (sortOption === 'updated') {
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      }
      return 0;
    });

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6">
      <h1 className="text-2xl font-bold mb-4">GitHub 사용자 검색</h1>

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

      {repos.length > 0 && (
        <div className="flex gap-4 mb-6">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="updated">최근 업데이트 순</option>
            <option value="stars">별점 많은 순</option>
          </select>

          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="all">모든 언어</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Python">Python</option>
            <option value="HTML">HTML</option>
          </select>
        </div>
      )}

      {loading && repos.length === 0 && <p>로딩 중...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* 무한 스크롤을 적용한 리스트 렌더링 부분 */}
      <InfiniteScroll
        dataLength={repos.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<p>로딩 중...</p>}
        endMessage={<p>모든 레포를 불러왔습니다.</p>}
      >
        <ul className="w-full max-w-xl space-y-4">
          {filteredRepos.map((repo) => (
            <Link
              key={repo.id}
              href={{
                pathname: `/repos/${repo.name}`,
                query: { user: submittedUser },
              }}
            >
              <li className="border p-4 rounded-md shadow hover:bg-gray-100 cursor-pointer">
                <h2 className="text-lg font-semibold">{repo.name}</h2>
                <p className="text-sm text-gray-600">{repo.description}</p>
                <div className="text-sm text-gray-500">
                  ⭐ {repo.stargazers_count ?? 0} | 마지막 업데이트:{" "}
                  {new Date(repo.updated_at).toLocaleDateString()}
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </InfiniteScroll>

    </main>
  );
}
