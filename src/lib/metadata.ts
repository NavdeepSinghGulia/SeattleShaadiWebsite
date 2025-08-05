import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: string[];
    type?: 'website' | 'article' | 'profile';
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image';
    title?: string;
    description?: string;
    images?: string[];
  };
}

const defaultSEO: SEOConfig = {
  title: 'Seattle Shaadi - Premier Indian Wedding Planning Services',
  description: 'Transform your dream wedding into reality with Seattle Shaadi. Expert Indian wedding planning services in Seattle, WA. Traditional ceremonies, modern celebrations, unforgettable memories.',
  keywords: [
    'Seattle wedding planner',
    'Indian wedding planning',
    'Seattle Indian weddings',
    'wedding coordinator Seattle',
    'traditional Indian ceremonies',
    'wedding planning services',
    'Seattle Shaadi',
    'South Asian weddings',
    'Hindu wedding planner',
    'Sikh wedding planner'
  ],
  openGraph: {
    type: 'website',
    images: ['/Homepage_main.jpeg']
  },
  twitter: {
    card: 'summary_large_image'
  }
};

export const siteConfig = {
  name: 'Seattle Shaadi',
  description: 'Premier Indian Wedding Planning Services in Seattle',
  url: 'https://seattleshaadi.com', // Update with actual domain
  ogImage: '/Homepage_main.jpeg',
  creator: '@seattleshaadi', // Update with actual Twitter handle
  keywords: defaultSEO.keywords,
};

export function generateMetadata(config: Partial<SEOConfig> = {}): Metadata {
  const seo = { ...defaultSEO, ...config };
  
  const title = seo.title;
  const description = seo.description;
  const canonical = seo.canonical || siteConfig.url;
  
  return {
    title,
    description,
    keywords: seo.keywords?.join(', '),
    authors: [{ name: 'Seattle Shaadi' }],
    creator: siteConfig.creator,
    publisher: 'Seattle Shaadi',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical,
    },
    openGraph: {
      type: seo.openGraph?.type || 'website',
      locale: 'en_US',
      url: canonical,
      title: seo.openGraph?.title || title,
      description: seo.openGraph?.description || description,
      siteName: siteConfig.name,
      images: seo.openGraph?.images || [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: 'Seattle Shaadi - Premier Indian Wedding Planning',
        },
      ],
    },
    twitter: {
      card: seo.twitter?.card || 'summary_large_image',
      title: seo.twitter?.title || title,
      description: seo.twitter?.description || description,
      images: seo.twitter?.images || [siteConfig.ogImage],
      creator: siteConfig.creator,
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
      google: 'your-google-verification-code', // Replace with actual verification code
      yandex: 'your-yandex-verification-code', // Replace with actual verification code
      yahoo: 'your-yahoo-verification-code', // Replace with actual verification code
    },
  };
}

// Page-specific metadata configurations
export const pageMetadata = {
  home: {
    title: 'Seattle Shaadi - Premier Indian Wedding Planning Services',
    description: 'Transform your dream wedding into reality with Seattle Shaadi. Expert Indian wedding planning services in Seattle, WA. Traditional ceremonies, modern celebrations, unforgettable memories.',
    keywords: ['Seattle wedding planner', 'Indian wedding planning', 'Seattle Indian weddings', 'wedding coordinator Seattle'],
  },
  about: {
    title: 'About Us - Seattle Shaadi Wedding Planners',
    description: 'Meet the passionate team behind Seattle Shaadi. With years of experience in Indian wedding planning, we bring your vision to life with attention to detail and cultural authenticity.',
    keywords: ['about Seattle Shaadi', 'wedding planning team', 'Indian wedding experts', 'Seattle wedding coordinators'],
  },
  services: {
    title: 'Wedding Planning Services - Seattle Shaadi',
    description: 'Comprehensive Indian wedding planning services including venue selection, catering, decoration, photography, and traditional ceremony coordination. Complete wedding solutions in Seattle.',
    keywords: ['wedding planning services', 'Indian wedding services', 'Seattle wedding packages', 'wedding coordination'],
  },
  contact: {
    title: 'Contact Seattle Shaadi - Get Your Free Wedding Consultation',
    description: 'Ready to plan your dream Indian wedding? Contact Seattle Shaadi for a free consultation. Call us or fill out our form to start planning your perfect celebration.',
    keywords: ['contact Seattle Shaadi', 'wedding consultation', 'Seattle wedding planner contact', 'wedding planning inquiry'],
  },
  faq: {
    title: 'Frequently Asked Questions - Seattle Shaadi',
    description: 'Get answers to common questions about Indian wedding planning, our services, pricing, and timeline. Everything you need to know about planning your wedding with Seattle Shaadi.',
    keywords: ['wedding planning FAQ', 'Indian wedding questions', 'Seattle Shaadi FAQ', 'wedding planning guide'],
  },
  careers: {
    title: 'Careers - Join the Seattle Shaadi Team',
    description: 'Join our passionate team of wedding planning professionals. Explore career opportunities at Seattle Shaadi and help create unforgettable wedding experiences.',
    keywords: ['Seattle Shaadi careers', 'wedding planning jobs', 'Seattle wedding industry jobs'],
  },
  work: {
    title: 'Our Work - Seattle Shaadi Wedding Portfolio',
    description: 'Explore our stunning portfolio of Indian weddings planned by Seattle Shaadi. See real celebrations, happy couples, and the magic we create for each unique wedding.',
    keywords: ['Seattle Shaadi portfolio', 'Indian wedding gallery', 'wedding planning work', 'Seattle wedding photos'],
  },
  spotlight: {
    title: 'Wedding Spotlight - Featured Celebrations by Seattle Shaadi',
    description: 'Discover featured weddings and celebrations planned by Seattle Shaadi. Read love stories, see stunning photos, and get inspired for your own special day.',
    keywords: ['featured weddings', 'wedding spotlight', 'Seattle Shaadi weddings', 'real wedding stories'],
  },
  fun: {
    title: 'Wedding Fun & Ideas - Seattle Shaadi Blog',
    description: 'Get inspired with wedding ideas, tips, and fun content from Seattle Shaadi. Discover trends, traditions, and creative ideas for your Indian wedding celebration.',
    keywords: ['wedding ideas', 'Indian wedding tips', 'wedding blog', 'Seattle wedding trends'],
  },
};

