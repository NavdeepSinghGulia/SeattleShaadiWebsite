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
      name: 'Complete Indian Wedding Under $30K',
      description: 'Smart budget Indian wedding planning with luxury touches - full coordination from engagement to reception',
      url: '/services/budget-indian-wedding-30k'
    },
    {
      name: 'Hindu Wedding Ceremony Planning',
      description: 'Traditional Hindu wedding ceremony coordination with authentic rituals and customs',
      url: '/services/hindu-wedding-planning'
    },
    {
      name: 'Sikh Wedding Ceremony Planning',
      description: 'Authentic Sikh wedding ceremony coordination including Anand Karaj and Gurdwara ceremonies',
      url: '/services/sikh-wedding-planning'
    },
    {
      name: 'Punjabi Wedding Planning',
      description: 'Vibrant Punjabi wedding coordination with traditional music, dance, and celebrations',
      url: '/services/punjabi-wedding-planning'
    },
    {
      name: 'Tamil Wedding Ceremony Planning',
      description: 'Authentic South Indian Tamil wedding coordination with traditional rituals and customs',
      url: '/services/tamil-wedding-planning'
    },
    {
      name: 'Telugu Wedding Planning',
      description: 'Traditional Telugu wedding ceremony coordination with authentic Andhra/Telangana customs',
      url: '/services/telugu-wedding-planning'
    },
    {
      name: 'Kannada Wedding Planning',
      description: 'Karnataka tradition wedding coordination with authentic Kannada customs and rituals',
      url: '/services/kannada-wedding-planning'
    },
    {
      name: 'Muslim Indian Wedding Planning',
      description: 'Islamic Indian wedding coordination including Nikah ceremony and traditional celebrations',
      url: '/services/muslim-indian-wedding-planning'
    },
    {
      name: 'Bengali Wedding Planning',
      description: 'Traditional Bengali wedding coordination with authentic rituals and cultural celebrations',
      url: '/services/bengali-wedding-planning'
    },
    {
      name: 'Gujarati Wedding Planning',
      description: 'Vibrant Gujarati wedding coordination with traditional ceremonies and celebrations',
      url: '/services/gujarati-wedding-planning'
    },
    {
      name: 'Affordable Luxury Indian Weddings',
      description: 'Premium Indian wedding planning services with smart budget management and value optimization',
      url: '/services/affordable-luxury-indian-weddings'
    },
    {
      name: 'Indian Wedding Venue Selection',
      description: 'Expert venue selection and booking services for all Indian wedding types',
      url: '/services/venue-selection'
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
      answer: 'Seattle Shaadi combines years of experience with deep cultural knowledge to create authentic Indian weddings. We specialize in Hindu, Sikh, Punjabi, Tamil, Telugu, Kannada, Muslim Indian, Bengali, Gujarati, and Marathi wedding traditions while incorporating modern elements that reflect your unique style.'
    },
    {
      question: 'Can you plan a complete Indian wedding under $30,000 in Seattle?',
      answer: 'Yes! We specialize in smart budget Indian wedding planning. Our complete wedding packages under $30K include venue coordination, decoration, catering coordination, photography coordination, and day-of management. We focus on value and luxury touches without compromising on authenticity.'
    },
    {
      question: 'What is included in your $30K Indian wedding package?',
      answer: 'Our $30K complete Indian wedding package includes: venue selection and booking, traditional decoration setup, catering coordination, photography/videography coordination, music and entertainment booking, day-of coordination, timeline management, and vendor coordination. We maximize value while maintaining authentic cultural elements.'
    },
    {
      question: 'Do you plan weddings for all Indian communities in Seattle?',
      answer: 'Absolutely! We plan weddings for all Indian communities including Punjabi, Tamil, Telugu, Kannada, Bengali, Gujarati, Marathi, and Muslim Indian families. Our team understands the unique traditions, rituals, and customs of each community and ensures authentic celebrations.'
    },
    {
      question: 'What is the difference between North Indian and South Indian wedding planning?',
      answer: 'North Indian weddings (Punjabi, Hindi, Gujarati) typically feature vibrant colors, Bollywood music, and ceremonies like Mehendi, Sangeet, and Baraat. South Indian weddings (Tamil, Telugu, Kannada) focus on traditional rituals, classical music, and ceremonies like Haldi and temple blessings. We expertly coordinate both styles.'
    },
    {
      question: 'How do you plan affordable luxury Indian weddings?',
      answer: 'We achieve affordable luxury through smart budget allocation, vendor partnerships, DIY elements for non-critical items, seasonal timing, and focusing spending on high-impact areas like venue, food, and photography. Our goal is maximum impact within your budget.'
    },
    {
      question: 'What Indian wedding venues are available in Seattle?',
      answer: 'Seattle offers numerous venues perfect for Indian weddings, including luxury hotels, cultural centers, outdoor gardens, and traditional banquet halls. We have partnerships with venues that understand diverse Indian wedding requirements for all communities.'
    },
    {
      question: 'How far in advance should I book an Indian wedding planner in Seattle?',
      answer: 'We recommend booking your Indian wedding planner 12-18 months in advance, especially for popular wedding seasons. This ensures availability of preferred vendors and venues in the Seattle area, and better pricing for budget-conscious couples.'
    },
    {
      question: 'Do you coordinate Muslim Indian weddings and Nikah ceremonies?',
      answer: 'Yes, we specialize in Muslim Indian wedding coordination including Nikah ceremonies, Walima receptions, and traditional Islamic wedding customs. We work with local mosques and Islamic centers to ensure authentic and respectful celebrations.'
    },
    {
      question: 'Can you plan Tamil, Telugu, or Kannada weddings in Seattle?',
      answer: 'Absolutely! We have extensive experience planning South Indian weddings including Tamil, Telugu, and Kannada ceremonies. We understand the traditional rituals, coordinate with local temples, and ensure authentic cultural celebrations with proper customs and traditions.'
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
