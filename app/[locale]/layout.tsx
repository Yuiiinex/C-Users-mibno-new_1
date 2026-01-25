import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import Navbar from '@/components/automotive/Navbar';
import Footer from '@/components/automotive/Footer';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'AutoLuxe - Excellence Automobile',
  description: 'Découvrez l\'art de la performance automobile',
  metadataBase: new URL('https://autoluxe.ma'),
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  // Support all Arabic language variants for RTL
  const isRTL = locale.startsWith('ar');

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className={inter.variable}>
      <body className="bg-luxury-darker text-white antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

