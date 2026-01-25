import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-darker px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-luxury-gold mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Page non trouvée</h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-luxury-gold text-luxury-darker font-bold uppercase tracking-wider hover:bg-luxury-gold/90 transition-all duration-300"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

