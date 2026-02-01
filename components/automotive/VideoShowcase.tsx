'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCw, Zap } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  src: string;
  thumbnail: string;
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Luxury Transport',
    description: 'Experience premium vehicle transport services',
    src: '/videos/luxury-transport.mp4',
    thumbnail: '/images/c1.jpg'
  },
  {
    id: '2',
    title: 'Professional Service',
    description: 'Expert handling of your valuable vehicles',
    src: '/videos/professional-service.mp4',
    thumbnail: '/images/c2.jpg'
  },
  {
    id: '3',
    title: 'Global Reach',
    description: 'International vehicle delivery solutions',
    src: '/videos/global-reach.mp4',
    thumbnail: '/images/c3.jpg'
  },
  {
    id: '4',
    title: 'Secure Transport',
    description: 'Safe and secure vehicle transportation',
    src: '/videos/secure-transport.mp4',
    thumbnail: '/images/c4.jpg'
  }
];

// 3D Card Component
const VideoCard3D = ({ video, index, isActive, onClick, isHovered }: {
  video: Video;
  index: number;
  isActive: boolean;
  onClick: () => void;
  isHovered: boolean;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, rotateY: -180, z: -100 }}
      animate={{ 
        opacity: 1, 
        rotateY: 0, 
        z: isActive ? 50 : 0,
        scale: isActive ? 1.05 : 1
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      whileHover={{ 
        scale: 1.08,
        rotateY: 5,
        z: 30
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: mousePosition.y * 15,
          rotateY: mousePosition.x * 15,
          translateZ: isHovered ? 30 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main Video Thumbnail */}
        <div className="relative aspect-video">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          
          {/* 3D Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* 3D Glass Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"
            animate={{
              opacity: isHovered ? 0.3 : 0.1
            }}
            style={{
              backdropFilter: 'blur(10px)',
              transform: 'translateZ(20px)'
            }}
          />
          
          {/* Floating Play Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: isHovered ? 1 : 0.8,
              rotate: 0
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40">
              <Play size={24} className="text-white ml-1" />
            </div>
          </motion.div>
          
          {/* Video Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform-gpu">
            <motion.h4
              className="text-white font-bold text-lg mb-1"
              animate={{
                translateZ: isActive ? 30 : 10
              }}
            >
              {video.title}
            </motion.h4>
            <motion.p
              className="text-gray-300 text-sm"
              animate={{
                translateZ: isActive ? 20 : 5
              }}
            >
              {video.description}
            </motion.p>
          </div>
          
          {/* Active Indicator */}
          {isActive && (
            <motion.div
              className="absolute top-4 right-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/50" />
            </motion.div>
          )}
          
          {/* 3D Border Glow */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
                backgroundSize: '400% 400%',
                filter: 'blur(2px)',
                transform: 'translateZ(-10px)'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function VideoShowcase() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (isInView && !isPlaying) {
      handlePlay();
    }
  }, [isInView]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoSelect = (index: number) => {
    setCurrentVideo(index);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen && videoRef.current) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const nextVideo = () => {
    handleVideoSelect((currentVideo + 1) % videos.length);
  };

  const prevVideo = () => {
    handleVideoSelect((currentVideo - 1 + videos.length) % videos.length);
  };

  return (
    <motion.div 
      ref={containerRef}
      style={{ 
        y, 
        rotateX, 
        rotateY, 
        scale, 
        opacity,
        transformStyle: 'preserve-3d',
        perspective: 2000
      }}
      className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
    >
      {/* 3D Background Layers */}
      <div className="absolute inset-0">
        {/* Layer 1: Farthest */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            transform: 'translateZ(-200px) scale(1.2)'
          }}
        />
        
        {/* Layer 2: Middle */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-indigo-900/20 to-violet-900/20"
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            transform: 'translateZ(-100px) scale(1.1)'
          }}
        />
        
        {/* Layer 3: Closest */}
        <div 
          className="absolute inset-0 bg-black/40" 
          style={{
            transform: 'translateZ(-50px)'
          }}
        />
      </div>
      
      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 100 - 50, 0],
              z: [0, 100, 0],
              rotateX: [0, 360, 0],
              rotateY: [0, 360, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 25,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* 3D Title */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: -45, z: -200 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="text-center mb-16"
          style={{
            transformStyle: 'preserve-3d'
          }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{
              transform: 'translateZ(50px)'
            }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              3D Video Showcase
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            style={{
              transform: 'translateZ(30px)'
            }}
          >
            Experience our premium services with mind-blowing 3D effects
          </motion.p>
        </motion.div>

        {/* 3D Video Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main 3D Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -45, z: -150 }}
            animate={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 80 }}
            className="lg:col-span-2"
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-black"
              whileHover={{
                rotateY: 5,
                rotateX: -5,
                scale: 1.02,
                z: 50
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: 1000
              }}
            >
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={nextVideo}
                  muted={isMuted}
                  playsInline
                  style={{
                    transform: 'translateZ(20px)'
                  }}
                >
                  <source src={videos[currentVideo].src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* 3D Video Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    transform: 'translateZ(30px)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {videos[currentVideo].title}
                        </h3>
                        <p className="text-gray-300">
                          {videos[currentVideo].description}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <motion.button
                          onClick={isPlaying ? handlePause : handlePlay}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.5 }}
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </motion.button>
                        <motion.button
                          onClick={toggleMute}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                          whileHover={{ rotate: 180, scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </motion.button>
                        <motion.button
                          onClick={toggleFullscreen}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                          whileHover={{ rotate: 45, scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Maximize2 size={20} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* 3D Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
                    backgroundSize: '400% 400%',
                    filter: 'blur(3px)',
                    transform: 'translateZ(-10px)'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Video Playlist */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 45, z: -150 }}
            animate={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 80, delay: 0.2 }}
            className="space-y-6"
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            <motion.h3 
              className="text-3xl font-bold text-white mb-6"
              initial={{ rotateY: -90 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              style={{
                transform: 'translateZ(40px)'
              }}
            >
              Video Playlist
            </motion.h3>
            
            {videos.map((video, index) => (
              <VideoCard3D
                key={video.id}
                video={video}
                index={index}
                isActive={currentVideo === index}
                onClick={() => handleVideoSelect(index)}
                isHovered={hoveredVideo === index}
              />
            ))}
          </motion.div>
        </div>

        {/* 3D Navigation Controls */}
        <motion.div
          className="flex justify-center mt-12 gap-6"
          initial={{ opacity: 0, y: 50, z: -100 }}
          animate={{ opacity: 1, y: 0, z: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            transformStyle: 'preserve-3d'
          }}
        >
          <motion.button
            onClick={prevVideo}
            className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 border border-white/20"
            whileHover={{ 
              scale: 1.2, 
              rotateY: 180,
              z: 20
            }}
            whileTap={{ scale: 0.9 }}
            style={{
              transform: 'translateZ(10px)'
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={nextVideo}
            className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full text-white hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 border border-white/20"
            whileHover={{ 
              scale: 1.2, 
              rotateY: 180,
              z: 20
            }}
            whileTap={{ scale: 0.9 }}
            style={{
              transform: 'translateZ(10px)'
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
