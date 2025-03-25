// src/i18n/index.ts

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions } from './settings';

const initI18n = async (lng: string, ns?: string | string[]) => {
  await i18next
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string, namespace: string) =>
        import(`../../public/locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
};

export default initI18n;
