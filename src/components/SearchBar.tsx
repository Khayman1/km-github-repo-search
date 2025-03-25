import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { FiSearch } from 'react-icons/fi'; // 검색 아이콘 추가

// Bounce effect for the input when focused
const bounce = keyframes`
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(0.9);
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 9rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  backdrop-filter: blur(12px);
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  margin-bottom: 2.5rem;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  flex: 1;
  transition: 0.3s ease;
  
  &:focus-within {
    animation: ${bounce} 0.6s ease;  // Apply bounce animation when the input is focused
  }
`;

const SearchIcon = styled(FiSearch)`
  margin-right: 0.5rem;
  color: #94a3b8;
  font-size: 1.2rem;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  font-size: 1rem;
  width: 100%;
  color: #1e293b;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.65rem 1.3rem;
  background: linear-gradient(to right, #3b82f6, #60a5fa);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(to right, #2563eb, #3b82f6);
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

type SearchBarProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
};

const SearchBar = ({ username, setUsername, handleSubmit }: SearchBarProps) => {
  const { t } = useTranslation();

  return (
    <Form onSubmit={handleSubmit}>
      <InputWrapper>
        <SearchIcon />
        <Input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputWrapper>
      <Button type="submit">{t('searchButton')}</Button>
    </Form>
  );
};

export default SearchBar;
