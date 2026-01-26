'use client';

import { useRef, useEffect, useState } from 'react';

export default function BrandBar() {
  const brandBarRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // --- Logo Click Handler ---
  const handleLogoClick = (brandNumber: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent bar drag
    console.log(`Brand ${brandNumber} clicked`);
    // You can add functionality here like:
    // - Navigate to brand page
    // - Show brand details
    // - Filter cars by brand
    // - Open brand modal
  };

  useEffect(() => {
    const brandBar = brandBarRef.current;
    const firstSet = firstSetRef.current;
    if (!brandBar || !firstSet) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let hasDragged = false; // Track if user has dragged
    let animationId: number;

    const autoScroll = () => {
      if (!isPaused && !isDown) {
        brandBar.scrollLeft += 0.5;

        const firstWidth = firstSet.scrollWidth; // exact width of first set
        if (brandBar.scrollLeft >= firstWidth) {
          brandBar.scrollLeft -= firstWidth; // smooth reset
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    autoScroll();

    // --- Dragging Handlers ---
    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      hasDragged = false; // Reset drag tracking
      setIsPaused(true);
      brandBar.style.cursor = 'grabbing';
      startX = e.pageX - brandBar.offsetLeft;
      scrollLeft = brandBar.scrollLeft;
    };
    const handleMouseLeave = () => { isDown = false; setIsPaused(false); brandBar.style.cursor = 'pointer'; };
    const handleMouseUp = () => { isDown = false; setIsPaused(false); brandBar.style.cursor = 'pointer'; };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      hasDragged = true; // Mark as dragged
      const x = e.pageX - brandBar.offsetLeft;
      const walk = (x - startX) * 2;
      brandBar.scrollLeft = scrollLeft - walk;
    };
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeaveContainer = () => setIsPaused(false);

    brandBar.addEventListener('mousedown', handleMouseDown);
    brandBar.addEventListener('mouseleave', handleMouseLeave);
    brandBar.addEventListener('mouseup', handleMouseUp);
    brandBar.addEventListener('mousemove', handleMouseMove);
    brandBar.addEventListener('mouseenter', handleMouseEnter);
    brandBar.parentElement?.addEventListener('mouseleave', handleMouseLeaveContainer);

    return () => {
      cancelAnimationFrame(animationId);
      brandBar.removeEventListener('mousedown', handleMouseDown);
      brandBar.removeEventListener('mouseleave', handleMouseLeave);
      brandBar.removeEventListener('mouseup', handleMouseUp);
      brandBar.removeEventListener('mousemove', handleMouseMove);
      brandBar.removeEventListener('mouseenter', handleMouseEnter);
      brandBar.parentElement?.removeEventListener('mouseleave', handleMouseLeaveContainer);
    };
  }, [isPaused]);

  return (
    <section className="h-28 px-4 sm:px-6 lg:px-8 bg-gray-800 border-y border-white/10">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-center">
        <div
          ref={brandBarRef}
          className="flex items-center overflow-x-auto cursor-pointer"
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
                  className={`w-24 h-24 rounded overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity ${i === 0 ? 'hidden sm:block' : ''}`}
                  onClick={(e) => handleLogoClick(i + 1, e)}
                >
                  <img src={`/images/brand${i + 1}.png`} alt={`Brand ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            {/* Duplicate set */}
            <div className="flex space-x-4">
              {[...Array(11)].map((_, i) => (
                <div
                  key={i + 11}
                  className={`w-24 h-24 rounded overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity ${i === 0 ? 'hidden sm:block' : ''}`}
                  onClick={(e) => handleLogoClick(i + 1, e)}
                >
                  <img src={`/images/brand${i + 1}.png`} alt={`Brand ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
