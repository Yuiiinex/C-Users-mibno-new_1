'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', phone: '', message: '' });

    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-luxury-darker to-luxury-darker/95">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/pagecontact.jpg" 
            alt="Contact Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white/90 text-sm font-medium mb-2">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-luxury-gold transition-colors"
                    placeholder={t('form.name')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2">
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-luxury-gold transition-colors"
                    placeholder={t('form.email')}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white/90 text-sm font-medium mb-2">
                    {t('form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-luxury-gold transition-colors"
                    placeholder={t('form.phone')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white/90 text-sm font-medium mb-2">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-luxury-gold transition-colors resize-none"
                    placeholder={t('form.message')}
                  />
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400"
                  >
                    {t('form.success')}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-luxury-gold text-luxury-darker font-bold uppercase tracking-wider hover:bg-luxury-gold/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('form.sending') : t('form.submit')}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Informations de contact</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-luxury-gold font-semibold mb-2 uppercase tracking-wider text-sm">
                    {t('info.address')}
                  </h3>
                  <p className="text-white/90">
                    123 Avenue de l'Excellence<br />
                    Casablanca 20000<br />
                    Maroc
                  </p>
                </div>

                <div>
                  <h3 className="text-luxury-gold font-semibold mb-2 uppercase tracking-wider text-sm">
                    {t('info.phone')}
                  </h3>
                  <p className="text-white/90">+212 522 123 456</p>
                </div>

                <div>
                  <h3 className="text-luxury-gold font-semibold mb-2 uppercase tracking-wider text-sm">
                    {t('info.email')}
                  </h3>
                  <p className="text-white/90">contact@WEXPRESSCARS.ma</p>
                </div>

                <div>
                  <h3 className="text-luxury-gold font-semibold mb-2 uppercase tracking-wider text-sm">
                    {t('info.hours')}
                  </h3>
                  <p className="text-white/90">
                    Lundi - Vendredi: 9h00 - 18h00<br />
                    Samedi: 10h00 - 16h00<br />
                    Dimanche: Fermé
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

