/**
 * Blog Content Strategy for SEO Dominance
 * 
 * Comprehensive content plan to rank #1 for Indian wedding planning
 * keywords in Seattle and USA markets.
 */

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  targetWordCount: number;
  contentOutline: string[];
  publishDate: string;
  category: string;
  tags: string[];
  featured: boolean;
}

// High-priority blog posts for immediate SEO impact
export const priorityBlogPosts: BlogPost[] = [
  {
    slug: 'best-indian-wedding-planner-seattle-guide',
    title: 'Best Indian Wedding Planner in Seattle: Complete 2024 Guide',
    metaDescription: 'Find Seattle\'s top-rated Indian wedding planner. Expert Hindu & Sikh wedding coordination, venue selection, and authentic cultural celebrations. 127+ five-star reviews.',
    primaryKeyword: 'best Indian wedding planner Seattle',
    secondaryKeywords: [
      'Indian wedding coordinator Seattle',
      'Hindu wedding planner Seattle',
      'Sikh wedding planner Seattle',
      'Seattle Indian wedding services'
    ],
    targetWordCount: 3000,
    contentOutline: [
      'Why Choose a Specialized Indian Wedding Planner in Seattle',
      'What Makes Seattle Shaadi the Best Choice',
      'Hindu Wedding Planning Services in Seattle',
      'Sikh Wedding Planning Services in Seattle',
      'Indian Wedding Venues in Seattle',
      'Traditional Indian Wedding Decorations',
      'Indian Wedding Catering Options in Seattle',
      'Client Testimonials and Reviews',
      'Pricing and Packages',
      'How to Book Your Consultation'
    ],
    publishDate: '2024-01-15',
    category: 'Wedding Planning',
    tags: ['Indian Wedding', 'Seattle', 'Wedding Planner', 'Hindu Wedding', 'Sikh Wedding'],
    featured: true
  },
  
  {
    slug: 'indian-wedding-venues-seattle-complete-guide',
    title: 'Top 15 Indian Wedding Venues in Seattle: 2024 Complete Guide',
    metaDescription: 'Discover the best Indian wedding venues in Seattle. From luxury hotels to cultural centers, find the perfect location for your Hindu or Sikh wedding ceremony.',
    primaryKeyword: 'Indian wedding venues Seattle',
    secondaryKeywords: [
      'Hindu wedding venues Seattle',
      'Sikh wedding venues Seattle',
      'Indian wedding halls Seattle',
      'Seattle wedding venues for Indian weddings'
    ],
    targetWordCount: 2500,
    contentOutline: [
      'Luxury Hotel Venues for Indian Weddings',
      'Cultural Centers and Community Halls',
      'Outdoor Venues for Indian Wedding Ceremonies',
      'Banquet Halls with Indian Wedding Experience',
      'Venue Capacity and Guest Considerations',
      'Catering and Decoration Policies',
      'Pricing and Booking Information',
      'Venue Selection Checklist',
      'How Seattle Shaadi Can Help with Venue Selection'
    ],
    publishDate: '2024-01-20',
    category: 'Venues',
    tags: ['Wedding Venues', 'Seattle', 'Indian Wedding', 'Venue Selection'],
    featured: true
  },
  
  {
    slug: 'hindu-wedding-ceremony-planning-seattle',
    title: 'Hindu Wedding Ceremony Planning in Seattle: Traditional & Modern Guide',
    metaDescription: 'Plan your perfect Hindu wedding ceremony in Seattle. Expert guidance on traditions, rituals, mandap decoration, and authentic cultural celebrations.',
    primaryKeyword: 'Hindu wedding ceremony planning Seattle',
    secondaryKeywords: [
      'Hindu wedding planner Seattle',
      'Hindu wedding traditions Seattle',
      'Hindu wedding rituals Seattle',
      'mandap decoration Seattle'
    ],
    targetWordCount: 2800,
    contentOutline: [
      'Understanding Hindu Wedding Traditions',
      'Pre-Wedding Ceremonies and Rituals',
      'The Sacred Wedding Ceremony',
      'Mandap Design and Decoration',
      'Traditional Hindu Wedding Attire',
      'Hindu Wedding Music and Entertainment',
      'Incorporating Modern Elements',
      'Timeline for Hindu Wedding Planning',
      'Working with Hindu Wedding Specialists'
    ],
    publishDate: '2024-01-25',
    category: 'Hindu Weddings',
    tags: ['Hindu Wedding', 'Wedding Ceremony', 'Indian Traditions', 'Seattle'],
    featured: true
  },
  
  {
    slug: 'sikh-wedding-ceremony-planning-seattle',
    title: 'Sikh Wedding Ceremony Planning in Seattle: Anand Karaj Guide',
    metaDescription: 'Plan your authentic Sikh wedding ceremony in Seattle. Expert Anand Karaj coordination, gurdwara ceremonies, and traditional Sikh wedding celebrations.',
    primaryKeyword: 'Sikh wedding ceremony planning Seattle',
    secondaryKeywords: [
      'Sikh wedding planner Seattle',
      'Anand Karaj Seattle',
      'Sikh wedding traditions Seattle',
      'gurdwara wedding Seattle'
    ],
    targetWordCount: 2600,
    contentOutline: [
      'Understanding Sikh Wedding Traditions',
      'The Anand Karaj Ceremony',
      'Gurdwara Wedding Requirements',
      'Pre-Wedding Sikh Ceremonies',
      'Traditional Sikh Wedding Attire',
      'Sikh Wedding Music and Kirtan',
      'Reception Planning for Sikh Weddings',
      'Working with Sikh Wedding Specialists',
      'Timeline and Planning Checklist'
    ],
    publishDate: '2024-02-01',
    category: 'Sikh Weddings',
    tags: ['Sikh Wedding', 'Anand Karaj', 'Indian Traditions', 'Seattle'],
    featured: true
  },
  
  {
    slug: 'indian-wedding-planning-cost-seattle-2024',
    title: 'Indian Wedding Planning Cost in Seattle: 2024 Budget Guide',
    metaDescription: 'Complete breakdown of Indian wedding planning costs in Seattle. Budget-friendly to luxury options, vendor pricing, and money-saving tips from expert planners.',
    primaryKeyword: 'Indian wedding planning cost Seattle',
    secondaryKeywords: [
      'Indian wedding budget Seattle',
      'affordable Indian wedding planner Seattle',
      'luxury Indian wedding Seattle',
      'Indian wedding pricing Seattle'
    ],
    targetWordCount: 2200,
    contentOutline: [
      'Average Indian Wedding Costs in Seattle',
      'Budget Breakdown by Category',
      'Venue Costs for Indian Weddings',
      'Catering and Food Expenses',
      'Decoration and Floral Costs',
      'Photography and Videography Pricing',
      'Entertainment and Music Costs',
      'Money-Saving Tips and Strategies',
      'How a Wedding Planner Saves You Money'
    ],
    publishDate: '2024-02-05',
    category: 'Budget Planning',
    tags: ['Wedding Budget', 'Indian Wedding', 'Cost Planning', 'Seattle'],
    featured: false
  }
];

