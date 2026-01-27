'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Car } from '@/lib/cars';

interface CarCardProps {
  car: Car;
  index?: number;
}

export default function CarCard({ car, index = 0 }: CarCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVideoClose = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`group relative overflow-hidden rounded bg-luxury-darker border border-white/10 hover:border-luxury-gold/50 transition-all duration-300 ${
          isPlaying ? 'backdrop-blur-md' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-[28rem] overflow-hidden">
          {/* Image */}
          <div className="relative w-full h-full">
            <Image
              src={isHovered && car.hoverImage ? car.hoverImage : car.image}
              alt={car.name}
              fill
              className="object-cover group-hover:scale-110 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-darker via-transparent to-transparent opacity-60 transition-opacity duration-300" />

          {/* Play Button - Bottom Left */}
          <button
            onClick={handlePlayClick}
            className="absolute bottom-4 left-4 group"
            aria-label="Play video"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded flex items-center justify-center transition-all duration-300 bg-luxury-gold/80 hover:bg-luxury-gold"
            >
              <svg className="w-4 h-4 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </button>
        </div>
      </motion.div>

      {/* Video Modal */}
      {isPlaying && car.video && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={handleVideoClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="w-full h-auto rounded-lg shadow-2xl"
              autoPlay
              controls
              playsInline
            >
              <source src={car.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Close Button */}
            <button
              onClick={handleVideoClose}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Close video"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
