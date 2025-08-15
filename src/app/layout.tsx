import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import { enhancedSeoConfig } from '@/lib/enhanced-seo-config';
import { AnimationProvider } from '@/hooks/use-animation-preferences';
import { MobileNav } from '@/components/mobile-nav';
import Script from 'next/script';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

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

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: enhancedSeoConfig.defaultTitle,
    template: `%s | ${enhancedSeoConfig.siteName}`,
  },
  description: enhancedSeoConfig.defaultDescription,
  keywords: enhancedSeoConfig.keywords.join(', '),
  authors: [{ name: 'Seattle Shaadi Team' }],
  creator: 'Seattle Shaadi',
  publisher: 'Seattle Shaadi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(enhancedSeoConfig.siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    ...enhancedSeoConfig.openGraph,
    title: enhancedSeoConfig.defaultTitle,
    description: enhancedSeoConfig.defaultDescription,
  },
  twitter: {
    ...enhancedSeoConfig.twitter,
    title: enhancedSeoConfig.defaultTitle,
    description: enhancedSeoConfig.defaultDescription,
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
};

// Add viewport export to fix warnings
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f0e3' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/patterns/mandala-pattern.svg" />
        <link rel="preload" as="image" href="/patterns/paisley-pattern.svg" />
        
        {/* Structured data for wedding service */}
        <Script
          id="structured-data-wedding"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(enhancedSeoConfig.weddingSchema)
          }}
        />
        
        {/* Structured data for FAQ */}
        <Script
          id="structured-data-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(enhancedSeoConfig.structuredData.faq)
          }}
        />
        
        {/* Structured data for local business */}
        <Script
          id="structured-data-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(enhancedSeoConfig.structuredData.localBusiness)
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AnimationProvider>
          <div className="paisley-pattern">
            <Header />
            {children}
            <MobileNav />
            <Footer />
          </div>
        </AnimationProvider>
      </body>
    </html>
  );
}

