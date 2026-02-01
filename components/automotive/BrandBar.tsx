'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FlyingVideoShowcase from './FlyingVideoShowcase';

export default function BrandBar() {
  const brandBarRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // --- Logo Click Handler ---
  const handleLogoClick = (brandNumber: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent drag
    console.log(`Brand ${brandNumber} clicked`);
  };

  useEffect(() => {
    const brandBar = brandBarRef.current;
    const firstSet = firstSetRef.current;
    if (!brandBar || !firstSet) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let animationId: number;

    const autoScroll = () => {
      if (!isPaused && !isDown) {
        brandBar.scrollLeft += 1; // Increased from 0.5 to 1 for faster scrolling

        const firstWidth = firstSet.scrollWidth;
        if (brandBar.scrollLeft >= firstWidth) {
          brandBar.scrollLeft -= firstWidth;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    // Start auto-scroll after a small delay to ensure everything is loaded
    const startTimeout = setTimeout(() => {
      autoScroll();
    }, 100);

    // --- Drag handlers ---
    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      setIsPaused(true);
      startX = e.pageX - brandBar.offsetLeft;
      scrollLeft = brandBar.scrollLeft;
      brandBar.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      isDown = false;
      setIsPaused(false);
      brandBar.style.cursor = 'pointer';
    };

    const handleMouseLeave = () => {
      isDown = false;
      setIsPaused(false);
      brandBar.style.cursor = 'pointer';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - brandBar.offsetLeft;
      const walk = (x - startX) * 2;
      brandBar.scrollLeft = scrollLeft - walk;
    };

    brandBar.addEventListener('mousedown', handleMouseDown);
    brandBar.addEventListener('mouseup', handleMouseUp);
    brandBar.addEventListener('mouseleave', handleMouseLeave);
    brandBar.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationId);
      brandBar.removeEventListener('mousedown', handleMouseDown);
      brandBar.removeEventListener('mouseup', handleMouseUp);
      brandBar.removeEventListener('mouseleave', handleMouseLeave);
      brandBar.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPaused]);

  return (
    <section className="relative bg-gray-800 border-y border-white/10 overflow-hidden">
      {/* Flying Video Showcase Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="transform scale-75 origin-center">
          <FlyingVideoShowcase />
        </div>
      </div>
      
      {/* Brand Logos Overlay */}
      <div className="relative z-10 h-28 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto h-full flex items-center">
          <div
            ref={brandBarRef}
            dir="ltr"  // 🔥 THIS IS THE RTL FIX
            className="flex items-center overflow-x-auto cursor-pointer w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            <div className="flex space-x-4 px-8">
              {/* First set */}
              <div ref={firstSetRef} className="flex space-x-4">
                {[...Array(11)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-24 h-24 rounded overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
                    onClick={(e) => handleLogoClick(i + 1, e)}
                    initial={{ opacity: 0, scale: 0, rotate: i * 30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ 
                      scale: 1.1,
                      rotateZ: 5,
                      z: 50
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      rotateZ: -5
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: 1000,
                    }}
                  >
                    <img
                      src={`/images/Brand${i + 1}.png`}
                      alt={`Brand ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Duplicate set */}
              <div className="flex space-x-4">
                {[...Array(11)].map((_, i) => (
                  <motion.div
                    key={i + 11}
                    className="w-24 h-24 rounded overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
                    onClick={(e) => handleLogoClick(i + 1, e)}
                    initial={{ opacity: 0, scale: 0, rotate: (i + 11) * 30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: (i + 11) * 0.1 }}
                    whileHover={{ 
                      scale: 1.1,
                      rotateZ: 5,
                      z: 50
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      rotateZ: -5
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: 1000,
                    }}
                  >
                    <img
                      src={`/images/Brand${i + 1}.png`}
                      alt={`Brand ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
