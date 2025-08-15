/**
 * Image utility functions for optimizing image loading and display
 */

/**
 * Generate a blur placeholder for images
 * This creates a tiny, blurred version of the image to show while the full image loads
 */
export function generateBlurPlaceholder(): string {
  // Enhanced SVG-based blur placeholder with a gradient background
  // This is a lightweight alternative to generating actual image-based placeholders
  return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23f8f0e3'/%3E%3Crect width='100%25' height='100%25' filter='url(%23b)' fill='%23f8f0e3'/%3E%3Cpath d='M0 0h400v300H0z' fill='url(%23a)' fill-opacity='.05'/%3E%3ClinearGradient id='a' x1='0' y1='0' x2='400' y2='300'%3E%3Cstop offset='0' stop-color='%23d4af37'/%3E%3Cstop offset='1' stop-color='%23f9f295'/%3E%3C/linearGradient%3E%3C/svg%3E`;
}

/**
 * Determine if an image should be loaded with priority
 * This helps optimize Core Web Vitals by prioritizing visible images
 */
export function shouldLoadWithPriority(index: number, isHero: boolean): boolean {
  // Always prioritize hero images
  if (isHero) return true;
  
  // Prioritize the first few images that are likely to be in the viewport
  return index < 3;
}

/**
 * Get responsive sizes attribute for different image layouts
 * This helps the browser select the appropriate image size based on viewport
 */
export function getResponsiveSizes(layout: string): string {
  switch (layout) {
    case 'fill':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'responsive':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'intrinsic':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'fixed':
      return '100vw';
    default:
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  }
}

/**
 * Calculate aspect ratio for responsive images
 */
export function calculateAspectRatio(width: number, height: number): number {
  return (height / width) * 100;
}

/**
 * Format image dimensions for srcSet
 */
export function formatImageDimensions(src: string, width: number): string {
  return `${src}?w=${width} ${width}w`;
}

/**
 * Generate srcSet for responsive images
 */
export function generateSrcSet(src: string): string {
  const widths = [640, 750, 828, 1080, 1200, 1920, 2048];
  return widths.map(width => formatImageDimensions(src, width)).join(', ');
}

/**
 * Check if image is decorative (alt text should be empty)
 */
export function isDecorativeImage(alt: string): boolean {
  return alt === '' || alt.toLowerCase() === 'decorative';
}

/**
 * Get image format from URL
 */
export function getImageFormat(src: string): string {
  const extension = src.split('.').pop()?.toLowerCase();
  if (!extension) return 'jpeg';
  
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'jpeg';
    case 'png':
      return 'png';
    case 'webp':
      return 'webp';
    case 'avif':
      return 'avif';
    case 'gif':
      return 'gif';
    default:
      return 'jpeg';
  }
}

/**
 * Get optimal image quality based on format and device
 */
export function getOptimalImageQuality(format: string, isMobile: boolean): number {
  // Lower quality for mobile to save bandwidth
  const mobileReduction = isMobile ? 10 : 0;
  
  switch (format) {
    case 'jpeg':
      return 85 - mobileReduction;
    case 'webp':
      return 80 - mobileReduction;
    case 'avif':
      return 75 - mobileReduction;
    case 'png':
      return 90 - mobileReduction;
    default:
      return 85 - mobileReduction;
  }
}

/**
 * Generate image loading priority based on viewport position
 */
export function getImageLoadingPriority(
  index: number, 
  isAboveFold: boolean = false,
  isHero: boolean = false
): 'eager' | 'lazy' {
  if (isHero || isAboveFold) return 'eager';
  if (index < 3) return 'eager';
  return 'lazy';
}

/**
 * Calculate optimal image dimensions based on device
 */
export function getOptimalImageDimensions(
  originalWidth: number,
  originalHeight: number,
  isMobile: boolean,
  isTablet: boolean
): { width: number, height: number } {
  let width = originalWidth;
  let height = originalHeight;
  
  if (isMobile) {
    // Limit width on mobile
    const maxMobileWidth = 640;
    if (width > maxMobileWidth) {
      const ratio = maxMobileWidth / width;
      width = maxMobileWidth;
      height = Math.round(height * ratio);
    }
  } else if (isTablet) {
    // Limit width on tablet
    const maxTabletWidth = 1024;
    if (width > maxTabletWidth) {
      const ratio = maxTabletWidth / width;
      width = maxTabletWidth;
      height = Math.round(height * ratio);
    }
  }
  
  return { width, height };
}