// Additional blog posts for long-term SEO strategy
export const additionalBlogPosts: BlogPost[] = [
  {
    slug: 'indian-wedding-decorations-seattle-trends-2024',
    title: 'Indian Wedding Decorations in Seattle: 2024 Trends & Ideas',
    metaDescription: 'Discover the latest Indian wedding decoration trends in Seattle. From traditional mandap designs to modern floral arrangements for your perfect celebration.',
    primaryKeyword: 'Indian wedding decorations Seattle',
    secondaryKeywords: [
      'Indian wedding decor Seattle',
      'mandap decoration Seattle',
      'Indian wedding flowers Seattle',
      'wedding decoration services Seattle'
    ],
    targetWordCount: 2000,
    contentOutline: [
      'Traditional vs Modern Indian Wedding Decor',
      'Mandap Design Trends 2024',
      'Floral Arrangements for Indian Weddings',
      'Color Schemes and Themes',
      'Lighting for Indian Wedding Ceremonies',
      'DIY vs Professional Decoration Services',
      'Seasonal Decoration Considerations',
      'Budget-Friendly Decoration Ideas'
    ],
    publishDate: '2024-02-10',
    category: 'Decorations',
    tags: ['Wedding Decorations', 'Indian Wedding', 'Trends', 'Seattle'],
    featured: false
  },
  
  {
    slug: 'indian-wedding-catering-seattle-guide',
    title: 'Indian Wedding Catering in Seattle: Complete Menu Guide',
    metaDescription: 'Find the best Indian wedding catering in Seattle. Authentic cuisine options, menu planning, and top-rated caterers for your special day.',
    primaryKeyword: 'Indian wedding catering Seattle',
    secondaryKeywords: [
      'Indian wedding food Seattle',
      'Indian wedding menu Seattle',
      'Indian caterers Seattle',
      'wedding catering services Seattle'
    ],
    targetWordCount: 2300,
    contentOutline: [
      'Popular Indian Wedding Menu Options',
      'Regional Cuisine Considerations',
      'Vegetarian and Vegan Options',
      'Dietary Restrictions and Allergies',
      'Catering Service Styles',
      'Top Indian Caterers in Seattle',
      'Menu Planning Timeline',
      'Catering Cost Considerations'
    ],
    publishDate: '2024-02-15',
    category: 'Catering',
    tags: ['Wedding Catering', 'Indian Food', 'Menu Planning', 'Seattle'],
    featured: false
  }
];

