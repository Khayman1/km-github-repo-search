export const fallbackLng = 'ko';
export const languages = ['ko', 'en'];

export const defaultNS = 'common';

export function getOptions(lng = fallbackLng, ns: string | string[] = defaultNS) {
  return {
    // 지원할 언어
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
  };
}
