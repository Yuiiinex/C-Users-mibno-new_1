import { getTranslations } from 'next-intl/server';
import CarCard from '@/components/automotive/CarCard';
import { cars } from '@/lib/cars';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('models');

  return {
    title: 'Modèles - WEXPRESSCARS',
    description: t('subtitle'),
    openGraph: {
      title: 'Modèles - WEXPRESSCARS',
      description: t('subtitle'),
      type: 'website',
    },
  };
}

export default async function ModelsPage() {
  const t = await getTranslations('models');

  return (
    <div className="pt-16 sm:pt-20 min-h-screen">
      {/* Header */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-luxury-darker to-luxury-darker/95">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-luxury-darker">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-3">
            {cars.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

