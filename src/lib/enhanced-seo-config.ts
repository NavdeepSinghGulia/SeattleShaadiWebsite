/**
 * Enhanced SEO Configuration
 * This file contains comprehensive SEO settings for the website
 */

export const enhancedSeoConfig = {
  siteUrl: 'https://seattleshaadi.com',
  siteName: 'Seattle Shaadi - Indian Wedding Planner',
  defaultTitle: 'Best Indian Wedding Planner in Seattle | Seattle Shaadi',
  defaultDescription: 'Seattle\'s premier Indian wedding planning service. We create luxurious, culturally authentic weddings with a modern touch for South Asian couples in the Pacific Northwest.',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://seattleshaadi.com',
    siteName: 'Seattle Shaadi',
    images: [
      {
        url: 'https://seattleshaadi.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Seattle Shaadi - Indian Wedding Planner',
      },
    ],
  },
  
  // Twitter
  twitter: {
    handle: '@seattleshaadi',
    site: '@seattleshaadi',
    cardType: 'summary_large_image',
  },
  
  // Structured Data (JSON-LD)
  structuredData: {
    organization: {
      '@type': 'Organization',
      name: 'Seattle Shaadi',
      url: 'https://seattleshaadi.com',
      logo: 'https://seattleshaadi.com/images/logo.png',
      sameAs: [
        'https://www.facebook.com/seattleshaadi',
        'https://www.instagram.com/seattleshaadi',
        'https://www.pinterest.com/seattleshaadi',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-206-555-0123',
        contactType: 'customer service',
        areaServed: 'Seattle, WA',
        availableLanguage: ['English', 'Hindi', 'Punjabi'],
      },
    },
    localBusiness: {
      '@type': 'LocalBusiness',
      name: 'Seattle Shaadi - Indian Wedding Planner',
      image: 'https://seattleshaadi.com/images/storefront.jpg',
      '@id': 'https://seattleshaadi.com',
      url: 'https://seattleshaadi.com',
      telephone: '+1-206-555-0123',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Wedding Lane',
        addressLocality: 'Seattle',
        addressRegion: 'WA',
        postalCode: '98101',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 47.6062,
        longitude: -122.3321,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '10:00',
        closes: '18:00',
      },
      priceRange: '$$',
    },
    // Add wedding-specific structured data
    event: {
      '@type': 'Event',
      name: 'Indian Wedding Planning Consultation',
      startDate: 'YYYY-MM-DDT10:00',
      endDate: 'YYYY-MM-DDT11:00',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: 'Seattle Shaadi Office',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Wedding Lane',
          addressLocality: 'Seattle',
          addressRegion: 'WA',
          postalCode: '98101',
          addressCountry: 'US',
        },
      },
      image: [
        'https://seattleshaadi.com/images/consultation.jpg',
      ],
      description: 'Schedule a free consultation with our Indian wedding planning experts to discuss your dream wedding.',
      offers: {
        '@type': 'Offer',
        url: 'https://seattleshaadi.com/contact',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        validFrom: 'YYYY-MM-DD',
      },
      organizer: {
        '@type': 'Organization',
        name: 'Seattle Shaadi',
        url: 'https://seattleshaadi.com',
      },
    },
    // Add FAQ structured data
    faq: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What services do you offer for Indian weddings?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We offer comprehensive Indian wedding planning services including venue selection, catering, decor, entertainment, photography, videography, transportation, and day-of coordination. We specialize in Hindu, Sikh, Muslim, and South Indian wedding traditions.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does an Indian wedding cost in Seattle?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Indian wedding costs in Seattle typically range from $30,000 for intimate celebrations to $100,000+ for larger, more elaborate events. Factors affecting cost include guest count, venue, catering choices, decor complexity, and additional events like mehndi and sangeet.',
          },
        },
        {
          '@type': 'Question',
          name: 'How far in advance should I book your services?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We recommend booking our services 9-12 months in advance for full planning services, especially if your wedding is during peak season (May-September). For partial planning or month-of coordination, 6 months in advance is typically sufficient.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you work with specific vendors or can we choose our own?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'While we have a curated list of trusted vendors who understand Indian wedding traditions and requirements, you\'re welcome to choose your own vendors. We\'re happy to collaborate with your preferred professionals to ensure a seamless experience.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you accommodate specific regional Indian wedding traditions?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! We specialize in various regional Indian wedding traditions including Punjabi, Gujarati, Bengali, Tamil, Telugu, Kannada, and more. Our team includes planners familiar with specific cultural and religious ceremonies from different regions of India.',
          },
        },
      ],
    },
  },
  
  // Keywords
  keywords: [
    'Indian wedding planner Seattle',
    'South Asian wedding Seattle',
    'Hindu wedding planner',
    'Sikh wedding planner',
    'Muslim wedding planner',
    'Indian wedding venues Seattle',
    'Seattle Indian wedding packages',
    'Luxury Indian wedding',
    'Budget Indian wedding Seattle',
    'Indian wedding decorations',
    'Mehndi ceremony Seattle',
    'Sangeet planner Seattle',
    'Indian wedding catering Seattle',
    'Wedding mandap Seattle',
    'Baraat ceremony Seattle',
    'Indian wedding photographer Seattle',
    'Wedding lehenga Seattle',
    'Bridal mehndi artist Seattle',
    'Indian wedding invitations',
    'Cultural wedding planning',
    'Traditional Indian wedding',
    'Modern Indian wedding',
    'Fusion Indian wedding',
    'Indian wedding entertainment',
    'Bollywood dancers Seattle',
    'Dhol players Seattle',
  ],
  
  // Service Pages
  services: [
    {
      title: 'Budget Indian Wedding Planning in Seattle - $30K Package',
      description: 'Affordable Indian wedding planning in Seattle starting at $30,000. Get a beautiful, culturally authentic wedding without breaking the bank.',
      url: '/services/budget-indian-wedding-30k',
      keywords: ['budget Indian wedding', 'affordable Indian wedding Seattle', 'Indian wedding package'],
    },
    {
      title: 'Hindu Wedding Planning in Seattle | Traditional & Modern Ceremonies',
      description: 'Expert Hindu wedding planning in Seattle with traditional ceremonies, modern touches, and authentic cultural elements.',
      url: '/services/hindu-wedding-planning',
      keywords: ['Hindu wedding planner', 'Hindu ceremony Seattle', 'traditional Hindu wedding'],
    },
    {
      title: 'Sikh Wedding Planning in Seattle | Authentic Anand Karaj Ceremonies',
      description: 'Authentic Sikh wedding planning in Seattle with traditional Anand Karaj ceremonies and cultural expertise.',
      url: '/services/sikh-wedding-planning',
      keywords: ['Sikh wedding planner', 'Anand Karaj Seattle', 'Gurdwara wedding'],
    },
    {
      title: 'Punjabi Wedding Planning in Seattle | Vibrant Cultural Celebrations',
      description: 'Vibrant Punjabi wedding planning in Seattle with authentic traditions, bhangra, and cultural celebrations.',
      url: '/services/punjabi-wedding-planning',
      keywords: ['Punjabi wedding planner', 'bhangra wedding Seattle', 'Punjabi wedding traditions'],
    },
    {
      title: 'Tamil Wedding Planning in Seattle | South Indian Ceremonies',
      description: 'Traditional Tamil wedding planning in Seattle with authentic South Indian ceremonies and cultural elements.',
      url: '/services/tamil-wedding-planning',
      keywords: ['Tamil wedding planner', 'South Indian wedding Seattle', 'Tamil ceremonies'],
    },
    {
      title: 'Telugu Wedding Planning in Seattle | South Indian Traditions',
      description: 'Authentic Telugu wedding planning in Seattle with traditional South Indian ceremonies and cultural expertise.',
      url: '/services/telugu-wedding-planning',
      keywords: ['Telugu wedding planner', 'South Indian wedding Seattle', 'Telugu ceremonies'],
    },
    {
      title: 'Kannada Wedding Planning in Seattle | South Indian Celebrations',
      description: 'Traditional Kannada wedding planning in Seattle with authentic South Indian ceremonies and cultural elements.',
      url: '/services/kannada-wedding-planning',
      keywords: ['Kannada wedding planner', 'South Indian wedding Seattle', 'Kannada ceremonies'],
    },
    {
      title: 'Muslim Indian Wedding Planning in Seattle | Nikah & Walima Ceremonies',
      description: 'Culturally sensitive Muslim Indian wedding planning in Seattle with traditional Nikah and Walima ceremonies.',
      url: '/services/muslim-indian-wedding-planning',
      keywords: ['Muslim wedding planner', 'Nikah ceremony Seattle', 'Walima reception'],
    },
    {
      title: 'Bengali Wedding Planning in Seattle | Traditional Ceremonies',
      description: 'Authentic Bengali wedding planning in Seattle with traditional ceremonies and cultural expertise.',
      url: '/services/bengali-wedding-planning',
      keywords: ['Bengali wedding planner', 'Bengali wedding traditions', 'Bengali ceremony Seattle'],
    },
    {
      title: 'Gujarati Wedding Planning in Seattle | Vibrant Cultural Celebrations',
      description: 'Vibrant Gujarati wedding planning in Seattle with authentic traditions and cultural celebrations.',
      url: '/services/gujarati-wedding-planning',
      keywords: ['Gujarati wedding planner', 'Gujarati wedding traditions', 'Garba night Seattle'],
    },
    {
      title: 'Affordable Luxury Indian Weddings in Seattle | Premium Experience',
      description: 'Experience affordable luxury for your Indian wedding in Seattle. Premium venues, decor, and services at competitive prices.',
      url: '/services/affordable-luxury-indian-weddings',
      keywords: ['luxury Indian wedding', 'premium Indian wedding Seattle', 'high-end Indian wedding'],
    },
    {
      title: 'Indian Wedding Venue Selection in Seattle | Perfect Locations',
      description: 'Find the perfect venue for your Indian wedding in Seattle. Expert guidance on selecting locations that accommodate cultural requirements.',
      url: '/services/venue-selection',
      keywords: ['Indian wedding venues', 'Seattle wedding locations', 'mandap-friendly venues'],
    },
    // New service pages
    {
      title: 'Destination Indian Weddings | Exotic Locations with Seattle Planning',
      description: 'Plan your dream destination Indian wedding with Seattle-based expertise. We coordinate exotic locations while maintaining authentic traditions.',
      url: '/services/destination-indian-weddings',
      keywords: ['destination Indian wedding', 'exotic Indian wedding', 'international Indian wedding planning'],
    },
    {
      title: 'Indian Wedding Decor & Mandap Design | Luxury Ceremonial Spaces',
      description: 'Create stunning mandap designs and luxury decor for your Indian wedding. Custom ceremonial spaces that blend tradition with modern aesthetics.',
      url: '/services/mandap-design',
      keywords: ['wedding mandap design', 'luxury Indian wedding decor', 'custom mandap Seattle'],
    },
    {
      title: 'Mehndi & Sangeet Planning | Pre-Wedding Celebration Experts',
      description: 'Plan unforgettable mehndi and sangeet celebrations with our pre-wedding event expertise. Authentic cultural experiences with modern touches.',
      url: '/services/mehndi-sangeet-planning',
      keywords: ['mehndi ceremony planning', 'sangeet night Seattle', 'pre-wedding Indian events'],
    },
  ],
  
  // New Pages
  newPages: [
    {
      title: 'Indian Wedding Budget Calculator | Plan Your Seattle Wedding',
      description: 'Plan your perfect Indian wedding with our interactive budget calculator. Estimate costs for venue, catering, decor, attire, and more based on your guest count.',
      url: '/wedding-calculator',
      keywords: ['Indian wedding budget', 'wedding cost calculator', 'Indian wedding planning tool'],
    },
    {
      title: 'Indian Wedding Traditions & Customs | Cultural Wedding Guide',
      description: 'Explore the rich cultural heritage of Indian wedding traditions. Learn about Hindu, Sikh, Muslim, and South Indian wedding rituals and their modern adaptations.',
      url: '/traditions',
      keywords: ['Indian wedding traditions', 'Hindu wedding customs', 'Indian wedding rituals'],
    },
    {
      title: 'Indian Wedding Gallery | Inspiration for Your Special Day',
      description: 'Browse our gallery of stunning Indian weddings in Seattle. Get inspiration for ceremonies, decor, food, and attire for your perfect Indian wedding.',
      url: '/gallery',
      keywords: ['Indian wedding photos', 'wedding inspiration gallery', 'Indian wedding decor ideas'],
    },
    // New content pages
    {
      title: 'Indian Wedding Attire Guide | Traditional & Modern Outfits',
      description: 'Complete guide to Indian wedding attire for brides, grooms, and guests. Explore traditional and modern outfit options for different ceremonies.',
      url: '/attire-guide',
      keywords: ['Indian wedding attire', 'bridal lehenga guide', 'groom sherwani', 'wedding saree'],
    },
    {
      title: 'Indian Wedding Food & Catering | Authentic Cuisine Options',
      description: 'Discover the best Indian wedding catering options in Seattle. From traditional regional cuisines to modern fusion menus for your special day.',
      url: '/catering-guide',
      keywords: ['Indian wedding catering', 'Indian wedding food', 'vegetarian wedding menu', 'Seattle Indian caterers'],
    },
    {
      title: 'Wedding Planning Timeline | 12-Month Indian Wedding Checklist',
      description: 'Stay organized with our comprehensive 12-month Indian wedding planning timeline. Month-by-month checklist for a stress-free planning experience.',
      url: '/planning-timeline',
      keywords: ['Indian wedding timeline', 'wedding planning checklist', 'month by month wedding planning'],
    },
    {
      title: 'Indian Wedding Invitation Guide | Traditional & Modern Designs',
      description: 'Explore beautiful Indian wedding invitation designs, wording samples, and etiquette. From traditional cards to modern digital invitations.',
      url: '/invitation-guide',
      keywords: ['Indian wedding invitations', 'wedding card designs', 'invitation wording samples'],
    },
  ],
  
  // Local SEO
  localSEO: {
    city: 'Seattle',
    region: 'WA',
    country: 'USA',
    zipCodes: ['98101', '98102', '98103', '98104', '98105', '98106', '98107', '98108', '98109', '98112', '98115', '98116', '98117', '98118', '98119', '98121', '98122', '98125', '98126', '98133', '98134', '98136', '98144', '98154', '98164', '98174', '98177', '98178', '98195', '98199'],
    neighborhoods: ['Downtown', 'Capitol Hill', 'Ballard', 'Fremont', 'Queen Anne', 'Belltown', 'South Lake Union', 'University District', 'Wallingford', 'Green Lake', 'Magnolia', 'West Seattle', 'Beacon Hill', 'Columbia City', 'Rainier Valley', 'Northgate', 'Greenwood', 'Phinney Ridge', 'Madison Park', 'Leschi', 'Mount Baker', 'Seward Park', 'Alki', 'Admiral', 'Fauntleroy'],
    nearbyAreas: ['Bellevue', 'Redmond', 'Kirkland', 'Renton', 'Mercer Island', 'Shoreline', 'Edmonds', 'Lynnwood', 'Bothell', 'Woodinville', 'Issaquah', 'Sammamish', 'Newcastle', 'Kent', 'Federal Way', 'Tacoma', 'Everett'],
    venues: [
      'Four Seasons Hotel Seattle',
      'The Edgewater Hotel',
      'Fairmont Olympic Hotel',
      'Hyatt Regency Lake Washington',
      'Willows Lodge',
      'Bellevue Hyatt Regency',
      'Westin Bellevue',
      'Meydenbauer Center',
      'Bell Harbor Conference Center',
      'Columbia Tower Club',
      'Newcastle Golf Club',
      'Fremont Foundry',
      'Within Sodo',
      'The Sanctuary Seattle',
      'Rosehill Community Center',
      'Woodland Park Zoo',
      'Seattle Aquarium',
      'Museum of Flight',
      'Chihuly Garden and Glass',
      'Olympic Sculpture Park',
    ],
  },
  
  // Wedding-specific schema
  weddingSchema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Indian Wedding Planning Services',
    serviceType: 'Wedding Planning',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Seattle Shaadi',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Wedding Lane',
        addressLocality: 'Seattle',
        addressRegion: 'WA',
        postalCode: '98101',
        addressCountry: 'US',
      },
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 47.6062,
        longitude: -122.3321,
      },
      geoRadius: '50mi',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Indian Wedding Packages',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Full Indian Wedding Planning',
            description: 'Comprehensive planning services for your entire Indian wedding journey.',
          },
          price: '5000.00',
          priceCurrency: 'USD',
          url: 'https://seattleshaadi.com/services/full-planning',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Day-of Indian Wedding Coordination',
            description: 'Professional coordination on your wedding day to ensure everything runs smoothly.',
          },
          price: '1500.00',
          priceCurrency: 'USD',
          url: 'https://seattleshaadi.com/services/day-of-coordination',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Indian Wedding Decor Package',
            description: 'Beautiful, culturally authentic decor for your Indian wedding ceremony and reception.',
          },
          price: '3000.00',
          priceCurrency: 'USD',
          url: 'https://seattleshaadi.com/services/decor-package',
        },
      ],
    },
  },
};

export default enhancedSeoConfig;

