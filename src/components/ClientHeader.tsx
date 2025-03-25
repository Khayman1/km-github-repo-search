// src/components/ClientHeader.tsx
'use client';

import { useTranslation } from 'react-i18next';
import i18n from '../i18n/client';
import { useEffect, useState } from 'react';

export default function ClientHeader() {
  const { t, i18n: i18nInstance } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  if (!mounted || !i18nInstance.isInitialized) return null; // 번역 초기화 전에는 렌더링 X

  return (
    <header>
      <button onClick={() => changeLanguage('ko')}>한국어</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </header>
  );
}
