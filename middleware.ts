import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export const routing = {
  locales,
  defaultLocale,
  localePrefix: 'as-needed' as const,
  trailingSlash: 'never' as const,
};

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
