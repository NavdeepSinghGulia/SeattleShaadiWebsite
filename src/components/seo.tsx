'use client';

import React from 'react';

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
  
  // In app directory, SEO should be handled via metadata export from pages
  // This component is for compatibility but should use metadata API instead
  
  React.useEffect(() => {
    // Add structured data to head if provided
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
      
      // Cleanup on unmount
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [structuredData]);
  
  return null; // In app directory, use metadata API instead
}
