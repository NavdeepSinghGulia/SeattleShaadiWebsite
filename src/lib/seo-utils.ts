/**
 * Utility functions for SEO optimization
 */

/**
 * Generates a canonical URL for a page
 * @param path - The path of the page (without domain)
 * @param baseUrl - The base URL of the site
 * @returns Full canonical URL
 */
export function getCanonicalUrl(path: string, baseUrl: string = 'https://indianweddingsite.com'): string {
  // Remove trailing slash from baseUrl if present
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // Add leading slash to path if not present
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${normalizedBaseUrl}${normalizedPath}`;
}

/**
 * Generates structured data for a wedding tradition
 * @param tradition - The tradition object
 * @param url - The URL of the tradition page
 * @returns Structured data object for the tradition
 */
export function generateTraditionStructuredData(
  tradition: {
    name: string;
    description: string;
    significance: string;
    modernAdaptations?: string;
    imageUrl?: string;
    culture: string;
  },
  url: string
): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': `${tradition.name} - Indian Wedding Tradition`,
    'description': tradition.description,
    'image': tradition.imageUrl || `${url.split('/').slice(0, -1).join('/')}/images/traditions/default.jpg`,
    'author': {
      '@type': 'Organization',
      'name': 'Indian Wedding Planner',
      'url': url.split('/').slice(0, 3).join('/')
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Indian Wedding Planner',
      'logo': {
        '@type': 'ImageObject',
        'url': `${url.split('/').slice(0, 3).join('/')}/logo.png`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url
    },
    'datePublished': new Date().toISOString(),
    'dateModified': new Date().toISOString(),
    'about': {
      '@type': 'Thing',
      'name': tradition.name,
      'description': tradition.description,
      'additionalProperty': [
        {
          '@type': 'PropertyValue',
          'name': 'Culture',
          'value': tradition.culture
        },
        {
          '@type': 'PropertyValue',
          'name': 'Significance',
          'value': tradition.significance
        },
        {
          '@type': 'PropertyValue',
          'name': 'Modern Adaptations',
          'value': tradition.modernAdaptations || 'Various modern adaptations exist for this tradition.'
        }
      ]
    }
  };
}

/**
 * Generates structured data for a FAQ page
 * @param questions - Array of question/answer pairs
 * @returns Structured data object for FAQs
 */
export function generateFAQStructuredData(
  questions: Array<{ question: string; answer: string }>
): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': questions.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };
}

/**
 * Generates structured data for a local business (wedding planner)
 * @param data - Business data
 * @param url - The URL of the business page
 * @returns Structured data object for the business
 */
export function generateLocalBusinessStructuredData(
  data: {
    name?: string;
    description?: string;
    image?: string;
    telephone?: string;
    address?: {
      street?: string;
      city?: string;
      region?: string;
      postalCode?: string;
      country?: string;
    };
    geo?: {
      latitude?: string;
      longitude?: string;
    };
    priceRange?: string;
    services?: Array<{
      name: string;
      description: string;
    }>;
  },
  url: string
): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': data.name || 'Indian Wedding Planner',
    'description': data.description || 'Luxury Indian wedding planning services in Seattle.',
    'image': data.image || `${url.split('/').slice(0, 3).join('/')}/logo.png`,
    'url': url,
    'telephone': data.telephone || '+1-206-555-0100',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': data.address?.street || '123 Wedding Ave',
      'addressLocality': data.address?.city || 'Seattle',
      'addressRegion': data.address?.region || 'WA',
      'postalCode': data.address?.postalCode || '98101',
      'addressCountry': data.address?.country || 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': data.geo?.latitude || '47.6062',
      'longitude': data.geo?.longitude || '-122.3321'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      'opens': '09:00',
      'closes': '17:00'
    },
    'priceRange': data.priceRange || '$$',
    'servesCuisine': 'Indian',
    'makesOffer': data.services?.map((service) => ({
      '@type': 'Offer',
      'itemOffered': {
        '@type': 'Service',
        'name': service.name,
        'description': service.description
      }
    })) || []
  };
}

