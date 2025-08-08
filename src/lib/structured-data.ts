import { siteConfig } from './utils';

// Local Business Schema for Seattle Shaadi
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}#organization`,
  "name": "Seattle Shaadi",
  "alternateName": "Seattle Shaadi Wedding Planning",
  "description": siteConfig.description,
  "url": siteConfig.url,
  "logo": `${siteConfig.url}/Logo-new.webp`,
  "image": [
    `${siteConfig.url}/Homepage_main.jpeg`,
    `${siteConfig.url}/Homepage_main2.jpg`,
    `${siteConfig.url}/Homepage_main3.webp`
  ],
  "telephone": "+1-206-XXX-XXXX", // Replace with actual phone number
  "email": "info@seattleshaadi.com", // Replace with actual email
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "addressCountry": "US",
    "postalCode": "98101" // Replace with actual postal code
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.6062,
    "longitude": -122.3321
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Seattle",
      "sameAs": "https://en.wikipedia.org/wiki/Seattle"
    },
    {
      "@type": "City", 
      "name": "Bellevue",
      "sameAs": "https://en.wikipedia.org/wiki/Bellevue,_Washington"
    },
    {
      "@type": "City",
      "name": "Tacoma", 
      "sameAs": "https://en.wikipedia.org/wiki/Tacoma,_Washington"
    },
    {
      "@type": "State",
      "name": "Washington",
      "sameAs": "https://en.wikipedia.org/wiki/Washington_(state)"
    }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 47.6062,
      "longitude": -122.3321
    },
    "geoRadius": "100000" // 100km radius
  },
  "priceRange": "$$$",
  "openingHours": [
    "Mo-Fr 09:00-18:00",
    "Sa 10:00-16:00"
  ],
  "sameAs": [
    // Add social media profiles when available
    // "https://www.facebook.com/seattleshaadi",
    // "https://www.instagram.com/seattleshaadi",
    // "https://www.linkedin.com/company/seattleshaadi"
  ]
};

// Wedding Planning Service Schema
export const weddingPlanningServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Wedding Planning Services",
  "description": "Comprehensive wedding planning and coordination services specializing in Indian and South Asian weddings in Seattle and the Pacific Northwest.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Seattle Shaadi",
    "url": siteConfig.url
  },
  "areaServed": [
    "Seattle, WA",
    "Bellevue, WA", 
    "Tacoma, WA",
    "Pacific Northwest"
  ],
  "serviceType": "Wedding Planning",
  "category": [
    "Wedding Planning",
    "Event Coordination",
    "Cultural Wedding Services",
    "Luxury Wedding Planning"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Wedding Planning Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Full Wedding Planning",
          "description": "Complete wedding planning from engagement to reception"
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
          "name": "Venue Selection",
          "description": "Expert assistance in finding the perfect wedding venue"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Vendor Coordination", 
          "description": "Professional vendor selection and management"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cultural Ceremony Planning",
          "description": "Specialized planning for Indian and South Asian wedding traditions"
        }
      }
    ]
  }
};

// Website Schema with enhanced search functionality
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}#website`,
  "url": siteConfig.url,
  "name": siteConfig.name,
  "description": siteConfig.description,
  "publisher": {
    "@id": `${siteConfig.url}#organization`
  },
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  ],
  "inLanguage": "en-US"
};

// Breadcrumb Schema Generator
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

// FAQ Schema Generator
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Review Schema Generator
export function generateReviewSchema(reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Seattle Shaadi",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
      "reviewCount": reviews.length,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": review.reviewBody,
      "datePublished": review.datePublished
    }))
  };
}

// Event Schema for Wedding Services
export function generateWeddingEventSchema(eventDetails: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    address: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": eventDetails.name,
    "description": eventDetails.description,
    "startDate": eventDetails.startDate,
    "endDate": eventDetails.endDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": eventDetails.location.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": eventDetails.location.address
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Seattle Shaadi",
      "url": siteConfig.url
    }
  };
}

