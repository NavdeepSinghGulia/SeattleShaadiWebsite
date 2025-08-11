import { siteConfig } from './seo-config';

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Seattle Shaadi",
  "alternateName": "Seattle Shaadi Wedding Planners",
  "url": siteConfig.url,
  "logo": `${siteConfig.url}/Logo-new.webp`,
  "image": `${siteConfig.url}/Logo-new.webp`,
  "description": siteConfig.description,
  "foundingDate": "2020",
  "founders": [
    {
      "@type": "Person",
      "name": "Rajesh Choudhary",
      "jobTitle": "Founder & CEO"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "addressCountry": "US",
    "postalCode": "98101"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "areaServed": ["Seattle", "Bellevue", "Tacoma", "Everett", "Spokane", "Washington State", "Pacific Northwest"],
    "availableLanguage": ["English", "Hindi", "Punjabi"]
  },
  "sameAs": [
    // Add social media profiles when available
    // "https://www.facebook.com/seattleshaadi",
    // "https://www.instagram.com/seattleshaadi",
    // "https://www.linkedin.com/company/seattleshaadi"
  ]
};

// Local Business Schema
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#localbusiness`,
  "name": "Seattle Shaadi",
  "image": `${siteConfig.url}/Logo-new.webp`,
  "description": siteConfig.description,
  "url": siteConfig.url,
  "telephone": "+1-XXX-XXX-XXXX", // Replace with actual phone number
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Seattle Metropolitan Area", // Replace with actual address
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "postalCode": "98101", // Replace with actual postal code
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.6062,
    "longitude": -122.3321
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "16:00"
    }
  ],
  "priceRange": "$$$",
  "servesCuisine": "Indian",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 47.6062,
      "longitude": -122.3321
    },
    "geoRadius": "100 miles"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "50",
    "bestRating": "5",
    "worstRating": "1"
  }
};

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  "url": siteConfig.url,
  "name": "Seattle Shaadi",
  "description": siteConfig.description,
  "publisher": {
    "@id": `${siteConfig.url}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

// Service Schema for Wedding Planning
export const weddingPlanningServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Wedding Planning Services",
  "description": "Comprehensive wedding planning services specializing in South Asian and Indian weddings in Seattle",
  "provider": {
    "@id": `${siteConfig.url}/#organization`
  },
  "areaServed": {
    "@type": "State",
    "name": "Washington"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Wedding Planning Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Full-Service Wedding Planning",
          "description": "Complete wedding planning from concept to execution"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Destination Wedding Planning",
          "description": "Planning and coordination for destination weddings"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Wedding Decor & Design",
          "description": "Custom wedding decor and styling services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Partial Wedding Planning",
          "description": "Assistance with specific aspects of wedding planning"
        }
      }
    ]
  }
};

// Person Schema for Team Members
export const teamMemberSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rajesh Choudhary",
    "jobTitle": "Founder & CEO",
    "description": "The visionary behind Seattle Shaadi with over two decades of premier project and event management experience",
    "worksFor": {
      "@id": `${siteConfig.url}/#organization`
    },
    "url": `${siteConfig.url}/about`,
    "knowsAbout": ["Wedding Planning", "Event Management", "South Asian Weddings", "Project Management"]
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Navdeep Singh",
    "jobTitle": "Co-founder & Head of Operations",
    "description": "Operational mastermind ensuring seamless wedding execution and coordination",
    "worksFor": {
      "@id": `${siteConfig.url}/#organization`
    },
    "url": `${siteConfig.url}/about`,
    "knowsAbout": ["Operations Management", "Wedding Coordination", "Logistics", "Event Execution"]
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Soniya Arora",
    "jobTitle": "Client Relations Manager",
    "description": "Dedicated client experience manager guiding couples through their wedding planning journey",
    "worksFor": {
      "@id": `${siteConfig.url}/#organization`
    },
    "url": `${siteConfig.url}/about`,
    "knowsAbout": ["Client Relations", "Wedding Planning", "Customer Service", "Event Coordination"]
  }
];

// FAQ Schema (can be used on FAQ page)
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of weddings do you specialize in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We specialize in South Asian and Indian weddings, including Hindu, Sikh, Muslim, and multicultural celebrations. We honor traditional customs while incorporating modern elegance."
      }
    },
    {
      "@type": "Question",
      "name": "Do you plan destination weddings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer comprehensive destination wedding planning services, handling everything from location scouting to guest logistics and local vendor coordination."
      }
    },
    {
      "@type": "Question",
      "name": "What areas do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We primarily serve the Seattle metropolitan area and the greater Pacific Northwest, including Bellevue, Tacoma, Everett, and surrounding regions."
      }
    }
  ]
};

// Breadcrumb Schema Generator
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Article Schema (for blog posts or detailed pages)
export function generateArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  authorName,
  image,
  url
}: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "image": image || `${siteConfig.url}/og-image.png`,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@id": `${siteConfig.url}/#organization`
    },
    "url": url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
}
