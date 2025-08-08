import { siteConfig } from './utils';

// Image optimization utilities for SEO

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

// Generate SEO-friendly alt text for wedding images
export function generateWeddingAltText(
  imageType: 'ceremony' | 'reception' | 'portrait' | 'venue' | 'decor' | 'food' | 'dance' | 'general',
  context?: string
): string {
  const baseTexts = {
    ceremony: 'Indian wedding ceremony with traditional rituals and decorations',
    reception: 'Elegant wedding reception with luxury decor and celebration',
    portrait: 'Beautiful wedding portrait of bride and groom in traditional attire',
    venue: 'Stunning wedding venue in Seattle perfect for Indian weddings',
    decor: 'Luxurious wedding decoration with traditional Indian elements',
    food: 'Traditional Indian wedding feast with authentic cuisine',
    dance: 'Joyful wedding dance celebration with family and friends',
    general: 'Beautiful wedding moment captured by Seattle Shaadi wedding planners'
  };

  const baseText = baseTexts[imageType];
  return context ? `${baseText} - ${context}` : baseText;
}

// Generate structured data for images
export function generateImageStructuredData(
  src: string,
  alt: string,
  caption?: string,
  photographer?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": src.startsWith('http') ? src : `${siteConfig.url}${src}`,
    "description": alt,
    "name": caption || alt,
    ...(photographer && {
      "creator": {
        "@type": "Person",
        "name": photographer
      }
    }),
    "copyrightHolder": {
      "@type": "Organization",
      "name": "Seattle Shaadi"
    }
  };
}

// Optimize image loading with proper sizes
export function getImageSizes(breakpoints?: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string {
  const defaultBreakpoints = {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw',
    ...breakpoints
  };

  return `(max-width: 768px) ${defaultBreakpoints.mobile}, (max-width: 1024px) ${defaultBreakpoints.tablet}, ${defaultBreakpoints.desktop}`;
}

// Common image configurations for different use cases
export const imageConfigs = {
  hero: {
    sizes: '100vw',
    priority: true,
    quality: 90,
  },
  gallery: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    priority: false,
    quality: 85,
  },
  thumbnail: {
    sizes: '(max-width: 768px) 50vw, 25vw',
    priority: false,
    quality: 80,
  },
  portrait: {
    sizes: '(max-width: 768px) 100vw, 50vw',
    priority: false,
    quality: 90,
  }
};

// Validate image alt text for SEO compliance
export function validateAltText(alt: string): {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];

  if (!alt || alt.trim().length === 0) {
    issues.push('Alt text is empty');
    suggestions.push('Add descriptive alt text for accessibility and SEO');
  }

  if (alt.length < 10) {
    issues.push('Alt text is too short');
    suggestions.push('Use more descriptive alt text (at least 10 characters)');
  }

  if (alt.length > 125) {
    issues.push('Alt text is too long');
    suggestions.push('Keep alt text under 125 characters for optimal screen reader experience');
  }

  if (alt.toLowerCase().includes('image of') || alt.toLowerCase().includes('picture of')) {
    issues.push('Alt text contains redundant phrases');
    suggestions.push('Remove "image of" or "picture of" - screen readers already announce it\'s an image');
  }

  if (!alt.toLowerCase().includes('wedding') && !alt.toLowerCase().includes('seattle')) {
    suggestions.push('Consider including relevant keywords like "wedding" or "Seattle" for SEO');
  }

  return {
    isValid: issues.length === 0,
    issues,
    suggestions
  };
}

// Generate responsive image URLs for different screen sizes
export function generateResponsiveImageUrls(
  baseSrc: string,
  sizes: number[] = [640, 768, 1024, 1280, 1920]
): { src: string; width: number }[] {
  // This would typically integrate with your image CDN or optimization service
  // For now, we'll return the base image for all sizes
  return sizes.map(width => ({
    src: baseSrc,
    width
  }));
}

// Image preloading for critical images
export function preloadImage(src: string, as: 'image' = 'image'): void {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = src;
    document.head.appendChild(link);
  }
}

// Lazy loading intersection observer setup
export function setupLazyLoading(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
}

