'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n';
import FlagButton from './FlagButton';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
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
    
    // Use Next.js router for smooth navigation
    router.push(newPath);
  };

  return (
    <div className="relative">
      {/* Mobile: only current flag, dropdown with other flags */}
      <div className="relative md:hidden flex items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <FlagButton
            locale={locale}
            isActive={true}
            onClick={() => setIsOpen((prev) => !prev)}
            label={localeNames[locale]}
          />
          <span className="text-sm text-white/80 font-medium">
            {localeNames[locale]}
          </span>
        </div>

        {isOpen && (
          <div
            className={`absolute top-12 ${isRTL ? 'left-0' : 'right-0'} flex flex-col space-y-2 bg-luxury-darker/90 rounded-lg px-3 py-2 backdrop-blur-sm shadow-lg z-50`}
          >
            {locales
              .filter((loc) => loc !== locale)
              .map((loc) => (
                <div
                  key={loc}
                  className="flex items-center justify-between w-full min-w-[120px] cursor-pointer hover:bg-white/10 rounded px-2 py-1 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    switchLocale(loc);
                  }}
                >
                  <span className="text-xs text-white/80 uppercase">
                    {getLocaleCode(loc)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-white/80 font-medium">
                      {localeNames[loc]}
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
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Desktop: show all flags with text */}
      <div className="hidden md:flex items-center space-x-3">
        {locales.map((loc) => (
          <div
            key={loc}
            className={`flex items-center space-x-2 px-2 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
              locale === loc 
                ? 'bg-luxury-gold/20 border border-luxury-gold/50' 
                : 'hover:bg-white/10'
            }`}
            onClick={() => switchLocale(loc)}
          >
            <FlagButton
              locale={loc}
              isActive={locale === loc}
              onClick={() => switchLocale(loc)}
              label={localeNames[loc]}
            />
            <span className={`text-sm font-medium ${
              locale === loc ? 'text-luxury-gold' : 'text-white/80'
            }`}>
              {localeNames[loc]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

