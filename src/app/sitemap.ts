import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo-config'
import { priorityBlogPosts, additionalBlogPosts } from '@/content/blog-content-strategy'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // Static pages with high priority for SEO
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0, // Highest priority for homepage
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9, // High priority for services page
    },
    {
      url: `${baseUrl}/services/hindu-wedding-planning`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9, // High priority for Hindu wedding services
    },
    {
      url: `${baseUrl}/services/sikh-wedding-planning`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9, // High priority for Sikh wedding services
    },
    {
      url: `${baseUrl}/services/full-service-planning`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/venue-selection`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/wedding-decoration`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/catering-coordination`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8, // High priority for blog index
    },
  ]

  // Location-specific pages for local SEO
  const locationPages = [
    {
      url: `${baseUrl}/seattle-indian-wedding-planner`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9, // High priority for main location page
    },
    {
      url: `${baseUrl}/bellevue-indian-wedding-planner`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tacoma-indian-wedding-planner`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/everett-indian-wedding-planner`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/spokane-indian-wedding-planner`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Blog posts for content marketing SEO
  const blogPosts = [...priorityBlogPosts, ...additionalBlogPosts].map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.8 : 0.6,
  }))

  // FAQ pages for voice search optimization
  const faqPages = [
    {
      url: `${baseUrl}/faq/indian-wedding-planning`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq/hindu-wedding-ceremonies`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq/sikh-wedding-ceremonies`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq/wedding-venues-seattle`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Resource pages for additional SEO value
  const resourcePages = [
    {
      url: `${baseUrl}/resources/indian-wedding-checklist`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources/wedding-timeline-template`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources/vendor-directory`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ]

  return [
    ...staticPages,
    ...locationPages,
    ...blogPosts,
    ...faqPages,
    ...resourcePages,
  ]
}

