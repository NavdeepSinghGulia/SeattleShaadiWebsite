import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();
  
  // Static pages with their priorities and change frequencies
  const staticPages = [
    {
      url: siteConfig.url,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/work`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/spotlight`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/fun`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/carriers`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/mobile-royal-demo`,
      lastModified: currentDate,
      changeFrequency: 'rarely' as const,
      priority: 0.3,
    },
  ];

  // In the future, you can add dynamic pages here
  // For example, if you have a blog or portfolio pages:
  // const dynamicPages = await getDynamicPages();
  
  return staticPages;
}

// Helper function for future dynamic content
// async function getDynamicPages() {
//   // This would fetch dynamic content like blog posts, portfolio items, etc.
//   // Example:
//   // const posts = await getBlogPosts();
//   // return posts.map(post => ({
//   //   url: `${siteConfig.url}/blog/${post.slug}`,
//   //   lastModified: post.updatedAt,
//   //   changeFrequency: 'weekly' as const,
//   //   priority: 0.6,
//   // }));
//   return [];
// }

