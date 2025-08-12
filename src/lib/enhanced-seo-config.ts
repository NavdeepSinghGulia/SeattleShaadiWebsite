/**
 * Enhanced SEO Configuration
 * 
 * Advanced SEO settings optimized for Indian wedding planning
 * in Seattle and USA markets with focus on local search dominance.
 */

import { PRIMARY_KEYWORDS, LOCATION_KEYWORDS } from './seo-keywords';

// Enhanced site configuration for SEO
export const enhancedSeoConfig = {
  // Core site information
  siteName: 'Seattle Shaadi - Premier Indian Wedding Planner',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://seattleshaadi.com',
  
  // Primary business information
  businessName: 'Seattle Shaadi',
  businessLegalName: 'Seattle Shaadi Wedding Planners LLC',
  foundedYear: '2020',
  
  // Contact information
  phone: '+1 (206) 555-0123', // Update with real phone
  email: 'contact@seattleshaadi.com',
  
  // Address information (critical for local SEO)
  address: {
    streetAddress: '123 Main Street', // Update with real address
    addressLocality: 'Seattle',
    addressRegion: 'WA',
    postalCode: '98101',
    addressCountry: 'US'
  },
  
  // Service areas (for local SEO)
  serviceAreas: [
    'Seattle, WA',
    'Bellevue, WA',
    'Tacoma, WA',
    'Everett, WA',
    'Spokane, WA',
    'Redmond, WA',
    'Kirkland, WA',
    'Renton, WA',
    'Kent, WA',
    'Federal Way, WA',
    'King County, WA',
    'Pierce County, WA',
    'Snohomish County, WA',
    'Washington State',
    'Pacific Northwest'
  ],
  
  // Business hours
  businessHours: {
    monday: '9:00 AM - 6:00 PM',
    tuesday: '9:00 AM - 6:00 PM',
    wednesday: '9:00 AM - 6:00 PM',
    thursday: '9:00 AM - 6:00 PM',
    friday: '9:00 AM - 6:00 PM',
    saturday: '10:00 AM - 4:00 PM',
    sunday: 'By Appointment Only'
  },
  
  // Social media profiles (update with real URLs)
  socialProfiles: {
    facebook: 'https://www.facebook.com/seattleshaadi',
    instagram: 'https://www.instagram.com/seattleshaadi',
    pinterest: 'https://www.pinterest.com/seattleshaadi',
    linkedin: 'https://www.linkedin.com/company/seattleshaadi',
    youtube: 'https://www.youtube.com/@seattleshaadi',
    twitter: 'https://twitter.com/seattleshaadi'
  },
  
  // Primary services offered
  services: [
    {
      name: 'Full-Service Indian Wedding Planning',
      description: 'Complete wedding planning from engagement to reception',
      url: '/services/full-service-planning'
    },
    {
      name: 'Hindu Wedding Ceremony Planning',
      description: 'Traditional Hindu wedding ceremony coordination',
      url: '/services/hindu-wedding-planning'
    },
    {
      name: 'Sikh Wedding Ceremony Planning',
      description: 'Authentic Sikh wedding ceremony coordination',
      url: '/services/sikh-wedding-planning'
    },
    {
      name: 'Indian Wedding Venue Selection',
      description: 'Expert venue selection and booking services',
      url: '/services/venue-selection'
    },
    {
      name: 'Indian Wedding Decoration',
      description: 'Traditional and modern Indian wedding decorations',
      url: '/services/wedding-decoration'
    },
    {
      name: 'Indian Wedding Catering Coordination',
      description: 'Authentic Indian cuisine and catering services',
      url: '/services/catering-coordination'
    }
  ],
  
  // Target keywords for different pages
  pageKeywords: {
    home: [
      'best Indian wedding planner Seattle',
      'Seattle Shaadi wedding planning',
      'Indian wedding coordinator Seattle',
      'Hindu wedding planner Seattle',
      'Sikh wedding planner Seattle'
    ],
    services: [
      'Indian wedding planning services Seattle',
      'Hindu wedding ceremony planning',
      'Sikh wedding ceremony planning',
      'Indian wedding venue selection Seattle',
      'Indian wedding decoration services Seattle'
    ],
    about: [
      'experienced Indian wedding planner Seattle',
      'certified Indian wedding coordinator',
      'top rated Indian wedding planner Seattle',
      'Indian wedding planning expert Seattle'
    ],
    contact: [
      'Indian wedding planner near me Seattle',
      'contact Indian wedding planner Seattle',
      'Indian wedding planning consultation Seattle'
    ]
  },
  
  // FAQ content for voice search optimization
  faqs: [
    {
      question: 'What makes Seattle Shaadi the best Indian wedding planner in Seattle?',
      answer: 'Seattle Shaadi combines years of experience with deep cultural knowledge to create authentic Indian weddings. We specialize in Hindu, Sikh, and other Indian wedding traditions while incorporating modern elements that reflect your unique style.'
    },
    {
      question: 'How much does Indian wedding planning cost in Seattle?',
      answer: 'Indian wedding planning costs in Seattle vary based on guest count, venue, and services. Our packages start from $5,000 for partial planning and can go up to $25,000+ for luxury full-service planning. We offer free consultations to provide accurate estimates.'
    },
    {
      question: 'What Indian wedding venues are available in Seattle?',
      answer: 'Seattle offers numerous venues perfect for Indian weddings, including luxury hotels, cultural centers, outdoor gardens, and traditional banquet halls. We have partnerships with top venues that understand Indian wedding requirements.'
    },
    {
      question: 'How far in advance should I book an Indian wedding planner in Seattle?',
      answer: 'We recommend booking your Indian wedding planner 12-18 months in advance, especially for popular wedding seasons. This ensures availability of preferred vendors and venues in the Seattle area.'
    },
    {
      question: 'Do you plan destination Indian weddings from Seattle?',
      answer: 'Yes, we plan destination Indian weddings throughout the USA and internationally. Many Seattle couples choose destinations like California, Hawaii, or India for their wedding celebrations.'
    }
  ],
  
  // Review and testimonial keywords
  reviewKeywords: [
    'best Indian wedding planner Seattle reviews',
    'Seattle Shaadi testimonials',
    'top rated Indian wedding coordinator Seattle',
    'Indian wedding planner Seattle recommendations',
    'Seattle Indian wedding planning reviews'
  ],
  
  // Local business categories
  businessCategories: [
    'Wedding Planner',
    'Event Planner',
    'Indian Wedding Specialist',
    'Hindu Wedding Planner',
    'Sikh Wedding Planner',
    'Cultural Wedding Coordinator',
    'Destination Wedding Planner',
    'Luxury Wedding Planner'
  ],
  
  // Certifications and awards (add real ones)
  certifications: [
    'Certified Wedding Planner (CWP)',
    'International Association of Wedding Planners Member',
    'Better Business Bureau A+ Rating',
    'WeddingWire Couples Choice Award 2023',
    'The Knot Best of Weddings 2023'
  ]
};

