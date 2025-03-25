'use client';

import React, { useState, useEffect } from 'react';
import { getUserRepos } from '@/services/github';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import SearchBar from '@/components/SearchBar'; // Import SearchBar
import RepoListComponent from '@/components/RepoList'; // Import the new RepoList component
import RepoDetail from '@/components/RepoDetail'; // Import RepoDetail component
import { Repo } from '../../types';

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

const Message = styled.p`
  font-size: 0.9rem;
  color: #475569;  // Text color
  animation: ${fadeIn} 0.5s ease;  // Applying fade-in animation
`;

const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: #ef4444;  // Red color for error text
  animation: ${fadeIn} 0.5s ease;  // Applying fade-in animation
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
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

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

      {/* RepoList Component */}
      <InfiniteScroll
        dataLength={repos.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<Message />}
        endMessage={<Message>{t('endMessage')}</Message>}
      >
        <RepoListComponent
          repos={filteredRepos}
          t={t}
          lng={lng}
          submittedUser={submittedUser}
          onRepoClick={setSelectedRepo} // Passing down the selectedRepo setter function
        />
      </InfiniteScroll>

      {/* Display RepoDetail when a repo is selected */}
      {selectedRepo && <RepoDetail repoName={selectedRepo} user={submittedUser} />}
    </Main>
  );
}
