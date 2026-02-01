'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Hero from '@/components/automotive/Hero';
import CarCard from '@/components/automotive/CarCard';
import BrandBar from '@/components/automotive/BrandBar';
import VideoShowcase from '@/components/automotive/VideoShowcase';
import { cars } from '@/lib/cars';
import { LuxurySection, LuxuryCard, RevealText } from '@/components/ui/luxury-section';

// Carousel Component
function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const navigateCarousel = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    } else {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  return (
    <section className="relative h-[46.875vh] w-full overflow-hidden bg-luxury-darker">
      <div className="relative h-full w-full">
        {/* Images */}
        <div className="absolute inset-0">
          {['c1', 'c2', 'c3', 'c4', 'c5', 'c6'].map((imageName, index) => (
            <img
              key={index}
              src={`/images/${imageName}.jpg`}
              alt={`Luxury Transport ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
    </section>
  );
}

export default function HomePage() {
  const t = useTranslations('home');
  const tContact = useTranslations('contact');

  return (
    <>
      <Hero />
      
      {/* All Cars Section */}
      <LuxurySection index={1} background="luxury">
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <RevealText delay={0.2}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {t('featured.title')}
                </h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                  {t('featured.subtitle')}
                </p>
              </div>
            </RevealText>

            <RevealText delay={0.4}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {cars.map((car, index) => (
                  <LuxuryCard key={car.id} hover={true}>
                    <CarCard car={car} index={index} />
                  </LuxuryCard>
                ))}
              </div>
            </RevealText>
          </div>
        </section>
      </LuxurySection>

      <LuxurySection index={2} background="gradient" showParticles={true}>
        <BrandBar />
      </LuxurySection>

      {/* Business Description Section */}
      <LuxurySection index={3} background="luxury">
        <section className="py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <RevealText delay={0.6}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                {/* Business Image */}
                <div className="relative rounded-xl overflow-hidden h-full">
                  <LuxuryCard hover={true}>
                    <img 
                      src="/images/description.jpg" 
                      alt="Business Description"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </LuxuryCard>
                </div>

                {/* Business Text */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    <span className="text-white">WEX</span>PRESSCARS Trusted in Luxury Transport Since 2009
                  </h2>
                  <p className="text-lg text-white/80 leading-relaxed text-justify">
                    {t('business.description') || 'At WEXPRESSCARS, we specialize in premium vehicle logistics powered by smart IT systems, ensuring high-value cars are transported safely and efficiently throughout France and the EU. With years of experience and cutting-edge tracking technology, we bring reliability and precision to every delivery.'}
                  </p>
                  
                  <RevealText delay={0.8}>
                    <div className="grid grid-cols-2 gap-6 mt-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">100%</div>
                        <div className="text-white/70">{t('business.stats.reliability') || 'Reliability'}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">24/7</div>
                        <div className="text-white/70">{t('business.stats.service') || 'Service'}</div>
                      </div>
                    </div>
                  </RevealText>
                </div>
              </div>
            </RevealText>
          </div>
        </section>
      </LuxurySection>

      {/* Contact Form Section */}
      <LuxurySection index={4} background="crystal">
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/contact.jpg" 
              alt="Contact Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-luxury-darker/70 via-luxury-darker/60 to-luxury-darker/70"></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <RevealText delay={1.0}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {tContact('title')}
                </h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                  {tContact('subtitle')}
                </p>
              </div>
            </RevealText>

            <RevealText delay={1.2}>
              <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-8">
                <form className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        {tContact('form.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-colors"
                        placeholder={tContact('form.namePlaceholder')}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        {tContact('form.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-colors"
                        placeholder={tContact('form.emailPlaceholder')}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                        {tContact('form.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-colors"
                        placeholder={tContact('form.phonePlaceholder')}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                        {tContact('form.message')}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-colors resize-none"
                        placeholder={tContact('form.messagePlaceholder')}
                        required
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        type="submit"
                        className="px-12 py-4 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors text-lg flex-1 sm:flex-none border border-white/20"
                      >
                        {tContact('form.submit')}
                      </button>
                      
                      <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors text-lg flex items-center justify-center gap-2 flex-1 sm:flex-none"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      {tContact('form.whatsapp')}
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </RevealText>
        </div>
      </section>
    </LuxurySection>

      {/* Brand Message Section */}
      <LuxurySection index={5} background="gradient">
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <RevealText delay={1.4}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('brand.title')}
              </h2>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                {t('brand.description')}
              </p>
            </RevealText>
          </div>
        </section>
      </LuxurySection>

      {/* Stunning Video Showcase */}
      <LuxurySection index={6} background="crystal" showParticles={true}>
        <VideoShowcase />
      </LuxurySection>
    </>
  );
}

