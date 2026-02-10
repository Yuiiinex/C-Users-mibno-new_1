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
      {/* Mobile: only current flag, NO TEXT */}
      <div className="relative md:hidden flex items-center">
        <div
          className="flex items-center cursor-pointer p-1"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="relative">
            <button
              className={`
                relative
                w-8 h-8 rounded-full
                transition-all duration-200
                border-2 overflow-hidden
                border-luxury-gold shadow-lg shadow-luxury-gold/50 ring-2 ring-luxury-gold/30
              `}
              aria-label={localeNames[locale]}
              title={localeNames[locale]}
            >
              {(() => {
                switch (locale) {
                  case 'fr-MA':
                    return (
                      <div className="w-full h-full flex">
                        <div className="w-1/3 bg-[#002654]" />
                        <div className="w-1/3 bg-white" />
                        <div className="w-1/3 bg-[#ED2939]" />
                      </div>
                    );
                  case 'en-US':
                    return (
                      <div className="w-full h-full relative">
                        <div className="absolute inset-0" style={{
                          background: 'repeating-linear-gradient(to bottom, #B22234 0, #B22234 7.69%, #FFFFFF 7.69%, #FFFFFF 15.38%)',
                        }} />
                        <div className="absolute top-0 left-0 w-[40%] h-[46.15%] bg-[#3C3B6E]" />
                      </div>
                    );
                  case 'de':
                    return (
                      <div className="w-full h-full flex flex-col">
                        <div className="h-1/3 bg-black" />
                        <div className="h-1/3 bg-[#DD0000]" />
                        <div className="h-1/3 bg-[#FFCE00]" />
                      </div>
                    );
                  case 'ar-AE':
                    return (
                      <div className="w-full h-full flex">
                        <div className="w-1/4 bg-[#FF0000]" />
                        <div className="w-3/4 flex flex-col">
                          <div className="h-1/3 bg-[#00732F]" />
                          <div className="h-1/3 bg-white" />
                          <div className="h-1/3 bg-black" />
                        </div>
                      </div>
                    );
                  default:
                    return <div className="w-full h-full bg-gray-600" />;
                }
              })()}
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            className={`absolute top-12 ${isRTL ? 'left-0' : 'right-0'} flex flex-col space-y-1 bg-luxury-darker/95 rounded-lg px-2 py-1.5 backdrop-blur-md shadow-xl border border-white/10 z-50`}
          >
            {locales
              .filter((loc) => loc !== locale)
              .map((loc) => {
                const isArabic = loc.startsWith('ar');
                return (
                  <div
                    key={loc}
                    className={`flex items-center gap-2 min-w-[130px] cursor-pointer hover:bg-white/10 rounded px-2 py-1.5 transition-colors`}
                    onClick={() => {
                      setIsOpen(false);
                      switchLocale(loc);
                    }}
                  >
                    <FlagButton
                      locale={loc}
                      isActive={false}
                      onClick={() => {
                        setIsOpen(false);
                        switchLocale(loc);
                      }}
                      label={localeNames[loc]}
                    />
                    <span className="text-sm text-white font-medium">
                      {localeNames[loc]}
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Desktop: show all flags with text */}
      <div className="hidden md:flex items-center space-x-3">
        {locales.map((loc) => {
          return (
            <div
              key={loc}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
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
          );
        })}
      </div>
    </div>
  );
}

