import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['fr-MA', 'en-US', 'de', 'ar-AE'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = 'fr-MA' as const;

export const localeNames: Record<Locale, string> = {
  'fr-MA': 'Français',
  'en-US': 'English',
  'de': 'Deutsch',
  'ar-AE': 'العربية',
};

export const localeFlags: Record<Locale, string> = {
  'fr-MA': '🇫🇷',
  'en-US': '🇺🇸',
  'de': '🇩🇪',
  'ar-AE': '🇦🇪',
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

