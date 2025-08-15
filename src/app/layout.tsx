import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { AnimationProvider } from '@/hooks/use-animation-preferences';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: {
    default: 'Indian Wedding Planner | Luxury Wedding Services in Seattle',
    template: '%s | Indian Wedding Planner',
  },
  description: 'Luxury Indian wedding planning services in Seattle. Specializing in traditional Hindu, Sikh, Muslim, and South Indian wedding ceremonies with modern touches.',
  keywords: 'Indian wedding, wedding planner, Seattle, luxury wedding, Hindu wedding, Sikh wedding, Muslim wedding, South Indian wedding',
  authors: [{ name: 'Indian Wedding Planner Team' }],
  creator: 'Indian Wedding Planner',
  publisher: 'Indian Wedding Planner',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://indianweddingsite.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    title: 'Indian Wedding Planner | Luxury Wedding Services in Seattle',
    description: 'Luxury Indian wedding planning services in Seattle. Specializing in traditional Hindu, Sikh, Muslim, and South Indian wedding ceremonies with modern touches.',
    url: 'https://indianweddingsite.com',
    siteName: 'Indian Wedding Planner',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Indian Wedding Planner',
      },
    ],
    locale: 'en_US',
    type: 'website',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Indian Wedding Planner | Luxury Wedding Services in Seattle',
    description: 'Luxury Indian wedding planning services in Seattle. Specializing in traditional Hindu, Sikh, Muslim, and South Indian wedding ceremonies with modern touches.',
    creator: '@IndianWeddingPlanner',
    images: ['/images/og-default.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
    other: {
      me: ['support@indianweddingsite.com'],
    },
  },
  category: 'Wedding Planning',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/playfair-display-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Meta tags for better SEO and social sharing */}
        <meta name="theme-color" content="#d4af37" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  )
}

