'use client';

import React from 'react';

interface WeddingTradition {
  name: string;
  description: string;
  culture: string;
  significance: string;
  imageUrl?: string;
  modernAdaptations?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SchemaMarkupProps {
  type: 'WeddingTradition' | 'FAQ' | 'LocalBusiness' | 'WebPage' | 'Article' | 'BreadcrumbList';
  data: any;
  url?: string;
}

export function SchemaMarkup({ type, data, url = '' }: SchemaMarkupProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://indianweddingsite.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  
  let schemaData;
  
  switch (type) {
    case 'WeddingTradition':
      schemaData = generateWeddingTraditionSchema(data as WeddingTradition, fullUrl);
      break;
    case 'FAQ':
      schemaData = generateFAQSchema(data as FAQItem[]);
      break;
    case 'LocalBusiness':
      schemaData = generateLocalBusinessSchema(data, fullUrl);
      break;
    case 'WebPage':
      schemaData = generateWebPageSchema(data, fullUrl);
      break;
    case 'Article':
      schemaData = generateArticleSchema(data, fullUrl);
      break;
    case 'BreadcrumbList':
      schemaData = generateBreadcrumbListSchema(data, baseUrl);
      break;
    default:
      schemaData = {};
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

function generateWeddingTraditionSchema(tradition: WeddingTradition, url: string): Record<string, any> {
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

function generateFAQSchema(questions: FAQItem[]): Record<string, any> {
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

function generateLocalBusinessSchema(data: any, url: string): Record<string, any> {
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
    'makesOffer': data.services?.map((service: any) => ({
      '@type': 'Offer',
      'itemOffered': {
        '@type': 'Service',
        'name': service.name,
        'description': service.description
      }
    })) || []
  };
}

function generateWebPageSchema(data: any, url: string): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': data.title || 'Indian Wedding Planner',
    'description': data.description || 'Luxury Indian wedding planning services in Seattle.',
    'url': url,
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'Indian Wedding Planner',
      'url': url.split('/').slice(0, 3).join('/')
    },
    'about': {
      '@type': 'Thing',
      'name': 'Indian Wedding Planning'
    },
    'primaryImageOfPage': {
      '@type': 'ImageObject',
      'url': data.image || `${url.split('/').slice(0, 3).join('/')}/images/og-default.jpg`
    },
    'datePublished': data.datePublished || new Date().toISOString(),
    'dateModified': data.dateModified || new Date().toISOString(),
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': url.split('/').slice(0, 3).join('/')
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': data.breadcrumb || 'Page',
          'item': url
        }
      ]
    }
  };
}

function generateArticleSchema(data: any, url: string): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': data.title || 'Indian Wedding Planning Article',
    'description': data.description || 'Information about Indian wedding planning and traditions.',
    'image': data.image || `${url.split('/').slice(0, 3).join('/')}/images/og-default.jpg`,
    'author': {
      '@type': 'Person',
      'name': data.author || 'Indian Wedding Planner Team'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Indian Wedding Planner',
      'logo': {
        '@type': 'ImageObject',
        'url': `${url.split('/').slice(0, 3).join('/')}/logo.png`
      }
    },
    'datePublished': data.datePublished || new Date().toISOString(),
    'dateModified': data.dateModified || new Date().toISOString(),
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url
    }
  };
}

function generateBreadcrumbListSchema(items: Array<{ name: string; url: string }>, baseUrl: string): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  };
}

// For backward compatibility with existing code
export const TraditionsSchemaMarkup = (props: any) => {
  return (
    <SchemaMarkup
      type="WeddingTradition"
      data={props.tradition}
      url={props.url}
    />
  );
};

