'use client';



import { useState, useRef, useEffect } from 'react';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';

import { useTranslations } from 'next-intl';

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

    thumbnail: '/images/v2.jpg'

  },

  {

    id: '2',

    title: 'Professional Service',

    description: 'Expert handling of your valuable vehicles',

    src: '/videos/professional-service.mp4',

    thumbnail: '/images/v2.jpg'

  },

  {

    id: '3',

    title: 'Global Reach',

    description: 'International vehicle delivery solutions',

    src: '/videos/global-reach.mp4',

    thumbnail: '/images/v2.jpg'

  },

  {

    id: '4',

    title: 'Secure Transport',

    description: 'Safe and secure vehicle transportation',

    src: '/videos/secure-transport.mp4',

    thumbnail: '/images/v2.jpg'

  },

  {

    id: '5',

    title: 'Executive Service',

    description: 'Premium executive vehicle transport',

    src: '/videos/executive-service.mp4',

    thumbnail: '/images/v2.jpg'

  },

  {

    id: '6',

    title: 'Express Delivery',

    description: 'Fast and reliable delivery service',

    src: '/videos/express-delivery.mp4',

    thumbnail: '/images/v2.jpg'

  },

  {

    id: '7',

    title: 'Premium Care',

    description: 'White-glove vehicle handling',

    src: '/videos/premium-care.mp4',

    thumbnail: '/images/v2.jpg'

  },

  {

    id: '8',

    title: 'VIP Transport',

    description: 'Exclusive VIP vehicle transport',

    src: '/videos/vip-transport.mp4',

    thumbnail: '/images/v2.jpg'

  },

  {

    id: '9',

    title: 'Classic Transport',

    description: 'Classic vehicle transport services',

    src: '/videos/classic-transport.mp4',

    thumbnail: '/images/v2.jpg'

  },

  {

    id: '10',

    title: 'Modern Transport',

    description: 'Modern vehicle transport solutions',

    src: '/videos/modern-transport.mp4',

    thumbnail: '/images/v2.jpg'

  },

  {

    id: '11',

    title: 'Elite Transport',

    description: 'Elite vehicle transport services',

    src: '/videos/elite-transport.mp4',

    thumbnail: '/images/v2.jpg'

  },

  {

    id: '12',

    title: 'First-Class Transport',

    description: 'First-class vehicle transport',

    src: '/videos/first-class-transport.mp4',

    thumbnail: '/images/v2.jpg'

  }

];



// Flying Paper Video Card

