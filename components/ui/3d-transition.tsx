"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export const SectionTransition = ({ children, className = "", index = 0 }: SectionTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // 3D Transform values
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Spring physics for smooth luxury feel
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 });
  const smoothRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        scale: smoothScale,
        opacity,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {/* 3D Shadow effect */}
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]),
        }}
        className="absolute inset-0 bg-gradient-to-b from-luxury-gold/20 to-transparent blur-3xl -z-10"
      />
      
      {/* Luxury light rays */}
      <motion.div
        style={{
          rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 0.5, 0]),
        }}
        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-luxury-gold to-transparent"
      />
      
      {children}
    </motion.div>
  );
};

// Parallax background component for depth
export const ParallaxBackground = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Floating particles for luxury ambiance
export const LuxuryParticles = ({ count = 20 }: { count?: number }) => {
  // Generate deterministic positions based on index to avoid hydration mismatch
  const generatePosition = (index: number, max: number) => {
    const seed = index * 9301 + 49297; // Prime numbers for better distribution
    return ((seed * 9301 + 49297) % max) / max;
  };

  const particles = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${generatePosition(i, 100) * 100}%`,
            top: `${generatePosition(i + 100, 100) * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, (generatePosition(i, 50) - 0.5) * 50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 10 + (i % 5) * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};
