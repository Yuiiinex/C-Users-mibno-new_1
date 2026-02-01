'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

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

export default function VideoShowcase() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (isInView && !isPlaying) {
      // Auto-play when in view
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
      style={{ y, opacity }}
      className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Video Showcase
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience our premium vehicle transport services through stunning visuals
          </p>
        </motion.div>

        {/* Main Video Player */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Video */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={nextVideo}
                  muted={isMuted}
                  playsInline
                >
                  <source src={videos[currentVideo].src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
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
                        <button
                          onClick={isPlaying ? handlePause : handlePlay}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        <button
                          onClick={toggleMute}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <button
                          onClick={toggleFullscreen}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          <Maximize2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video Playlist */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Video Playlist</h3>
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVideoSelect(index)}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  currentVideo === index 
                    ? 'ring-4 ring-blue-500 shadow-2xl scale-105' 
                    : 'shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white font-semibold text-sm mb-1">
                      {video.title}
                    </h4>
                    <p className="text-gray-300 text-xs line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                  {currentVideo === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={prevVideo}
            className="p-4 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextVideo}
            className="p-4 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
