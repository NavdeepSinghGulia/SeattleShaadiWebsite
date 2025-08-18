import { MetadataRoute } from 'next';
import { enhancedSeoConfig } from '@/lib/enhanced-seo-config';

/**
 * Generate dynamic sitemap for Next.js
 * This complements the static sitemap.xml in the public directory
 * and ensures any dynamic routes are properly included
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = enhancedSeoConfig.siteUrl;
  const lastModified = new Date().toISOString();

  // Main pages
  const mainRoutes = [
    '',
    '/about',
    '/services',
    '/work',
    '/contact',
    '/faq',
    '/carriers',
    '/spotlight',
    '/fun',
    '/blog',
    '/traditions',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly' as 'weekly' | 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Blog posts
  const blogPosts = [
    '/blog/indian-wedding-traditions-seattle',
    '/blog/baraat-ceremony-seattle-indian-wedding',
    '/blog/haldi-ceremony-seattle-indian-wedding',
    '/blog/mehndi-ceremony-seattle-indian-wedding',
    '/blog/vidaai-ceremony-seattle-indian-wedding',
    '/blog/seattle-wedding-planning-guide',
    '/blog/south-asian-wedding-seattle',
    '/blog/top-5-seattle-wedding-venues',
    '/blog/sikh-jago-ceremony-seattle',
    '/blog/tamil-oonjal-ceremony-seattle',
    '/blog/telugu-talambralu-ceremony-seattle',
    '/blog/kannada-nalangu-ceremony-seattle',
    '/blog/malayalam-thalikettu-ceremony-seattle',
  ].map(post => ({
    url: `${baseUrl}${post}`,
    lastModified,
    changeFrequency: 'yearly' as 'yearly',
    priority: 0.7,
  }));

  // Service pages from enhanced-seo-config
  const servicePages = enhancedSeoConfig.services.map(service => ({
    url: `${baseUrl}${service.url}`,
    lastModified,
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.8,
  }));

  // Demo page
  const demoPage = {
    url: `${baseUrl}/mobile-royal-demo`,
    lastModified,
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.3,
  };

  return [...mainRoutes, ...blogPosts, ...servicePages, demoPage];
}
