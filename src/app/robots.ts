import { MetadataRoute } from 'next';
import { enhancedSeoConfig } from '@/lib/enhanced-seo-config';

/**
 * Generate robots.txt file for the site
 * This ensures search engines can properly crawl the site
 * and respect any crawling directives
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = enhancedSeoConfig.siteUrl;
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/private/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

