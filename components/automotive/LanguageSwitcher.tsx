'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n';
import FlagButton from './FlagButton';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    // Get current pathname and remove locale prefix if present
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    
    // Check if first segment is a locale
    const isLocaleSegment = locales.includes(firstSegment as Locale);
    const pathWithoutLocale = isLocaleSegment 
      ? '/' + segments.slice(1).join('/')
      : pathname;
    
    // Build new path with locale prefix
    const cleanPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale;
    const newPath = `/${newLocale}${cleanPath}`;
    
    // Use window.location for reliable navigation
    window.location.href = newPath;
  };

  return (
    <div className="flex items-center space-x-2">
      {locales.map((loc) => (
        <FlagButton
          key={loc}
          locale={loc}
          isActive={locale === loc}
          onClick={() => switchLocale(loc)}
          label={localeNames[loc]}
        />
      ))}
    </div>
  );
}
