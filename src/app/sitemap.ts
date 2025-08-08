import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date().toISOString();

  // Define all static routes with their priorities and change frequencies
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/top-5-seattle-wedding-venues`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/spotlight`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/fun`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/carriers`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/mobile-royal-demo`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  return routes;
}
