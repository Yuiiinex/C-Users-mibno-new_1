"use client";

import { motion } from 'framer-motion';
import { SectionTransition, ParallaxBackground, LuxuryParticles } from './3d-transition';

interface LuxurySectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "gradient" | "dark" | "luxury" | "crystal";
  index?: number;
  showParticles?: boolean;
}

export const LuxurySection = ({ 
  children, 
  className = "", 
  background = "dark",
  index = 0,
  showParticles = false 
}: LuxurySectionProps) => {
  const backgrounds = {
    gradient: "bg-gradient-to-br from-black via-luxury-darker to-black",
    dark: "bg-luxury-darker",
    luxury: "bg-gradient-to-br from-black/90 via-luxury-gold/10 to-black/90",
    crystal: "bg-gradient-to-br from-white/5 via-black/50 to-white/5"
  };

  return (
    <SectionTransition index={index} className={`relative overflow-hidden ${backgrounds[background]} ${className}`}>
      {/* Parallax background elements */}
      <ParallaxBackground>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-gold/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl" />
      </ParallaxBackground>

      {/* Luxury particles */}
      {showParticles && <LuxuryParticles />}

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent" />
    </SectionTransition>
  );
};

// Individual card with 3D hover effect
export const LuxuryCard = ({ 
  children, 
  className = "",
  hover = true 
}: { 
  children: React.ReactNode; 
  className?: string;
  hover?: boolean;
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={hover ? {
        rotateY: 5,
        rotateX: -5,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      } : undefined}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Card shadow */}
      <motion.div
        className="absolute inset-0 bg-luxury-gold/20 blur-xl -z-10 rounded-lg"
        whileHover={hover ? {
          scale: 1.1,
          opacity: 0.3
        } : undefined}
      />
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg pointer-events-none" />
      
      {children}
    </motion.div>
  );
};

// Text reveal animation
export const RevealText = ({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
