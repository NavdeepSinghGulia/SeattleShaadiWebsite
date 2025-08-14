'use client';

import React from 'react';
import Head from 'next/head';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  structuredData?: object[];
  noIndex?: boolean;
  noFollow?: boolean;
  alternateLanguages?: Array<{ hreflang: string; href: string }>;
}

export const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = '/images/seo/shaadi-squad-og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData = [],
  noIndex = false,
  noFollow = false,
  alternateLanguages = [],
}) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const finalCanonicalUrl = canonicalUrl || currentUrl;

  // Default SEO values
  const defaultTitle = "Best Indian Wedding Planner in Seattle | Seattle Shaadi";
  const defaultDescription = "Seattle's #1 rated Indian wedding planner with 127+ five-star reviews. Expert Hindu, Sikh & traditional Indian wedding coordination across Washington State. Free consultation available.";
  const defaultKeywords = [
    'Indian wedding planner Seattle',
    'Hindu wedding coordinator',
    'Sikh wedding planner',
    'Punjabi wedding Seattle',
    'South Indian wedding planner',
    'Muslim Indian wedding coordinator',
    'Seattle wedding planner',
    'Indian wedding services Washington',
    'traditional Indian wedding',
    'wedding planning Seattle'
  ];

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords.length > 0 ? keywords : defaultKeywords;

  // Robots meta content
  const robotsContent = [
    noIndex ? 'noindex' : 'index',
    noFollow ? 'nofollow' : 'follow',
    'max-snippet:-1',
    'max-image-preview:large',
    'max-video-preview:-1'
  ].join(', ');

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(', ')} />
      <meta name="robots" content={robotsContent} />

      {/* Canonical URL */}
      {finalCanonicalUrl && <link rel="canonical" href={finalCanonicalUrl} />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={finalTitle} />
      <meta property="og:site_name" content="Seattle Shaadi" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={finalTitle} />
      <meta name="twitter:site" content="@SeattleShaadi" />
      <meta name="twitter:creator" content="@SeattleShaadi" />

      {/* Additional Meta Tags */}
      <meta name="author" content="Seattle Shaadi" />
      <meta name="publisher" content="Seattle Shaadi" />
      <meta name="copyright" content="© 2024 Seattle Shaadi. All rights reserved." />
      <meta name="language" content="English" />

      {/* Alternate Language Links */}
      {alternateLanguages.map((lang, index) => (
        <link
          key={index}
          rel="alternate"
          hrefLang={lang.hreflang}
          href={lang.href}
        />
      ))}

      {/* Structured Data */}
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data)
          }}
        />
      ))}
    </Head>
  );
};

// Hook for dynamic SEO updates
export const useSEO = () => {
  const updateSEO = React.useCallback((seoData: Partial<SEOOptimizerProps>) => {
    // Update document title
    if (seoData.title) {
      document.title = seoData.title;
    }
    
    // Update meta description
    if (seoData.description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', seoData.description);
      }
    }
    
    // Update canonical URL
    if (seoData.canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', seoData.canonicalUrl);
    }
    
    // Update Open Graph tags
    if (seoData.ogImage) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', seoData.ogImage);
      }
    }
  }, []);

  return { updateSEO };
};

// SEO validation utility
export const validateSEO = (seoData: SEOOptimizerProps) => {
  const issues: string[] = [];
  
  // Title validation
  if (!seoData.title || seoData.title.length < 30 || seoData.title.length > 60) {
    issues.push('Title should be between 30-60 characters');
  }
  
  // Description validation
  if (!seoData.description || seoData.description.length < 120 || seoData.description.length > 160) {
    issues.push('Description should be between 120-160 characters');
  }
  
  // Keywords validation
  if (!seoData.keywords || seoData.keywords.length === 0) {
    issues.push('Keywords are missing');
  } else if (seoData.keywords.length > 10) {
    issues.push('Too many keywords (max 10 recommended)');
  }
  
  // Image validation
  if (!seoData.ogImage) {
    issues.push('Open Graph image is missing');
  }
  
  // URL validation
  if (!seoData.canonicalUrl) {
    issues.push('Canonical URL is missing');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    score: Math.max(0, 100 - (issues.length * 20))
  };
};

// Component for displaying SEO score in development
export const SEODebugger: React.FC<{ seoData: SEOOptimizerProps }> = ({ seoData }) => {
  if (process.env.NODE_ENV !== 'development') return null;
  
  const validation = validateSEO(seoData);
  
  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <h3 className="font-bold text-sm mb-2">SEO Score: {validation.score}/100</h3>
      {validation.issues.length > 0 && (
        <ul className="text-xs text-red-600 space-y-1">
          {validation.issues.map((issue, index) => (
            <li key={index}>• {issue}</li>
          ))}
        </ul>
      )}
      {validation.isValid && (
        <p className="text-xs text-green-600">✓ All SEO checks passed!</p>
      )}
    </div>
  );
};

export default SEOOptimizer;

