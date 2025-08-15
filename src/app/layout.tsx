import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { enhancedSeoConfig } from '@/lib/enhanced-seo-config';
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
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}

