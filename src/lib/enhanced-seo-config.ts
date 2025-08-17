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
      title: 'Indian Wedding Traditions & Customs | Hindu, Sikh, Tamil, Telugu, Kannada, Malayalam',
      description: 'Explore Indian wedding traditions across Hindu, Sikh, Tamil, Telugu, Kannada, Malayalam, and Muslim cultures. Discover Jago, Oonjal, Talambralu, Thalikettu, Nalangu & more with modern adaptations.',
      url: '/traditions',
      keywords: ['Indian wedding traditions', 'Sikh Jago', 'Tamil Oonjal', 'Telugu Talambralu', 'Kannada Nalangu', 'Malayalam Thalikettu', 'Hindu pheras', 'Muslim Nikah', 'Seattle Indian wedding rituals'],
    },
    {
      title: 'Indian Wedding Gallery | Inspiration for Your Special Day',
      description: 'Browse our gallery of stunning Indian weddings in Seattle. Get inspiration for ceremonies, decor, food, and attire for your perfect Indian wedding.',
      url: '/gallery',
      keywords: ['Indian wedding photos', 'wedding inspiration gallery', 'Indian wedding decor ideas'],
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
  },
};

export default enhancedSeoConfig;
