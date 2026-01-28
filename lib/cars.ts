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
    image: '/images/image_hero.jpg',
    hoverImage: '/images/description.jpg',
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
    image: '/images/description.jpg',
    hoverImage: '/images/IMG-20260125-WA0007.jpg',
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
    image: '/images/IMG-20260125-WA0007.jpg',
    hoverImage: '/images/v1.jpg',
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
    image: '/images/v1.jpg',
    hoverImage: '/images/v2.jpg',
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
    image: '/images/v2.jpg',
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
    image: '/images/v3.jpg',
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
    image: '/images/c1.jpg',
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
    image: '/images/c2.jpg',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    specs: {
      power: '550 CV',
      topSpeed: '280 km/h',
      acceleration: '4.0s',
      engine: 'V6 Biturbo',
    },
  },
];

