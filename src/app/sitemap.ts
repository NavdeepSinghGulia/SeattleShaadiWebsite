import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://seattleshaadi.com'; // Update with actual domain
  const currentDate = new Date();

  // Define all the pages in your site
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
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/spotlight`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/fun`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ];

  return routes;
}

