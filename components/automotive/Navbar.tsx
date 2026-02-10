'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const tLang = useTranslations('language');
  const locale = useLocale() as Locale;
  const isRTL = locale.startsWith('ar');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/models', label: t('models') },
    { href: '/brand', label: t('brand') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md shadow-lg'
        : 'bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm'
        }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-24 sm:h-28">
          {/* Mobile Layout: Hamburger | Centered Logo | Flag */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none z-10"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Centered Logo - MUCH BIGGER */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <img
                src="/images/logo1.png"
                alt="WExpressCars Logo"
                className="h-20 w-40 sm:h-24 sm:w-48 object-contain transition-transform duration-200 hover:scale-105"
              />
            </Link>

            {/* Language Switcher (right side) */}
            <div className="z-10">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Desktop Layout: Logo on left, Navigation, Language Switcher */}
          <div className="hidden md:flex items-center flex-1">
            {/* Logo */}
            <Link href="/" className="mr-2 sm:mr-4 md:mr-16 lg:ml-24">
              <img
                src="/images/logo1.png"
                alt="WExpressCars Logo"
                className="h-24 w-48 lg:h-28 lg:w-56 object-contain transition-transform duration-200 hover:scale-105"
              />
            </Link>




            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center ${isRTL ? 'space-x-0 space-x-reverse' : 'space-x-4 lg:space-x-8'} ${isRTL ? 'mr-8 lg:mr-48' : 'ml-8 lg:ml-48'}`}>
              {navItems.map((item, index) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative px-2 lg:px-4 py-2 text-white hover:text-luxury-gold transition-colors duration-200 font-medium text-sm lg:text-lg uppercase tracking-wider group ${isRTL ? 'ml-2 lg:ml-6' : 'mr-2 lg:mr-6'
                      }`}
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Language Switcher - Desktop only */}
          <div className="hidden md:flex items-center">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Horizontal line below navbar */}
        <div className="w-full px-8 absolute bottom-0 left-0">
          <div className="h-[0.5px] bg-white/20 w-full"></div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden pb-4 border-t border-white/10 mt-4 ${isRTL ? 'pr-4' : 'pl-4'} animate-fadeIn`}
          >
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative block py-3 text-white/90 hover:text-luxury-gold transition-colors duration-200 font-medium text-lg md:text-base uppercase tracking-wider group"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

