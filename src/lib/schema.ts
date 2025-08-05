// Schema.org structured data for SEO

export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  address?: {
    '@type': string;
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  priceRange?: string;
  servesCuisine?: string[];
  paymentAccepted?: string[];
  currenciesAccepted?: string;
  areaServed?: string[];
  serviceType?: string[];
}

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint: {
    '@type': string;
    telephone?: string;
    contactType: string;
    email?: string;
    availableLanguage: string[];
  };
  sameAs?: string[];
  foundingDate?: string;
  founder?: {
    '@type': string;
    name: string;
  };
}

export interface WebSiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  potentialAction: {
    '@type': string;
    target: {
      '@type': string;
      urlTemplate: string;
    };
    'query-input': string;
  };
}

export interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
    url: string;
  };
  areaServed: {
    '@type': string;
    name: string;
  };
  hasOfferCatalog: {
    '@type': string;
    name: string;
    itemListElement: Array<{
      '@type': string;
      itemOffered: {
        '@type': string;
        name: string;
        description: string;
      };
    }>;
  };
}

// Default schema data for Seattle Shaadi
export const createLocalBusinessSchema = (): LocalBusinessSchema => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Seattle Shaadi',
  description: 'Premier Indian wedding planning services in Seattle, Washington. Specializing in traditional and modern Indian weddings with complete event coordination.',
  url: 'https://seattleshaadi.com',
  telephone: '+1-XXX-XXX-XXXX', // Replace with actual phone number
  email: 'info@seattleshaadi.com', // Replace with actual email
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Seattle',
    addressRegion: 'WA',
    addressCountry: 'US',
  },
  openingHours: [
    'Mo-Fr 09:00-18:00',
    'Sa 10:00-16:00'
  ],
  priceRange: '$$$',
  areaServed: [
    'Seattle',
    'Bellevue',
    'Redmond',
    'Kirkland',
    'Tacoma',
    'Everett',
    'King County',
    'Pierce County',
    'Snohomish County'
  ],
  serviceType: [
    'Wedding Planning',
    'Event Coordination',
    'Indian Wedding Services',
    'Traditional Ceremony Planning',
    'Wedding Decoration',
    'Vendor Coordination'
  ]
});

export const createOrganizationSchema = (): OrganizationSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Seattle Shaadi',
  description: 'Premier Indian wedding planning company serving Seattle and surrounding areas with traditional and modern wedding services.',
  url: 'https://seattleshaadi.com',
  logo: 'https://seattleshaadi.com/shaadi-squad-high-resolution-logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-XXX-XXX-XXXX', // Replace with actual phone number
    contactType: 'customer service',
    email: 'info@seattleshaadi.com', // Replace with actual email
    availableLanguage: ['English', 'Hindi', 'Punjabi', 'Gujarati']
  },
  sameAs: [
    'https://www.facebook.com/seattleshaadi', // Replace with actual social media URLs
    'https://www.instagram.com/seattleshaadi',
    'https://www.linkedin.com/company/seattleshaadi'
  ],
  foundingDate: '2020', // Replace with actual founding date
});

export const createWebSiteSchema = (): WebSiteSchema => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Seattle Shaadi',
  description: 'Premier Indian wedding planning services in Seattle, WA',
  url: 'https://seattleshaadi.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://seattleshaadi.com/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
});

export const createWeddingServiceSchema = (): ServiceSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Indian Wedding Planning Services',
  description: 'Complete Indian wedding planning and coordination services including traditional ceremonies, modern celebrations, and cultural events.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Seattle Shaadi',
    url: 'https://seattleshaadi.com'
  },
  areaServed: {
    '@type': 'State',
    name: 'Washington'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Wedding Planning Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Complete Wedding Planning',
          description: 'Full-service wedding planning from engagement to reception'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Traditional Ceremony Coordination',
          description: 'Expert coordination of traditional Indian wedding ceremonies'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Vendor Management',
          description: 'Complete vendor coordination and management services'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Wedding Decoration',
          description: 'Traditional and modern wedding decoration services'
        }
      }
    ]
  }
});

// FAQ Schema for FAQ page
export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

// Breadcrumb Schema
export const createBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url
  }))
});

