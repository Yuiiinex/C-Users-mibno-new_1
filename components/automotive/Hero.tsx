'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function Hero() {
  const t = useTranslations('home.hero');
  const [isVisible, setIsVisible] = useState(false);
  
  // Hero content
  const mainTitle = "Driven by Trust. Delivered with Excellence";
  const letters = mainTitle.split('');
  
  // Split title into two lines for mobile
  const line1 = "Driven by Trust.";
  const line2 = "Delivered with Excellence";
  const line1Letters = line1.split('');
  const line2Letters = line2.split('');
  
  // Identify special letters to highlight in red
  const isSpecialLetter = (letter: string, index: number) => {
    // "D" in "Driven" (index 0)
    if (index === 0 && letter === 'D') return true;
    // "T" in "Trust" (index 10: "Driven by T")
    if (index === 10 && letter === 'T') return true;
    // "D" in "Delivered" (index 17: "Driven by Trust. D")
    if (index === 17 && letter === 'D') return true;
    // "E" in "Excellence" (index 32: "Driven by Trust. Delivered with E")
    if (index === 32 && letter === 'E') return true;
    return false;
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
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
      <div className="relative z-10 w-full h-full flex items-center md:items-start px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-0 md:pt-40 overflow-visible">
        <div className="relative w-full overflow-visible max-w-7xl text-center md:text-left">
          {/* 3D Text Title - Letter by Letter */}
          <div className="relative overflow-visible mb-3 sm:mb-6 flex justify-center md:justify-start" style={{ perspective: '1000px' }}>
            <h1 className="relative overflow-visible leading-tight pb-4 sm:pb-8">
              {/* Mobile: Two lines */}
              <span className="block md:hidden text-center">
                {/* Line 1: Driven by Trust. */}
                <span className="block mb-2">
                  {line1Letters.map((letter, index) => {
                    const isSpecial = (index === 0 && letter === 'D') || (index === 10 && letter === 'T');
                    return (
                      <motion.span
                        key={`line1-${index}`}
                        initial={{ opacity: 0, x: -100, rotateY: -90, z: -200 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block text-xl font-black tracking-tight leading-snug"
                        style={{
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          letterSpacing: letter === ' ' ? '0.3em' : '-0.02em',
                          transformStyle: 'preserve-3d',
                          color: isSpecial ? '#DC2626' : '#ffffff',
                          textShadow: isSpecial ? '0 1px 0 #b91c1c, 0 2px 0 #991b1b, 0 0 10px rgba(220,38,38,.8)' : '0 1px 0 #ccc, 0 2px 0 #bbb',
                          WebkitTextStroke: isSpecial ? '2px rgba(220,38,38,0.6)' : '1px rgba(220,38,38,0.4)',
                        }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </motion.span>
                    );
                  })}
                </span>
                {/* Line 2: Delivered with Excellence */}
                <span className="block">
                  {line2Letters.map((letter, index) => {
                    const isSpecial = (index === 0 && letter === 'D') || (index === 16 && letter === 'E');
                    return (
                      <motion.span
                        key={`line2-${index}`}
                        initial={{ opacity: 0, x: -100, rotateY: -90, z: -200 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
                        transition={{ duration: 0.8, delay: (line1Letters.length + index) * 0.03, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block text-xl font-black tracking-tight leading-snug"
                        style={{
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          letterSpacing: letter === ' ' ? '0.3em' : '-0.02em',
                          transformStyle: 'preserve-3d',
                          color: isSpecial ? '#DC2626' : '#ffffff',
                          textShadow: isSpecial ? '0 1px 0 #b91c1c, 0 2px 0 #991b1b, 0 0 10px rgba(220,38,38,.8)' : '0 1px 0 #ccc, 0 2px 0 #bbb',
                          WebkitTextStroke: isSpecial ? '2px rgba(220,38,38,0.6)' : '1px rgba(220,38,38,0.4)',
                        }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </motion.span>
                    );
                  })}
                </span>
              </span>
              
              {/* Desktop: One line */}
              <span className="hidden md:block text-left whitespace-nowrap">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, x: -100, rotateY: -90, z: -200 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ rotateY: 15, scale: 1.1, z: 50, transition: { duration: 0.3 } }}
                    className="inline-block text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-snug cursor-pointer"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      letterSpacing: letter === ' ' ? '0.3em' : '-0.02em',
                      transformStyle: 'preserve-3d',
                      color: isSpecialLetter(letter, index) ? '#DC2626' : '#ffffff',
                      textShadow: isSpecialLetter(letter, index)
                        ? `0 1px 0 #b91c1c, 0 2px 0 #991b1b, 0 3px 0 #7f1d1d, 0 4px 0 #7f1d1d, 0 5px 0 #6b1616, 0 6px 1px rgba(0,0,0,.2), 0 0 10px rgba(220,38,38,.8), 0 1px 5px rgba(220,38,38,.6), 0 3px 10px rgba(220,38,38,.5), 0 5px 15px rgba(220,38,38,.4), 0 10px 30px rgba(220,38,38,.3), 0 20px 50px rgba(220,38,38,.4)`
                        : `0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 20px rgba(0,0,0,.15), 0 20px 40px rgba(220,38,38,.3)`,
                      WebkitTextStroke: isSpecialLetter(letter, index) ? '2px rgba(220,38,38,0.6)' : '1px rgba(220,38,38,0.4)',
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </span>
            
              {/* 3D Shadow Underline */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: 1, 
                  opacity: 1,
                }}
                transition={{ 
                  duration: 1.2, 
                  delay: letters.length * 0.03 + 0.3,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute bottom-2 left-0 w-2/3 h-2"
                style={{
                  background: 'linear-gradient(90deg, #DC2626 0%, rgba(220,38,38,0.5) 70%, transparent 100%)',
                  boxShadow: `
                    0 2px 4px rgba(220,38,38,0.4),
                    0 4px 8px rgba(220,38,38,0.3),
                    0 8px 16px rgba(220,38,38,0.2)
                  `,
                  transformOrigin: 'left',
                }}
              />
            </h1>
          </div>

          {/* Subtitle with fade-in animation */}
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: letters.length * 0.03 + 0.2 }}
            className="text-base sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-red-600 font-bold mb-3 sm:mb-6 tracking-wide leading-snug text-center md:text-left"
          >
            Moving High-End Vehicles with Absolute Confidence
          </motion.h2>

          {/* Description text */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: letters.length * 0.03 + 0.4 }}
            className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-6 sm:mb-10 md:mb-12 max-w-4xl mx-auto md:mx-0 font-light leading-relaxed px-2 sm:px-0 text-center md:text-left"
          >
            From supercars to collector vehicles, we provide reliable, safe, and fully insured transportation services designed for owners who demand excellence.
          </motion.p>
        </div>
      </div>

      {/* CTA Buttons - Centered above scroll indicator */}
      <div className="absolute bottom-20 sm:bottom-32 md:bottom-36 left-0 right-0 flex items-center justify-center z-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: letters.length * 0.03 + 0.6 }}
          className="flex flex-row gap-3 md:gap-6 items-center justify-center w-full max-w-md"
        >
        {/* View Our Fleet Button */}
        <Link
          href="/models"
          className="group relative inline-block px-4 py-2.5 sm:px-10 sm:py-4 md:px-12 md:py-4 overflow-hidden rounded-lg flex-1 sm:flex-none"
        >
          {/* Button background */}
          <span className="absolute inset-0 bg-red-600 transition-transform duration-300 group-hover:scale-105" />
          
          {/* Button border */}
          <span className="absolute inset-0 rounded-lg border-2 border-red-600/50 group-hover:border-red-600 transition-all duration-300" />
          
          {/* Button text */}
          <span className="relative z-10 text-white font-bold text-xs sm:text-base uppercase tracking-wide group-hover:tracking-wider transition-all duration-300 whitespace-nowrap text-center block">
            {t('cta')}
          </span>
        </Link>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/YOUR_PHONE_NUMBER"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-block px-4 py-2.5 sm:px-10 sm:py-4 md:px-12 md:py-4 overflow-hidden rounded-lg flex-1 sm:flex-none"
        >
          {/* Button background */}
          <span className="absolute inset-0 bg-green-600 transition-transform duration-300 group-hover:scale-105" />
          
          {/* Button border */}
          <span className="absolute inset-0 rounded-lg border-2 border-green-600/50 group-hover:border-green-600 transition-all duration-300" />
          
          {/* Button content */}
          <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 text-white font-bold text-xs sm:text-base uppercase tracking-wide group-hover:tracking-wider transition-all duration-300 whitespace-nowrap">
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </span>
        </a>
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

