import { Metadata } from 'next';

export const siteConfig = {
  name: "Seattle Shaadi",
  description: "Seattle's premier wedding planning company specializing in luxurious, culturally-rich Indian weddings. Expert wedding planners creating unforgettable celebrations in the Pacific Northwest.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://seattleshaadi.com",
  ogImage: "/images/seo/shaadi-squad-og-image.png",
  keywords: [
    "Seattle wedding planner",
    "Indian wedding planner Seattle",
    "luxury weddings Seattle",
    "destination weddings",
    "wedding planning services",
    "Seattle Indian weddings",
    "Pacific Northwest weddings",
    "multicultural weddings Seattle",
    "Hindu wedding planner",
    "Sikh wedding planner",
    "wedding coordination Seattle",
    "Seattle wedding services",
    "Indian wedding traditions",
    "Bellevue wedding planner",
    "Tacoma wedding planner",
    "Everett wedding planner",
    "Washington state weddings",
    "Seattle bridal services",
    "Indian wedding decorations Seattle",
    "Seattle wedding venues",
    "multicultural wedding planning",
    "Seattle event planning",
    "luxury Indian weddings"
  ],
  authors: [{ name: "Seattle Shaadi Team", url: "https://seattleshaadi.com" }],
  creator: "Seattle Shaadi",
  publisher: "Seattle Shaadi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
