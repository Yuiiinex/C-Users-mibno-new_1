'use client';

import { useRef, useEffect, useState } from 'react';

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
    <section className="h-28 bg-gray-800 border-y border-white/10">
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
                <div
                  key={i}
                  className="w-24 h-24 rounded overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
                  onClick={(e) => handleLogoClick(i + 1, e)}
                >
                  <img
                    src={`/images/brand${i + 1}.png`}
                    alt={`Brand ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Duplicate set */}
            <div className="flex space-x-4">
              {[...Array(11)].map((_, i) => (
                <div
                  key={i + 11}
                  className="w-24 h-24 rounded overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
                  onClick={(e) => handleLogoClick(i + 1, e)}
                >
                  <img
                    src={`/images/brand${i + 1}.png`}
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
