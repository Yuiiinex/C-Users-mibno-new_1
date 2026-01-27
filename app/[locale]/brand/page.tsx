import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('brand');

  return {
    title: 'Marque - WEXPRESSCARS',
    description: t('subtitle'),
    openGraph: {
      title: 'Marque - WEXPRESSCARS',
      description: t('subtitle'),
      type: 'website',
    },
  };
}

export default async function BrandPage() {
  const t = await getTranslations('brand');

  const vehicleImages = [
    {
      key: 'exterior',
      image: '/images/v1.jpg',
      caption: 'algema.exteriorCaption'
    },
    {
      key: 'interior',
      image: '/images/v2.jpg', 
      caption: 'algema.interiorCaption'
    },
    {
      key: 'operation',
      image: '/images/v3.jpg',
      caption: 'algema.operationCaption'
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Header with Background Image */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/brand11.jpg" 
            alt="Brand Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto text-center relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-center">{t('title')}</h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed text-justify text-center">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Vehicle Images */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-luxury-darker">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicleImages.map((image, index) => (
              <div key={image.key} className="group relative">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <img
                    src={image.image}
                    alt={t(`algema.${image.key}Alt`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-darker/80 to-transparent" />
                </div>
                <p className="mt-4 text-center text-white/70 italic">
                  {t(image.caption)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-luxury-darker/95">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">
              {t('algema.descriptionTitle')}
            </h2>
            <div className="space-y-6">
              <div className="bg-luxury-darker/50 rounded-lg p-6 border border-white/5">
                <p className="text-lg text-white/80 leading-relaxed text-justify">
                  {t('algema.description1')}
                </p>
              </div>
              <div className="bg-luxury-darker/50 rounded-lg p-6 border border-white/5">
                <p className="text-lg text-white/80 leading-relaxed text-justify">
                  {t('algema.description2')}
                </p>
              </div>
              <div className="bg-luxury-darker/50 rounded-lg p-6 border border-white/5">
                <p className="text-lg text-white/80 leading-relaxed text-justify">
                  {t('algema.description3')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-luxury-darker">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              {t('algema.whyChooseTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-luxury-darker/50 rounded-lg p-6 border border-white/5 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{t('algema.safety.title')}</h3>
                <p className="text-white/70 text-justify">{t('algema.safety.description')}</p>
              </div>
              <div className="bg-luxury-darker/50 rounded-lg p-6 border border-white/5 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{t('algema.enclosed.title')}</h3>
                <p className="text-white/70 text-justify">{t('algema.enclosed.description')}</p>
              </div>
              <div className="bg-luxury-darker/50 rounded-lg p-6 border border-white/5 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{t('algema.logistics.title')}</h3>
                <p className="text-white/70 text-justify">{t('algema.logistics.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Contact Image */}
      <section className="relative w-screen left-1/2 -translate-x-1/2 h-[50rem] overflow-hidden">
        <img 
          src="/images/contact.jpg" 
          alt="Contact Background"
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>
      </section>

      {/* Specifications */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-luxury-darker/95">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              {t('algema.specifications.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-luxury-darker/50 rounded-lg p-6 border border-white/5">
                <h3 className="text-xl font-semibold text-luxury-gold mb-4">{t('algema.specifications.technical.title')}</h3>
                <ul className="space-y-2 text-white/80 text-justify">
                  <li>{t('algema.specifications.technical.capacity')}</li>
                  <li>{t('algema.specifications.technical.length')}</li>
                  <li>{t('algema.specifications.technical.height')}</li>
                  <li>{t('algema.specifications.technical.weight')}</li>
                </ul>
              </div>
              <div className="bg-luxury-darker/50 rounded-lg p-6 border border-white/5">
                <h3 className="text-xl font-semibold text-luxury-gold mb-4">{t('algema.specifications.features.title')}</h3>
                <ul className="space-y-2 text-white/80 text-justify">
                  <li>{t('algema.specifications.features.climate')}</li>
                  <li>{t('algema.specifications.features.security')}</li>
                  <li>{t('algema.specifications.features.tracking')}</li>
                  <li>{t('algema.specifications.features.insurance')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

