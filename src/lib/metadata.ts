import { Metadata } from 'next';
import { siteConfig } from './utils';

interface SEOProps {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'service';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

export function generateMetadata({
  title,
  description,
  pathname = '',
  image = '/og-image.jpg',
  keywords = [],
  type = 'website',
  publishedTime,
  modifiedTime,
  authors = ['Seattle Shaadi Team']
}: SEOProps = {}): Metadata {
  const seo = {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    image: `${siteConfig.url}${image}`,
    url: `${siteConfig.url}${pathname}`,
  };

  // Enhanced keywords for wedding planning business
  const defaultKeywords = [
    'Seattle wedding planner',
    'Indian wedding planner Seattle',
    'South Asian weddings',
    'luxury weddings Seattle',
    'destination weddings',
    'wedding planning services',
    'Seattle Shaadi',
    'Pacific Northwest weddings',
    'multicultural weddings',
    'wedding coordination Seattle'
  ];

  const allKeywords = [...defaultKeywords, ...keywords];

  const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: seo.title,
    description: seo.description,
    keywords: allKeywords,
    authors: authors.map(name => ({ name, url: siteConfig.url })),
    creator: 'Seattle Shaadi',
    publisher: 'Seattle Shaadi',
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
    openGraph: {
      type: type,
      locale: 'en_US',
      url: seo.url,
      title: seo.title,
      description: seo.description,
      siteName: siteConfig.name,
      images: [
        {
          url: seo.image,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.image],
      creator: '@SeattleShaadi',
      site: '@SeattleShaadi',
    },
    alternates: {
      canonical: seo.url,
    },
    icons: {
      icon: [
        { url: '/favicon/favicon.ico' },
        { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      shortcut: '/favicon/favicon-96x96.png',
      apple: [
        { url: '/favicon/apple-touch-icon.png' },
        { url: '/favicon/apple-touch-icon-180x180.png', sizes: '180x180' },
      ],
    },
    manifest: '/favicon/site.webmanifest',
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };

  return metadata;
}

// Predefined metadata for common pages
export const homeMetadata = generateMetadata({
  title: 'Premier Seattle Wedding Planning | Luxury Indian & South Asian Weddings',
  description: 'Seattle\'s premier wedding planning company specializing in luxurious, culturally-rich South Asian and Indian weddings. Expert coordination, stunning venues, and unforgettable celebrations in the Pacific Northwest.',
  keywords: [
    'Seattle wedding venues',
    'Indian wedding traditions',
    'South Asian wedding customs',
    'luxury wedding planning',
    'multicultural wedding ceremonies',
    'wedding vendors Seattle',
    'bridal services Seattle',
    'wedding photography Seattle'
  ]
});

export const aboutMetadata = generateMetadata({
  title: 'About Us - The Team Behind Seattle Shaadi',
  description: 'Meet the passionate and experienced team of wedding planners at Seattle Shaadi. Learn about our philosophy of \'Regal Modernity\' and our commitment to creating your dream wedding.',
  pathname: '/about',
  keywords: [
    'wedding planning team',
    'Seattle wedding planners',
    'Indian wedding experts',
    'wedding coordination professionals',
    'luxury wedding specialists'
  ]
});

export const servicesMetadata = generateMetadata({
  title: 'Wedding Planning Services | Full-Service Wedding Coordination',
  description: 'Comprehensive wedding planning services including venue selection, vendor coordination, cultural ceremony planning, and day-of coordination. Specializing in Indian and South Asian weddings in Seattle.',
  pathname: '/services',
  type: 'service',
  keywords: [
    'wedding planning services',
    'venue selection',
    'vendor coordination',
    'cultural ceremonies',
    'day-of coordination',
    'wedding design',
    'event management'
  ]
});

export const contactMetadata = generateMetadata({
  title: 'Contact Us | Seattle Wedding Planning Consultation',
  description: 'Ready to plan your dream wedding? Contact Seattle Shaadi for a consultation. Serving Seattle, Bellevue, Tacoma, and the greater Pacific Northwest region.',
  pathname: '/contact',
  keywords: [
    'wedding consultation',
    'Seattle wedding planner contact',
    'wedding planning inquiry',
    'Pacific Northwest weddings',
    'Bellevue wedding planner',
    'Tacoma wedding services'
  ]
});

