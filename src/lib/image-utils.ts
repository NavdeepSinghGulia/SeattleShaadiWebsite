/**
 * Utility functions for image optimization and handling
 */

/**
 * Generates a simple SVG-based blur placeholder
 * @param primaryColor - The primary color for the gradient (default: gold)
 * @param secondaryColor - The secondary color for the gradient (default: light gold)
 * @returns Base64 encoded SVG string for use as a blur placeholder
 */
export function generateBlurPlaceholder(
  primaryColor: string = '#d4af37',
  secondaryColor: string = '#f5e7c1'
): string {
  const svgString = `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stop-color="${secondaryColor}" offset="0%"/>
          <stop stop-color="${primaryColor}" offset="50%"/>
          <stop stop-color="${secondaryColor}" offset="100%"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <filter id="b" x="0" y="0" width="100%" height="100%">
        <feGaussianBlur stdDeviation="20"/>
      </filter>
      <rect width="100%" height="100%" fill="url(#g)" filter="url(#b)"/>
    </svg>
  `;
  
  // Convert SVG to base64
  const encodedSvg = Buffer.from(svgString).toString('base64');
  return `data:image/svg+xml;base64,${encodedSvg}`;
}

/**
 * Generates responsive image sizes attribute based on image layout
 * @param layout - The layout of the image (default: 'responsive')
 * @returns Appropriate sizes attribute string
 */
export function getResponsiveSizes(
  layout: 'fill' | 'responsive' | 'intrinsic' | 'fixed' = 'responsive'
): string {
  switch (layout) {
    case 'fill':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    case 'responsive':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'intrinsic':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'fixed':
      return '100vw';
    default:
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  }
}

/**
 * Determines if an image should be loaded with priority based on its position
 * @param index - The index of the image in a list
 * @param isHero - Whether the image is a hero image
 * @returns Boolean indicating if the image should be loaded with priority
 */
export function shouldLoadWithPriority(index: number, isHero: boolean = false): boolean {
  if (isHero) return true;
  return index < 3; // Load first 3 images with priority
}

/**
 * Generates alt text for an image if none is provided
 * @param filename - The filename of the image
 * @param prefix - Optional prefix for the alt text
 * @returns Generated alt text
 */
export function generateAltText(filename: string, prefix: string = 'Indian wedding'): string {
  // Remove file extension and replace hyphens/underscores with spaces
  const cleanName = filename
    .split('/')
    .pop()
    ?.replace(/\.[^/.]+$/, '')
    .replace(/[-_]/g, ' ');
    
  // Capitalize first letter of each word
  const formattedName = cleanName
    ?.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return `${prefix} ${formattedName || 'image'}`;
}

