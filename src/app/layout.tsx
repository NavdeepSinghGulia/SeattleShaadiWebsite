import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
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

export const metadata: Metadata = {
  ...generateMetadata(),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
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
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//www.googletagmanager.com" />
          <link rel="dns-prefetch" href="//www.google-analytics.com" />
          
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