// Content calendar for consistent publishing
export const contentCalendar = {
  january: [
    'best-indian-wedding-planner-seattle-guide',
    'indian-wedding-venues-seattle-complete-guide'
  ],
  february: [
    'hindu-wedding-ceremony-planning-seattle',
    'sikh-wedding-ceremony-planning-seattle',
    'indian-wedding-planning-cost-seattle-2024'
  ],
  march: [
    'indian-wedding-decorations-seattle-trends-2024',
    'indian-wedding-catering-seattle-guide'
  ]
};

// SEO optimization guidelines for blog content
export const seoGuidelines = {
  titleLength: { min: 50, max: 60 },
  metaDescriptionLength: { min: 150, max: 160 },
  headingStructure: {
    h1: 1, // Only one H1 per page
    h2: '3-6', // 3-6 H2 headings
    h3: '5-10' // 5-10 H3 headings
  },
  keywordDensity: {
    primary: '1.5%',
    secondary: '1.0%',
    related: '0.5%'
  },
  internalLinks: {
    minimum: 3,
    recommended: 5-8
  },
  externalLinks: {
    minimum: 2,
    recommended: 3-5
  },
  imageOptimization: {
    altText: 'Always include keyword-rich alt text',
    fileNames: 'Use descriptive, keyword-rich file names',
    compression: 'Optimize for web (under 100KB)',
    format: 'WebP preferred, JPG acceptable'
  }
};

// Call-to-action templates for blog posts
export const ctaTemplates = [
  {
    type: 'consultation',
    text: 'Ready to plan your dream Indian wedding in Seattle? Contact Seattle Shaadi today for a free consultation and let our expert team create your perfect celebration.',
    button: 'Schedule Free Consultation'
  },
  {
    type: 'portfolio',
    text: 'See how Seattle Shaadi has created magical Indian weddings across the Pacific Northwest. Browse our portfolio of stunning celebrations.',
    button: 'View Our Portfolio'
  },
  {
    type: 'services',
    text: 'Discover our comprehensive Indian wedding planning services. From intimate ceremonies to grand celebrations, we handle every detail.',
    button: 'Explore Our Services'
  }
];

