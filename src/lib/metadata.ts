import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service';
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = '/images/seattle-shaadi-og.jpg',
    url = 'https://seattleshaadi.com',
    type = 'website',
    publishedTime,
    modifiedTime
  } = config;

  const fullTitle = title.includes('Seattle Shaadi') ? title : `${title} | Seattle Shaadi`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'Seattle wedding planning',
      'South Asian weddings',
      'Indian wedding planner',
      'luxury wedding services',
      'cultural wedding ceremonies',
      'Seattle Shaadi',
      ...keywords
    ].join(', '),
    authors: [{ name: 'Seattle Shaadi' }],
    creator: 'Seattle Shaadi',
    publisher: 'Seattle Shaadi',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Seattle Shaadi',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@seattleshaadi',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
  };
}

export const defaultSEO: SEOConfig = {
  title: 'Seattle Shaadi - Luxury South Asian Wedding Planning',
  description: 'Transform your dream wedding into reality with Seattle Shaadi. Expert South Asian wedding planning services in Seattle, combining cultural traditions with modern elegance.',
  keywords: [
    'Seattle wedding planner',
    'South Asian weddings',
    'Indian wedding planning',
    'luxury wedding services',
    'cultural ceremonies',
    'wedding coordination',
    'bridal services',
    'wedding venues Seattle'
  ],
  url: 'https://seattleshaadi.com',
  type: 'website'
};

// Structured Data Schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Seattle Shaadi",
  "description": "Luxury South Asian wedding planning services in Seattle",
  "url": "https://seattleshaadi.com",
  "logo": "https://seattleshaadi.com/images/logo.png",
  "image": "https://seattleshaadi.com/images/seattle-shaadi-og.jpg",
  "telephone": "+1-206-XXX-XXXX",
  "email": "info@seattleshaadi.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Wedding Lane",
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "postalCode": "98101",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "47.6062",
    "longitude": "-122.3321"
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "47.6062",
      "longitude": "-122.3321"
    },
    "geoRadius": "50000"
  },
  "sameAs": [
    "https://www.facebook.com/seattleshaadi",
    "https://www.instagram.com/seattleshaadi",
    "https://www.linkedin.com/company/seattleshaadi"
  ]
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Wedding Planning Services",
  "description": "Comprehensive South Asian wedding planning services",
  "provider": {
    "@type": "Organization",
    "name": "Seattle Shaadi"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Seattle, WA"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Wedding Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Full Wedding Planning",
          "description": "Complete wedding planning from concept to execution"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Day-of Coordination",
          "description": "Professional coordination on your wedding day"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cultural Ceremony Planning",
          "description": "Specialized South Asian ceremony planning"
        }
      }
    ]
  }
};

