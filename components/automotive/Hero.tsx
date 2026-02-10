'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 z-0">
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
    style={{
      backgroundImage: `url(/images/image_hero.jpg)`,
    }}
  />
  <div className="absolute inset-0 bg-luxury-darker/10" />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-darker/50 to-luxury-darker" />
</div>


      {/* Fixed social links on the right side */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-20 flex-col space-y-4">
        {/* Facebook */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-md flex items-center justify-center text-white bg-[#1877F2] hover:bg-[#145dbf] shadow-lg shadow-black/40 transition-colors duration-300"
        >
          <span className="text-xl font-semibold">f</span>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-md flex items-center justify-center text-white bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] hover:opacity-90 shadow-lg shadow-black/40 transition-all duration-300"
        >
          <span className="text-xl font-semibold">IG</span>
        </a>

        {/* X / Twitter */}
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-md flex items-center justify-center text-white bg-black hover:bg-neutral-900 border border-white/60 hover:border-luxury-gold/80 shadow-lg shadow-black/40 transition-colors duration-300"
        >
          <span className="text-xl font-semibold">X</span>
        </a>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-4"
          >
            {t('title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/models"
              className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-luxury-gold text-luxury-darker font-bold text-sm sm:text-base uppercase tracking-wider hover:bg-luxury-gold/90 transition-all duration-300 transform hover:scale-105"
            >
              {t('cta')}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

