import { getTranslations } from 'next-intl/server';
import Hero from '@/components/automotive/Hero';
import CarCard from '@/components/automotive/CarCard';
import BrandBar from '@/components/automotive/BrandBar';
import { cars } from '@/lib/cars';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('home');

  return {
    title: 'WEXPRESSCARS - Excellence Automobile',
    description: t('brand.description'),
    openGraph: {
      title: 'WEXPRESSCARS - Excellence Automobile',
      description: t('brand.description'),
      type: 'website',
    },
  };
}

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <>
      <Hero />
      
      {/* All Cars Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-luxury-darker">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('featured.title')}
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {t('featured.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {cars.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        </div>
      </section>

            <BrandBar />

      {/* Brand Message Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-luxury-darker to-luxury-darker/95">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('brand.title')}
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            {t('brand.description')}
          </p>
        </div>
      </section>
    </>
  );
}

