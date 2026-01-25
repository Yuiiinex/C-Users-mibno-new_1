import { notFound } from 'next/navigation';
import Image from 'next/image';
import { cars } from '@/lib/cars';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const car = cars.find((c) => c.id === id);
  
  if (!car) {
    return {
      title: 'Modèle non trouvé - AutoLuxe',
    };
  }

  return {
    title: `${car.name} ${car.model} - AutoLuxe`,
    description: car.description,
    openGraph: {
      title: `${car.name} ${car.model}`,
      description: car.description,
      images: [car.image],
    },
  };
}

export default async function CarDetailPage({ params }: PageProps) {
  const { id } = await params;
  const car = cars.find((c) => c.id === id);
  const t = await getTranslations('models.specs');

  if (!car) {
    notFound();
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-darker via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{car.name}</h1>
          <p className="text-xl md:text-2xl text-luxury-gold">{car.model}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-luxury-darker">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Description */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Présentation</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-8">{car.description}</p>
              <p className="text-white/70 leading-relaxed">
                Chaque détail de ce modèle a été conçu avec une attention méticuleuse à la perfection.
                De la courbe aérodynamique à la finition intérieure, l'excellence se manifeste dans
                chaque aspect de ce véhicule d'exception.
              </p>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Spécifications</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-luxury-gold pl-6">
                  <p className="text-white/40 text-sm uppercase tracking-wider mb-2">{t('power')}</p>
                  <p className="text-2xl font-bold text-white">{car.specs.power}</p>
                </div>
                <div className="border-l-4 border-luxury-gold pl-6">
                  <p className="text-white/40 text-sm uppercase tracking-wider mb-2">{t('topSpeed')}</p>
                  <p className="text-2xl font-bold text-white">{car.specs.topSpeed}</p>
                </div>
                <div className="border-l-4 border-luxury-gold pl-6">
                  <p className="text-white/40 text-sm uppercase tracking-wider mb-2">{t('acceleration')}</p>
                  <p className="text-2xl font-bold text-white">{car.specs.acceleration}</p>
                </div>
                <div className="border-l-4 border-luxury-gold pl-6">
                  <p className="text-white/40 text-sm uppercase tracking-wider mb-2">{t('engine')}</p>
                  <p className="text-2xl font-bold text-white">{car.specs.engine}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

