export interface Car {
  id: string;
  name: string;
  model: string;
  description: string;
  image: string;
  hoverImage?: string;
  video?: string;
  specs: {
    power: string;
    topSpeed: string;
    acceleration: string;
    engine: string;
  };
  featured?: boolean;
}

export const cars: Car[] = [
  {
    id: '1',
    name: 'GT Elite',
    model: '2024',
    description: 'Performance pure et design intemporel. Une symphonie de puissance et d\'élégance.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&h=800&fit=crop',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    specs: {
      power: '650 CV',
      topSpeed: '320 km/h',
      acceleration: '3.2s',
      engine: 'V8 Biturbo',
    },
    featured: true,
  },
  {
    id: '2',
    name: 'Sport Pro',
    model: '2024',
    description: 'L\'agilité d\'une sportive avec le confort d\'une berline de luxe.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=800&fit=crop',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    specs: {
      power: '720 CV',
      topSpeed: '340 km/h',
      acceleration: '2.9s',
      engine: 'V8 Biturbo',
    },
    featured: true,
  },
  {
    id: '3',
    name: 'Racing Edition',
    model: '2024',
    description: 'Conçue pour la piste, perfectionnée pour la route. L\'essence même de la performance.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8b0e2f1?w=1200&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c6f88f?w=1200&h=800&fit=crop',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    specs: {
      power: '850 CV',
      topSpeed: '380 km/h',
      acceleration: '2.5s',
      engine: 'V12 Biturbo',
    },
    featured: true,
  },
  {
    id: '4',
    name: 'Luxury Grand',
    model: '2024',
    description: 'Opulence et performance réunies. Le summum du raffinement automobile.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1606664515524-edf22d0b3c95?w=1200&h=800&fit=crop',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    specs: {
      power: '600 CV',
      topSpeed: '300 km/h',
      acceleration: '3.5s',
      engine: 'V8 Biturbo',
    },
  },
  {
    id: '5',
    name: 'Coupe Sport',
    model: '2024',
    description: 'Élégance aérodynamique et puissance brute. Une déclaration de style.',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&h=800&fit=crop',
    specs: {
      power: '680 CV',
      topSpeed: '330 km/h',
      acceleration: '3.1s',
      engine: 'V8 Biturbo',
    },
  },
  {
    id: '6',
    name: 'Hyper GT',
    model: '2024',
    description: 'L\'avenir de la performance. Technologie de pointe et design révolutionnaire.',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    specs: {
      power: '950 CV',
      topSpeed: '400 km/h',
      acceleration: '2.2s',
      engine: 'V12 Hybrid',
    },
  },
  {
    id: '7',
    name: 'Electric Storm',
    model: '2024',
    description: 'Puissance électrique silencieuse avec accélération instantanée.',
    image: 'https://images.unsplash.com/photo-1617654112368-30e935884c57?w=1200&h=800&fit=crop',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    specs: {
      power: '800 CV',
      topSpeed: '350 km/h',
      acceleration: '2.0s',
      engine: 'Électrique',
    },
  },
  {
    id: '8',
    name: 'Classic Heritage',
    model: '2024',
    description: 'Design intemporel rencontre performance moderne.',
    image: 'https://images.unsplash.com/photo-1553440719-a8e5c21ab612?w=1200&h=800&fit=crop',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    specs: {
      power: '550 CV',
      topSpeed: '280 km/h',
      acceleration: '4.0s',
      engine: 'V6 Biturbo',
    },
  },
];

