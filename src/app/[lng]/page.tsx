'use client';

import { useState, useEffect } from 'react';
import { getUserRepos } from '@/services/github';
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import SearchBar from '@/components/SearchBar'; // Import SearchBar
import styled, { keyframes } from 'styled-components';

type Repo = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  updated_at: string;
  language: string;
};
// 애니메이션 및 스타일 정의 생략 (기존과 동일)...
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(to bottom right, #f0f9ff, #e0f2fe);
  animation: ${fadeIn} 0.8s ease;
`;

const Filters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 1.2s ease;
`;

const Select = styled.select`
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  font-size: 1rem;
  transition: box-shadow 0.3s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const RepoList = styled.ul`
  width: 100%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  animation: ${fadeIn} 1.3s ease;
`;

const RepoItem = styled.ul`
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

const Message = styled.p`
  font-size: 0.9rem;
  color: #475569;
  animation: ${fadeIn} 0.5s ease;
`;

const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: #ef4444;
`;

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

  const { t, i18n } = useTranslation();
  const lng = i18n.language;

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
        setError(t('errorOccurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [submittedUser, page, t]);

  const filteredRepos = repos
    .filter((repo) =>
      languageFilter === 'all' ? true : repo.language === languageFilter
    )
    .sort((a, b) => {
      if (sortOption === 'stars') {
        return (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0);
      } else if (sortOption === 'updated') {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
      return 0;
    });

  return (
    <Main>
      {/* Use the SearchBar component here */}
      <SearchBar username={username} setUsername={setUsername} handleSubmit={handleSubmit} />

      {repos.length > 0 && (
        <Filters>
          <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="updated">{t('sortUpdated')}</option>
            <option value="stars">{t('sortStars')}</option>
          </Select>

          <Select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)}>
            <option value="all">{t('allLanguages')}</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Python">Python</option>
            <option value="HTML">HTML</option>
          </Select>
        </Filters>
      )}

      {loading && repos.length === 0 && <Message>{t('loading')}</Message>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <InfiniteScroll
        dataLength={repos.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<Message />}
        endMessage={<Message>{t('endMessage')}</Message>}
      >
        <RepoList>
          {filteredRepos.map((repo) => (
            <Link
              key={repo.id}
              href={{
                pathname: `/${lng}/repos/${repo.name}`, // Include language
                query: { user: submittedUser },
              }}
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
      </InfiniteScroll>
    </Main>
  );
}
