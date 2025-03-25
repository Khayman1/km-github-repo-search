import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';

acceptLanguage.languages(['ko', 'en']);

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return;
  }

  const pathnameIsMissingLocale = !/^\/(ko|en)/.test(pathname);
  if (pathnameIsMissingLocale) {
    const lang = acceptLanguage.get(req.headers.get('Accept-Language') || '') || 'ko';
    return NextResponse.redirect(new URL(`/${lang}${pathname}`, req.url));
  }
}
