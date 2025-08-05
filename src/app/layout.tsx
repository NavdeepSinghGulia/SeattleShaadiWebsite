import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimationPreferencesProvider } from "@/hooks/use-animation-preferences";
import { generateMetadata as generateSEOMetadata } from '@/lib/metadata';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';

export const metadata: Metadata = generateSEOMetadata();

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${lato.variable} !scroll-smooth`} suppressHydrationWarning>
       <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
          <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className="font-body antialiased bg-background overflow-x-hidden">
        <GoogleAnalytics />
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
