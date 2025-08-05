import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimationPreferencesProvider } from "@/hooks/use-animation-preferences";
import Script from 'next/script';
import { siteConfig } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Seattle wedding planner", "Indian wedding planner", "South Asian weddings", "luxury weddings Seattle", "destination weddings"],
  authors: [{ name: "Seattle Shaadi Team", url: siteConfig.url }],
  creator: "Seattle Shaadi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.jpg`],
    creator: "@SeattleShaadi", // Replace with actual Twitter handle
  },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-96x96.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/favicon/site.webmanifest`,
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Seattle Shaadi",
  "url": siteConfig.url,
  "logo": `${siteConfig.url}/Logo-new.webp`,
  "sameAs": [
    // Add social media profile URLs here
    // "https://www.facebook.com/seattleshaadi",
    // "https://www.instagram.com/seattleshaadi",
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": siteConfig.url,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteConfig.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${lato.variable} !scroll-smooth`} suppressHydrationWarning>
       <head>
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
