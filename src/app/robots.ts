import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/utils';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '*.json',
          '/private/',
        ],
      },
      // Allow search engines to access images
      {
        userAgent: '*',
        allow: ['/images/', '/photos/', '/*.jpg', '/*.jpeg', '/*.png', '/*.webp'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}

