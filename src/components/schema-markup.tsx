'use client';

import React from 'react';
import Head from 'next/head';

interface WeddingTraditionSchema {
  name: string;
  description: string;
  image?: string;
  culture: string;
  significance: string;
  modernAdaptations?: string;
}

interface WeddingServiceSchema {
  name: string;
  description: string;
  image?: string;
  price?: {
    amount: number;
    currency: string;
  };
  url?: string;
}

interface SchemaMarkupProps {
  type: 'WeddingTradition' | 'WeddingService' | 'WeddingPlanner' | 'FAQPage' | 'Article';
  data: any;
  url?: string;
}

export function SchemaMarkup({ type, data, url }: SchemaMarkupProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://indianweddingsite.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

  let schema;

  switch (type) {
    case 'WeddingTradition':
      schema = generateWeddingTraditionSchema(data as WeddingTraditionSchema, fullUrl);
      break;
    case 'WeddingService':
      schema = generateWeddingServiceSchema(data as WeddingServiceSchema, fullUrl);
      break;
    case 'WeddingPlanner':
      schema = generateWeddingPlannerSchema(data, fullUrl);
      break;
    case 'FAQPage':
      schema = generateFAQPageSchema(data, fullUrl);
      break;
    case 'Article':
      schema = generateArticleSchema(data, fullUrl);
      break;
    default:
      schema = {};
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}

function generateWeddingTraditionSchema(tradition: WeddingTraditionSchema, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': `${tradition.name} - Indian Wedding Tradition`,
    'description': tradition.description,
    'image': tradition.image ? tradition.image : `${url.split('/').slice(0, -1).join('/')}/images/traditions/default.jpg`,
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

function generateWeddingServiceSchema(service: WeddingServiceSchema, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.name,
    'description': service.description,
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'Indian Wedding Planner',
      'image': `${url.split('/').slice(0, 3).join('/')}/logo.png`,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Seattle',
        'addressRegion': 'WA',
        'addressCountry': 'US'
      },
      'telephone': '+1-206-555-0100',
      'priceRange': '$$'
    },
    'offers': {
      '@type': 'Offer',
      'price': service.price?.amount || '',
      'priceCurrency': service.price?.currency || 'USD',
      'url': service.url || url
    },
    'areaServed': {
      '@type': 'City',
      'name': 'Seattle'
    },
    'serviceType': 'Wedding Planning'
  };
}

function generateWeddingPlannerSchema(data: any, url: string) {
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

function generateFAQPageSchema(data: { questions: { question: string; answer: string }[] }, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': data.questions.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };
}

function generateArticleSchema(data: any, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': data.title,
    'description': data.description,
    'image': data.image || `${url.split('/').slice(0, 3).join('/')}/images/blog/default.jpg`,
    'author': {
      '@type': 'Person',
      'name': data.author?.name || 'Indian Wedding Planner Team'
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

export function TraditionsSchemaMarkup({ traditions }: { traditions: Record<string, any[]> }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://indianweddingsite.com';
  const traditionsUrl = `${baseUrl}/traditions`;
  
  // Create an array of all traditions
  const allTraditions = Object.entries(traditions).flatMap(([culture, items]) => 
    items.map(tradition => ({
      ...tradition,
      culture: culture === 'hindu' ? 'Hindu' : 
               culture === 'sikh' ? 'Sikh' : 
               culture === 'muslim' ? 'Muslim' : 
               'South Indian'
    }))
  );
  
  // Generate schema for each tradition
  const traditionSchemas = allTraditions.map(tradition => ({
    '@type': 'Article',
    'headline': `${tradition.name} - Indian Wedding Tradition`,
    'description': tradition.description,
    'image': tradition.imageUrl || `${baseUrl}/images/traditions/default.jpg`,
    'author': {
      '@type': 'Organization',
      'name': 'Indian Wedding Planner',
      'url': baseUrl
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Indian Wedding Planner',
      'logo': {
        '@type': 'ImageObject',
        'url': `${baseUrl}/logo.png`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${traditionsUrl}#${tradition.id}`
    },
    'datePublished': new Date().toISOString().split('T')[0],
    'dateModified': new Date().toISOString().split('T')[0],
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
          'value': tradition.modernAdaptations
        }
      ]
    }
  }));
  
  // Generate FAQ schema from the FAQ section
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Can we blend traditions from different Indian cultures?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Absolutely! Many modern Indian weddings incorporate elements from various traditions, especially in intercultural marriages. Our planners can help you create a meaningful ceremony that honors both families\' backgrounds.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How can we make traditional ceremonies more accessible to non-Indian guests?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We recommend creating custom ceremony programs that explain the significance of each ritual, having a bilingual officiant who can provide brief explanations, or incorporating a narrator who guides guests through the ceremony.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How long do traditional Indian wedding ceremonies typically last?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Traditional ceremonies can range from 1-3 hours depending on the cultural background and specific rituals included. Many couples today choose to streamline certain elements while preserving the most meaningful traditions.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can we incorporate Western elements alongside traditional Indian customs?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes! Many couples successfully blend Indian traditions with Western elements like a white dress reception, first dance, cake cutting, or bouquet toss. Our planners specialize in creating harmonious fusion celebrations.'
        }
      }
    ]
  };
  
  // Combine all schemas
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': traditionsUrl,
        'url': traditionsUrl,
        'name': 'Indian Wedding Traditions & Customs',
        'description': 'Explore the rich cultural heritage of Indian wedding traditions. Learn about Hindu, Sikh, Muslim, and South Indian wedding rituals and their modern adaptations.',
        'isPartOf': {
          '@type': 'WebSite',
          'url': baseUrl,
          'name': 'Indian Wedding Planner',
          'description': 'Luxury Indian wedding planning services in Seattle.'
        }
      },
      ...traditionSchemas,
      faqSchema
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
    </Head>
  );
}

