import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo-config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: 'Seattle Shaadi',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#faf9f7', // Elegant Off-White (45 44% 95%)
    theme_color: '#c4930c', // Rich Gold (45 86% 47%)
    orientation: 'portrait',
    scope: '/',
    icons: [
      {
        src: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    categories: ['lifestyle', 'business', 'entertainment'],
    lang: 'en-US',
    dir: 'ltr',
  };
}
