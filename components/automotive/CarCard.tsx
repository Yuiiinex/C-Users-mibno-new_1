'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Car } from '@/lib/cars';
import { useTranslations } from 'next-intl';

interface CarCardProps {
  car: Car;
  index?: number;
}

export default function CarCard({ car, index = 0 }: CarCardProps) {
  const t = useTranslations('models.specs');
  const tModels = useTranslations('models');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg bg-luxury-darker border border-white/10 hover:border-luxury-gold/50 transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-darker via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6">
        <div className="mb-2">
          <h3 className="text-2xl font-bold text-white mb-1">{car.name}</h3>
          <p className="text-luxury-gold text-sm font-medium">{car.model}</p>
        </div>

        <p className="text-white/70 text-sm mb-4 line-clamp-2">{car.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t('power')}</p>
            <p className="text-white font-semibold">{car.specs.power}</p>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t('topSpeed')}</p>
            <p className="text-white font-semibold">{car.specs.topSpeed}</p>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t('acceleration')}</p>
            <p className="text-white font-semibold">{car.specs.acceleration}</p>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t('engine')}</p>
            <p className="text-white font-semibold text-xs">{car.specs.engine}</p>
          </div>
        </div>

        <Link
          href={`/models/${car.id}`}
          className="inline-flex items-center text-luxury-gold hover:text-white group-hover:translate-x-2 transition-all duration-300 text-sm font-medium uppercase tracking-wider"
        >
          {tModels('viewDetails')}
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

