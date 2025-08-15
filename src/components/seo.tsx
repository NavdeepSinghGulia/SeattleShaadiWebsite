'use client';

import React from 'react';
import Head from 'next/head';

interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface OpenGraphData {
  title?: string;
  description?: string;
  url?: string;
  type?: string;
  images?: OpenGraphImage[];
  siteName?: string;
}

interface TwitterData {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
  title?: string;
  description?: string;
  image?: string;
}

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  openGraph?: OpenGraphData;
  twitter?: TwitterData;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: Record<string, any>;
  additionalMetaTags?: Array<{ name: string; content: string }>;
}

export function Seo({
  title,
  description,
  canonical,
  keywords,
  openGraph,
  twitter,
  noindex = false,
  nofollow = false,
  structuredData,
  additionalMetaTags = [],
}: SeoProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seattleshaadi.com';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  
  // Default OpenGraph data if not provided
  const defaultOpenGraph: OpenGraphData = {
    title: title,
    description: description,
    url: fullCanonical,
    type: 'website',
    siteName: 'Seattle Shaadi',
    images: [
      {
        url: `${baseUrl}/images/branding/shaadi-squad-og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Seattle Shaadi',
      },
    ],
  };
  
  // Merge provided OpenGraph data with defaults
  const mergedOpenGraph = {
    ...defaultOpenGraph,
    ...openGraph,
    images: openGraph?.images || defaultOpenGraph.images,
  };
  
  // Default Twitter data if not provided
  const defaultTwitter = {
    card: 'summary_large_image' as const,
    site: '@SeattleShaadi',
    title: title,
    description: description,
    image: mergedOpenGraph.images?.[0]?.url,
  };
  
  // Merge provided Twitter data with defaults
  const mergedTwitter = {
    ...defaultTwitter,
    ...twitter,
  };
  
  // Robots meta tag content
  const robotsContent = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'},max-image-preview:large,max-snippet:-1,max-video-preview:-1`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="robots" content={robotsContent} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={mergedOpenGraph.title || title} />
      <meta property="og:description" content={mergedOpenGraph.description || description} />
      <meta property="og:url" content={mergedOpenGraph.url} />
      <meta property="og:type" content={mergedOpenGraph.type} />
      <meta property="og:site_name" content={mergedOpenGraph.siteName} />
      
      {/* Open Graph Images */}
      {mergedOpenGraph.images?.map((image, index) => (
        <React.Fragment key={`og-image-${index}`}>
          <meta property="og:image" content={image.url} />
          {image.width && <meta property="og:image:width" content={image.width.toString()} />}
          {image.height && <meta property="og:image:height" content={image.height.toString()} />}
          {image.alt && <meta property="og:image:alt" content={image.alt} />}
        </React.Fragment>
      ))}
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={mergedTwitter.card} />
      {mergedTwitter.site && <meta name="twitter:site" content={mergedTwitter.site} />}
      {mergedTwitter.creator && <meta name="twitter:creator" content={mergedTwitter.creator} />}
      <meta name="twitter:title" content={mergedTwitter.title || title} />
      <meta name="twitter:description" content={mergedTwitter.description || description} />
      {mergedTwitter.image && <meta name="twitter:image" content={mergedTwitter.image} />}
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Additional Meta Tags */}
      {additionalMetaTags.map((tag, index) => (
        <meta key={`meta-tag-${index}`} name={tag.name} content={tag.content} />
      ))}
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#d4af37" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
    </Head>
  );
}

