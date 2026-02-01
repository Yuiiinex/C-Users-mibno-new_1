const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    _next_intl_trailing_slash: process.env._next_intl_trailing_slash ?? 'false',
  },
  experimental: {
    turbo: {
      root: './',
    },
  },
};

module.exports = withNextIntl(nextConfig);