const FlyingVideoCard = ({ video, index, isActive, onClick }: {

  video: Video;

  index: number;

  isActive: boolean;

  onClick: () => void;

}) => {

  // Different flying animations for each card

  const getFlyingAnimation = () => {

    const animations = [

      // From top left, spinning like paper

      {

        initial: { 

          x: -2000, 

          y: -1500, 

          rotate: 720, 

          scale: 0.3,

          opacity: 0 

        },

        animate: { 

          x: 0, 

          y: 0, 

          rotate: 0, 

          scale: 1,

          opacity: 1 

        },

        transition: { 

          duration: 1.5, 

          delay: index * 0.3,

          type: "spring",

          stiffness: 50,

          damping: 20

        }

      },

      // From right, flipping

      {

        initial: { 

          x: 2000, 

          y: (index % 4) * 200 - 400, 

          rotateY: 180, 

          scale: 0.2,

          opacity: 0 

        },

        animate: { 

          x: 0, 

          y: 0, 

          rotateY: 0, 

          scale: 1,

          opacity: 1 

        },

        transition: { 

          duration: 1.8, 

          delay: index * 0.4,

          type: "spring",

          stiffness: 40,

          damping: 25

        }

      },

      // From bottom, bouncing

      {

        initial: { 

          x: (index % 3) * 300 - 300, 

          y: 2000, 

          rotate: -540, 

          scale: 0.4,

          opacity: 0 

        },

        animate: { 

          x: 0, 

          y: 0, 

          rotate: 0, 

          scale: 1,

          opacity: 1 

        },

        transition: { 

          duration: 2, 

          delay: index * 0.5,

          type: "spring",

          stiffness: 30,

          damping: 30

        }

      },

      // From top, fluttering

      {

        initial: { 

          x: (index % 5) * 240 - 480, 

          y: -1800, 

          rotate: 1080, 

          scale: 0.1,

          opacity: 0 

        },

        animate: { 

          x: 0, 

          y: 0, 

          rotate: 0, 

          scale: 1,

          opacity: 1 

        },

        transition: { 

          duration: 2.2, 

          delay: index * 0.6,

          type: "spring",

          stiffness: 35,

          damping: 22

        }

      }

    ];

    

    return animations[index % animations.length];

  };



  const flyingAnimation = getFlyingAnimation();



  return (

    <div

      className="relative"

      onClick={onClick}

    >

      <div className="relative rounded-2xl overflow-hidden cursor-pointer shadow-2xl">

        {/* Video Thumbnail */}

        <div className="relative aspect-video">

          <img

            src={video.thumbnail}

            alt={video.title}

            className="w-full h-full object-cover"

          />
          
          {/* Paper-like texture overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Floating Play Button */}

          <div className="absolute inset-0 flex items-center justify-center">

            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40 shadow-2xl">

              <Play size={28} className="text-white ml-2" />

            </div>

          </div>

        </div>

      </div>

    </div>

  );





export default function FlyingVideoShowcase() {

  const t = useTranslations('home');

  const [currentVideo, setCurrentVideo] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  

  const { scrollYProgress } = useScroll({

    target: containerRef,

    offset: ["start end", "end start"]

  });



  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

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

      {/* Flying Background Elements */}

      <div className="absolute inset-0">

        {/* Flying paper layers */}

        {[...Array(8)].map((_, i) => {

          // Use deterministic values based on index to avoid hydration errors

          const positions = [

            { left: 60, top: 95 },

            { left: 73, top: 86 },

            { left: 51, top: 67 },

            { left: 12, top: 37 },

            { left: 44, top: 58 },

            { left: 95, top: 1 },

            { left: 41, top: 70 },

            { left: 47, top: 80 }

          ];

          

          const pos = positions[i % positions.length];

          

          return (

            <motion.div

              key={i}

              className="absolute w-32 h-40 bg-gradient-to-br from-white/5 to-transparent rounded-lg shadow-2xl"

              style={{

                left: `${pos.left}%`,

                top: `${pos.top}%`

              }}

              animate={{

                opacity: [0.1, 0.3, 0.1],

                rotate: [0, 1, -1, 0],

                scale: [1, 1.1, 1],

              }}

              transition={{

                duration: 3 + i * 0.5,

                repeat: Infinity,

                ease: "easeInOut",

                delay: i * 0.2

              }}

            />

          );

        })}

        {/* Background gradient */}

        <motion.div

          className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20"

          animate={{

            rotate: [0, 360],

          }}

          transition={{

            duration: 60,

            repeat: Infinity,

            ease: "linear"

          }}

        />

      </div>

      

      {/* Main Content */}

      <div className="relative z-10 w-full py-12 pt-48">

        {/* Flying Video Grid */}

        <div className="w-full px-4 sm:px-6 lg:px-8">

          {/* Flying Video Playlist - Full Width Grid */}

          <motion.div

            initial={{ opacity: 0, x: 3000, rotateY: -180 }}

            animate={{ opacity: 1, x: 0, rotateY: 0 }}

            transition={{ duration: 2, type: "spring", stiffness: 40, delay: 0.5 }}

            className="w-full"

          >

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">

              {videos.map((video, index) => (

                <FlyingVideoCard

                  key={video.id}

                  video={video}

                  index={index}

                  isActive={currentVideo === index}

                  onClick={() => handleVideoSelect(index)}

                />

              ))}

            </div>

          </motion.div>

        </div>

      </div>

    </motion.div>

  );

}

