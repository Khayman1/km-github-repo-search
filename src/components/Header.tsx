'use client';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/client';
import { useState } from 'react';

const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #0f172a;
`;

const SelectorWrapper = styled.div`
  position: relative;
`;

const LangToggle = styled.button`
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  background: linear-gradient(to right, #e0f2fe, #dbeafe);
  color: #1e3a8a;
  border: 1px solid #93c5fd;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    background: linear-gradient(to right, #c7d2fe, #a5b4fc);
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 2.5rem;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  min-width: 100px;
  z-index: 999;
`;

const LangOption = styled.ul`
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  color: #1e293b;
  cursor: pointer;

  &:hover {
    background-color: #f1f5f9;
  }
`;

export default function Header() {
  const { t, i18n: i18nInstance } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <HeaderWrapper><Title>{t('searchTitle')}</Title><SelectorWrapper>
        <LangToggle onClick={() => setOpen(!open)}>
          🌐 {i18nInstance.language === 'ko' ? '한국어' : 'English'}
        </LangToggle>
        {open && (
          <Dropdown>
            <LangOption onClick={() => changeLanguage('ko')}>한국어</LangOption>
            <LangOption onClick={() => changeLanguage('en')}>English</LangOption>
          </Dropdown>
        )}
      </SelectorWrapper>
    </HeaderWrapper>
  );
}
