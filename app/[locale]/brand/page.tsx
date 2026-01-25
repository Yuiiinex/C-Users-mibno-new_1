import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('brand');

  return {
    title: 'Marque - AutoLuxe',
    description: t('subtitle'),
    openGraph: {
      title: 'Marque - AutoLuxe',
      description: t('subtitle'),
      type: 'website',
    },
  };
}

export default async function BrandPage() {
  const t = await getTranslations('brand');

  const sections = [
    {
      key: 'heritage',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=800&fit=crop',
    },
    {
      key: 'innovation',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=800&fit=crop',
    },
    {
      key: 'craftsmanship',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8b0e2f1?w=1200&h=800&fit=crop',
    },
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-luxury-darker to-luxury-darker/95">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-luxury-darker">
        <div className="max-w-7xl mx-auto space-y-24">
          {sections.map((section, index) => (
            <div
              key={section.key}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-row-dense' : ''
              }`}
            >
              <div
                className={`relative h-96 lg:h-[500px] rounded-lg overflow-hidden ${
                  index % 2 === 1 ? 'lg:col-start-2' : ''
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${section.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-darker/80 to-transparent" />
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <h2 className="text-4xl font-bold text-white mb-6">
                  {t(`sections.${section.key}.title`)}
                </h2>
                <p className="text-lg text-white/80 leading-relaxed">
                  {t(`sections.${section.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

