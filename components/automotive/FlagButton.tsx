'use client';

import { type Locale } from '@/i18n';

interface FlagButtonProps {
  locale: Locale;
  isActive: boolean;
  onClick: () => void;
  label: string;
}

export default function FlagButton({ locale, isActive, onClick, label }: FlagButtonProps) {
  const getFlagContent = (locale: Locale) => {
    switch (locale) {
      case 'fr-MA':
        // French flag - vertical tricolor (Blue, White, Red)
        return (
          <div className="w-full h-full flex">
            <div className="w-1/3 bg-[#002654]" />
            <div className="w-1/3 bg-white" />
            <div className="w-1/3 bg-[#ED2939]" />
          </div>
        );
      case 'en-US':
        // US flag - simplified with stripes and blue field
        return (
          <div className="w-full h-full relative">
            {/* Red and white stripes */}
            <div className="absolute inset-0" style={{
              background: 'repeating-linear-gradient(to bottom, #B22234 0, #B22234 7.69%, #FFFFFF 7.69%, #FFFFFF 15.38%)',
            }} />
            {/* Blue field */}
            <div className="absolute top-0 left-0 w-[40%] h-[46.15%] bg-[#3C3B6E]" />
          </div>
        );
      case 'de':
        // German flag - horizontal tricolor (Black, Red, Gold)
        return (
          <div className="w-full h-full flex flex-col">
            <div className="h-1/3 bg-black" />
            <div className="h-1/3 bg-[#DD0000]" />
            <div className="h-1/3 bg-[#FFCE00]" />
          </div>
        );
      case 'ar-AE':
        // UAE flag - red vertical stripe on left, three horizontal stripes (green, white, black) on right
        return (
          <div className="w-full h-full flex">
            {/* Red vertical stripe on left */}
            <div className="w-1/4 bg-[#FF0000]" />
            {/* Three horizontal stripes on right */}
            <div className="w-3/4 flex flex-col">
              <div className="h-1/3 bg-[#00732F]" />
              <div className="h-1/3 bg-white" />
              <div className="h-1/3 bg-black" />
            </div>
          </div>
        );
      default:
        return <div className="w-full h-full bg-gray-600" />;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative
        w-9 h-9 rounded-full
        transition-all duration-200
        border-2 overflow-hidden
        ${isActive 
          ? 'border-luxury-gold shadow-lg shadow-luxury-gold/50 ring-2 ring-luxury-gold/30' 
          : 'border-white/20 hover:border-luxury-gold/70'
        }
      `}
      aria-label={label}
      title={label}
    >
      {getFlagContent(locale)}
    </button>
  );
}
