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

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded bg-luxury-darker border border-white/10 hover:border-luxury-gold/50 transition-all duration-300 ${
        isPlaying ? 'backdrop-blur-md' : ''
      }`}
    >
      <div className="relative h-[28rem] overflow-hidden">
        {/* Image or Video */}
        {!isPlaying ? (
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={car.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-luxury-darker via-transparent to-transparent transition-opacity duration-300 ${
          isPlaying ? 'opacity-30' : 'opacity-60'
        }`} />

        {/* Play Button - Bottom Left */}
        <button
          onClick={handlePlayClick}
          className="absolute bottom-4 left-4 group"
          aria-label={isPlaying ? 'Stop video' : 'Play video'}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 rounded flex items-center justify-center transition-all duration-300 ${
              isPlaying 
                ? 'bg-red-600/80 hover:bg-red-600' 
                : 'bg-luxury-gold/80 hover:bg-luxury-gold'
            }`}
          >
            {isPlaying ? (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
}
