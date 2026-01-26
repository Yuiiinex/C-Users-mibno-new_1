# WEXPRESSCARS - High-End Automotive Brand Website

A luxury automotive brand website inspired by premium automotive design, built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Features

- 🚗 **Luxury Design**: Minimal, dark theme with strong contrast
- 🌍 **Internationalization**: Full i18n support with default locale fr-MA
- 📱 **Fully Responsive**: Mobile, tablet, and desktop optimized
- ✨ **Smooth Animations**: Powered by Framer Motion
- 🎨 **Modern UI**: Clean typography and premium automotive aesthetics
- 🔍 **SEO Optimized**: Meta tags and structured data
- 🖼️ **Optimized Images**: Next.js Image component with lazy loading

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **i18n**: next-intl
- **Images**: Next.js Image Optimization

## Project Structure

```
├── app/
│   └── [locale]/          # Locale-specific routes
│       ├── layout.tsx      # Root layout with i18n
│       ├── page.tsx        # Home page
│       ├── models/         # Models listing and detail pages
│       ├── brand/          # Brand/Experience page
│       └── contact/        # Contact page
├── components/
│   └── automotive/         # Automotive-specific components
│       ├── Navbar.tsx      # Sticky navbar with scroll effect
│       ├── Footer.tsx      # Footer with social links
│       ├── Hero.tsx        # Hero section component
│       └── CarCard.tsx     # Car card component
├── lib/
│   └── cars.ts            # Mock car data
├── messages/              # i18n translation files
│   ├── fr-MA.json         # French (Morocco) translations
│   └── en.json            # English translations
└── i18n.ts               # i18n configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

The site will automatically redirect to the default locale (fr-MA).

## Pages

- **Home** (`/`): Hero section, featured cars, and brand message
- **Models** (`/models`): Grid of all available car models
- **Model Detail** (`/models/[id]`): Individual car specifications and details
- **Brand** (`/brand`): Heritage, innovation, and craftsmanship sections
- **Contact** (`/contact`): Contact form and information

## Components

### Navbar
- Sticky navigation that becomes solid on scroll
- Transparent background when at top
- Mobile-responsive menu
- Smooth animations

### Hero
- Full-screen hero section with background image
- Animated headline
- Call-to-action button
- Scroll indicator

### CarCard
- Displays car image, name, and specifications
- Hover effects and animations
- Responsive grid layout

### Footer
- Social media links
- Navigation links
- Contact information
- Brand information

## Internationalization

The website supports multiple locales:
- `fr-MA` (French - Morocco) - Default
- `en` (English)

To add a new locale:
1. Add the locale to `i18n.ts`
2. Create a new translation file in `messages/`
3. Add translations for all keys

## Styling

The design uses a luxury dark theme with:
- Primary colors: Dark backgrounds (#0a0a0a, #000000)
- Accent color: Gold (#d4af37)
- High contrast text for readability
- Smooth transitions and animations

## Image Optimization

All images use Next.js Image component with:
- Automatic format optimization
- Lazy loading
- Responsive sizing
- Placeholder support

## SEO

- Meta tags for all pages
- Open Graph tags
- Semantic HTML
- Proper heading hierarchy
- Alt text for images

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## License

This project is for demonstration purposes. All car images are from Unsplash and are used for mockup purposes only.

