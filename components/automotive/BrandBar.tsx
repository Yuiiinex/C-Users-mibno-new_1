'use client';

import { useRef, useEffect, useState } from 'react';

export default function BrandBar() {
  const brandBarRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('right');

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
    let scrollLeftPos = 0;
    let animationId: number;
    let directionState = scrollDirection;

    const autoScroll = () => {
      if (!isPaused && !isDown) {
        const firstWidth = firstSet.scrollWidth;
        const maxScroll = firstWidth - 100; // Buffer before edge
        
        // Scroll in current direction
        if (directionState === 'right') {
          brandBar.scrollLeft += 1;
          // When reaching the end, switch to left
          if (brandBar.scrollLeft >= maxScroll) {
            directionState = 'left';
            setScrollDirection('left');
          }
        } else {
          brandBar.scrollLeft -= 1;
          // When reaching the start, switch to right
          if (brandBar.scrollLeft <= 10) {
            directionState = 'right';
            setScrollDirection('right');
          }
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
      scrollLeftPos = brandBar.scrollLeft;
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
      brandBar.scrollLeft = scrollLeftPos - walk;
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
  }, [isPaused, scrollDirection]);

  return (
    <section className="h-12 sm:h-14 md:h-16 bg-gray-800 border-y border-white/10">
      <div className="w-full h-full flex items-center">
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

          <div className="flex space-x-1.5 sm:space-x-2 md:space-x-3 px-3 sm:px-4 md:px-6">
            {/* First set */}
            <div ref={firstSetRef} className="flex space-x-1.5 sm:space-x-2 md:space-x-3">
              {[...Array(11)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
                  onClick={(e) => handleLogoClick(i + 1, e)}
                >
                  <img
                    src={`/images/Brand${i + 1}.png`}
                    alt={`Brand ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Duplicate set 2 */}
            <div className="flex space-x-1.5 sm:space-x-2 md:space-x-3">
              {[...Array(11)].map((_, i) => (
                <div
                  key={i + 11}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
                  onClick={(e) => handleLogoClick(i + 1, e)}
                >
                  <img
                    src={`/images/Brand${i + 1}.png`}
                    alt={`Brand ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Duplicate set 3 - for large screens */}
            <div className="flex space-x-1.5 sm:space-x-2 md:space-x-3">
              {[...Array(11)].map((_, i) => (
                <div
                  key={i + 22}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
                  onClick={(e) => handleLogoClick(i + 1, e)}
                >
                  <img
                    src={`/images/Brand${i + 1}.png`}
                    alt={`Brand ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Duplicate set 4 - for ultra-wide screens */}
            <div className="flex space-x-1.5 sm:space-x-2 md:space-x-3">
              {[...Array(11)].map((_, i) => (
                <div
                  key={i + 33}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
                  onClick={(e) => handleLogoClick(i + 1, e)}
                >
                  <img
                    src={`/images/Brand${i + 1}.png`}
                    alt={`Brand ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
