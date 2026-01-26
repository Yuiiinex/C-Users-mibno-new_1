'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n';
import FlagButton from './FlagButton';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = locale.startsWith('ar');

  const getLocaleCode = (loc: Locale) => {
    switch (loc) {
      case 'fr-MA':
        return 'FR';
      case 'en-US':
        return 'US';
      case 'de':
        return 'DE';
      case 'ar-AE':
        return 'AR';
      default:
        return '';
    }
  };

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
    <div className="relative">
      {/* Mobile: only current flag, dropdown with other flags */}
      <div className="relative md:hidden flex items-center">
        <FlagButton
          locale={locale}
          isActive={true}
          onClick={() => setIsOpen((prev) => !prev)}
          label={localeNames[locale]}
        />

        {isOpen && (
          <div
            className={`absolute top-12 ${isRTL ? 'left-0' : 'right-0'} flex flex-col space-y-2 bg-luxury-darker/90 rounded-lg px-3 py-2 backdrop-blur-sm shadow-lg z-50`}
          >
            {locales
              .filter((loc) => loc !== locale)
              .map((loc) => (
                <div
                  key={loc}
                  className="flex items-center justify-between w-full min-w-[72px]"
                >
                  <span className="text-xs text-white/80 uppercase">
                    {getLocaleCode(loc)}
                  </span>
                  <FlagButton
                    locale={loc}
                    isActive={false}
                    onClick={() => {
                      setIsOpen(false);
                      switchLocale(loc);
                    }}
                    label={localeNames[loc]}
                  />
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Desktop: show all flags */}
      <div className="hidden md:flex items-center space-x-2">
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
    </div>
  );
}

