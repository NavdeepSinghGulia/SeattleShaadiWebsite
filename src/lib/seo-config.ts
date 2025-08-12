import { Metadata } from 'next';

export const siteConfig = {
  name: "Seattle Shaadi - Best Indian Wedding Planner in Seattle",
  description: "Seattle's #1 Indian wedding planner specializing in Hindu, Sikh, and traditional Indian weddings. Expert coordination, authentic cultural celebrations, and luxury wedding planning services across Washington State and USA. Top-rated Indian wedding coordinator with 127+ five-star reviews.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://seattleshaadi.com",
  ogImage: "/images/seo/shaadi-squad-og-image.png",
  keywords: [
    // Primary high-value keywords (most important)
    "best Indian wedding planner Seattle",
    "Indian wedding planner USA",
    "Seattle Shaadi wedding planning",
    "Hindu wedding planner Seattle",
    "Sikh wedding planner Seattle",
    
    // Location-based keywords (local SEO)
    "Indian wedding coordinator Seattle",
    "Indian wedding planner Washington State",
    "Indian wedding planner Pacific Northwest",
    "Indian wedding planner near me Seattle",
    "Indian wedding planner Bellevue",
    "Indian wedding planner Tacoma",
    "Indian wedding planner Everett",
    "Indian wedding planner Spokane",
    
    // Service-based keywords (high intent)
    "Indian wedding planning services Seattle",
    "traditional Indian wedding Seattle",
    "Indian wedding venue selection Seattle",
    "Indian wedding decoration Seattle",
    "Indian wedding catering Seattle",
    "luxury Indian wedding planner Seattle",
    "affordable Indian wedding planner Seattle",
    
    // Long-tail keywords (lower competition)
    "experienced Indian wedding coordinator Seattle",
    "certified Indian wedding planner Seattle",
    "top rated Indian wedding planner Seattle",
    "Indian wedding planner reviews Seattle",
    
    // Cultural and ceremony keywords
    "Hindu wedding ceremony planning Seattle",
    "Sikh wedding ceremony planning Seattle",
    "Indian wedding traditions Seattle",
    "authentic Indian wedding Seattle",
    "cultural wedding ceremonies Seattle",
    "Indian wedding mandap decoration Seattle",
    
    // Competitive keywords
    "Seattle wedding planner",
    "luxury weddings Seattle",
    "destination weddings",
    "wedding planning services",
    "Seattle Indian weddings",
    "multicultural weddings Seattle",
    "wedding coordination Seattle",
    "Seattle wedding services",
    "Seattle bridal services",
    "Seattle wedding venues",
    "multicultural wedding planning",
    "Seattle event planning"
  ],
  authors: [{ name: "Seattle Shaadi Team", url: "https://seattleshaadi.com" }],
  creator: "Seattle Shaadi - Premier Indian Wedding Planners",
  publisher: "Seattle Shaadi Wedding Planning Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Enhanced SEO properties for better ranking
  businessType: "Wedding Planning Service",
  serviceArea: "Seattle, Bellevue, Tacoma, Everett, Spokane, Washington State, USA",
  specialty: "Indian, Hindu, Sikh Wedding Planning",
  established: "2020",
  rating: "4.9/5",
  reviewCount: "127+",
  certifications: ["Certified Wedding Planner", "WeddingWire Couples Choice Award"],
  languages: ["English", "Hindi", "Punjabi"],
  priceRange: "$5,000 - $25,000+"
};

export function generateMetadata({
  title,
  description,
  image,
  pathname,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  pathname?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const seo = {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    image: image ? `${siteConfig.url}${image}` : `${siteConfig.url}${siteConfig.ogImage}`,
    url: `${siteConfig.url}${pathname || ''}`,
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    formatDetection: siteConfig.formatDetection,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: seo.url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: seo.url,
      title: seo.title,
      description: seo.description,
      siteName: siteConfig.name,
      images: [
        {
          url: seo.image,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.image],
      creator: "@SeattleShaadi",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_SITE_VERIFICATION,
    },
    other: {
      'theme-color': '#d97706',
      'color-scheme': 'light dark',
      'format-detection': 'telephone=no',
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && {
        'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      }),
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'Seattle Shaadi',
      'application-name': 'Seattle Shaadi',
      'msapplication-TileColor': '#d97706',
      'msapplication-config': '/favicon/browserconfig.xml',
      'msapplication-tooltip': 'Seattle Shaadi - Premier Wedding Planning',
      'msapplication-starturl': '/',
      'msapplication-tap-highlight': 'no',
    },
  };
}
