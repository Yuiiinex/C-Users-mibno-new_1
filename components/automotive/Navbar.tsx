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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md shadow-lg'
        : 'bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm'
        }`}
    >
      <div className="w-full px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Left Side: Logo, Hamburger Menu, and Navigation */}
          <div className="flex items-center flex-1">
            {/* Mobile Menu Button - Only visible on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white focus:outline-none mr-4"
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

            {/* Logo */}
            <Link href="/" className="mr-16 ml-24">
              <motion.img
                src="/images/logo1.png"
                alt="WExpressCars Logo"
                className="h-24 w-44 object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </Link>




            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center ${isRTL ? 'space-x-0 space-x-reverse' : 'space-x-8'} ${isRTL ? 'mr-48' : 'ml-48'}`}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 text-white hover:text-luxury-gold transition-colors duration-200 font-medium text-lg md:text-lg uppercase tracking-wider group ${isRTL ? 'ml-6' : 'mr-6'
                      }`}
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Language Switcher */}
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Horizontal line below navbar */}
        <div className="w-full px-8 absolute bottom-0 left-0">
          <div className="h-[0.5px] bg-white/20 w-full"></div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden pb-4 border-t border-white/10 mt-4 ${isRTL ? 'pr-4' : 'pl-4'}`}
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
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