// Generate structured data for local business
export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${enhancedSeoConfig.siteUrl}/#localbusiness`,
  name: enhancedSeoConfig.businessName,
  alternateName: enhancedSeoConfig.businessLegalName,
  description: 'Premier Indian wedding planner in Seattle specializing in Hindu, Sikh, and traditional Indian wedding ceremonies. Expert coordination for authentic cultural celebrations.',
  url: enhancedSeoConfig.siteUrl,
  telephone: enhancedSeoConfig.phone,
  email: enhancedSeoConfig.email,
  foundingDate: enhancedSeoConfig.foundedYear,
  
  address: {
    '@type': 'PostalAddress',
    streetAddress: enhancedSeoConfig.address.streetAddress,
    addressLocality: enhancedSeoConfig.address.addressLocality,
    addressRegion: enhancedSeoConfig.address.addressRegion,
    postalCode: enhancedSeoConfig.address.postalCode,
    addressCountry: enhancedSeoConfig.address.addressCountry
  },
  
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '47.6062', // Seattle coordinates
    longitude: '-122.3321'
  },
  
  areaServed: enhancedSeoConfig.serviceAreas.map(area => ({
    '@type': 'City',
    name: area
  })),
  
  serviceType: enhancedSeoConfig.businessCategories,
  
  openingHoursSpecification: Object.entries(enhancedSeoConfig.businessHours).map(([day, hours]) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
    opens: hours.split(' - ')[0],
    closes: hours.split(' - ')[1] || 'By Appointment'
  })),
  
  sameAs: Object.values(enhancedSeoConfig.socialProfiles),
  
  priceRange: '$5000-$25000',
  
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1'
  }
});

// Generate FAQ schema for voice search
export const generateFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: enhancedSeoConfig.faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

// Generate service schema
export const generateServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Indian Wedding Planning',
  provider: {
    '@type': 'LocalBusiness',
    name: enhancedSeoConfig.businessName,
    url: enhancedSeoConfig.siteUrl
  },
  areaServed: enhancedSeoConfig.serviceAreas,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Indian Wedding Planning Services',
    itemListElement: enhancedSeoConfig.services.map((service, index) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: `${enhancedSeoConfig.siteUrl}${service.url}`
      }
    }))
  }
});

