import type { Metadata } from 'next';
// Updated global layout with enhanced SEO, performance hints, and structured data

import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimationPreferencesProvider } from "@/hooks/use-animation-preferences";
import { Analytics, PerformanceMonitor } from "@/components/analytics";
import Script from 'next/script';
import { Suspense } from 'react';
import { ErrorReportingInitializer } from "@/components/error-reporting-initializer";
import { siteConfig, generateMetadata } from '@/lib/seo-config';
import { SchemaMarkup } from '@/components/schema-markup';
import { 
  organizationSchema, 
  localBusinessSchema, 
  websiteSchema, 
  weddingPlanningServiceSchema 
} from '@/lib/schema';
import ErrorBoundary from '@/components/error-boundary';
import { PageLoadingFallback } from '@/components/loading-fallback';

// Fallback font declarations
let playfairDisplay = { variable: '--font-playfair-display' };
let lato = { variable: '--font-lato' };

// Try to load Google Fonts with graceful fallback
try {
  const { Playfair_Display, Lato } = require('next/font/google');
  
  playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair-display',
    display: 'swap',
    weight: ['400', '700'],
    fallback: ['serif']
  });

  lato = Lato({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-lato',
    display: 'swap',
    fallback: ['sans-serif']
  });
} catch (error) {
  console.warn('Google Fonts could not be loaded, using fallback fonts');
}

export const metadata: Metadata = {
  ...generateMetadata({
    title: "Best Indian Wedding Planner in Seattle | Seattle Shaadi",
    description: "Seattle's #1 rated Indian wedding planner with 127+ five-star reviews. Expert Hindu, Sikh & traditional Indian wedding coordination across Washington State. Free consultation available.",
  }),
  title: {
    default: "Best Indian Wedding Planner in Seattle | Seattle Shaadi",
    template: `%s | Seattle Shaadi - Best Indian Wedding Planner Seattle`,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

// Schema markup is now imported from /lib/schema.ts

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${lato.variable} !scroll-smooth`} suppressHydrationWarning>
       <head>
          {/* Preload critical resources for better performance */}
          <link rel="preload" href="/images/seo/shaadi-squad-og-image.png" as="image" type="image/png" />
          <link rel="preload" href="/images/branding/logos/shaadi-squad-high-resolution-logo-transparent.png" as="image" type="image/png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//www.googletagmanager.com" />
          <link rel="dns-prefetch" href="//www.google-analytics.com" />
          
          {/* Additional SEO meta tags */}
          <meta name="theme-color" content="#d4af37" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="format-detection" content="telephone=no" />
          
          {/* Comprehensive Schema Markup */}
          <SchemaMarkup 
            schema={[
              organizationSchema,
              localBusinessSchema,
              websiteSchema,
              weddingPlanningServiceSchema
            ]} 
            id="global-schema"
          />
          
          {/* Google Analytics */}
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
          <Script
            id="ga-init"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
      </head>
      <body className="font-body antialiased bg-background overflow-x-hidden">
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AnimationPreferencesProvider>
              <ErrorReportingInitializer />
              <Suspense fallback={null}>
                <Analytics />
              </Suspense>
              <PerformanceMonitor />
              
              <ErrorBoundary>
                <Header />
              </ErrorBoundary>
              
              <main>
                <ErrorBoundary>
                  <Suspense fallback={<PageLoadingFallback />}>
                    {children}
                  </Suspense>
                </ErrorBoundary>
              </main>
              
              <ErrorBoundary>
                <Footer />
              </ErrorBoundary>
              
              <Toaster />
            </AnimationPreferencesProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
