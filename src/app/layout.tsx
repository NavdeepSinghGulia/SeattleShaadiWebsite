import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimationPreferencesProvider } from "@/hooks/use-animation-preferences";
import Script from 'next/script';
import { homeMetadata } from '@/lib/metadata';
import { localBusinessSchema, websiteSchema, weddingPlanningServiceSchema } from '@/lib/structured-data';
import { WebVitalsTracker } from '@/components/web-vitals-tracker';

export const metadata = homeMetadata;

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
  weight: ['400', '700'],
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

// Structured data schemas are now imported from structured-data.ts

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${lato.variable} !scroll-smooth`} suppressHydrationWarning>
       <head>
          {/* Enhanced Structured Data */}
          <Script
            id="local-business-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          />
          <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
          <Script
            id="wedding-service-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(weddingPlanningServiceSchema) }}
          />
          
          {/* Google Analytics with Enhanced Tracking */}
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
                  custom_map: {
                    'custom_parameter_1': 'page_type',
                    'custom_parameter_2': 'user_engagement'
                  }
                });
                
                // Enhanced ecommerce tracking for wedding inquiries
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  send_page_view: true,
                  anonymize_ip: true,
                  allow_google_signals: true,
                  allow_ad_personalization_signals: false
                });
              `,
            }}
          />
          
          {/* Preconnect to external domains for performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          
          {/* DNS prefetch for performance */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//www.google-analytics.com" />
      </head>
      <body className="font-body antialiased bg-background overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimationPreferencesProvider>
            <WebVitalsTracker />
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </AnimationPreferencesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
