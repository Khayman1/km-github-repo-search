// components/SearchBar.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
`;

const Input = styled.input`
  padding: 0.6rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 1rem;
  width: 250px;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  background: linear-gradient(to right, #3b82f6, #60a5fa);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(to right, #2563eb, #3b82f6);
  }
`;

type SearchBarProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
};

const SearchBar = ({ username, setUsername, handleSubmit }: SearchBarProps) => {
  const { t } = useTranslation(); // for translation

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder={t('searchPlaceholder')}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button type="submit">{t('searchButton')}</Button>
    </Form>
  );
};

export default SearchBar;
