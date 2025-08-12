// This component is deprecated in favor of Next.js metadata API
// Individual pages should export metadata objects instead
// This component is kept for backward compatibility but should not be used in new pages

import { generateMetadata } from '@/lib/seo-config';

interface SeoProps {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
}

// This component now returns null as metadata should be handled at the page level
export function Seo({ title: _title, description: _description, pathname: _pathname, image: _image }: SeoProps) {
  // In development, warn about deprecated usage
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      'The <Seo> component is deprecated. Use the generateMetadata function and export metadata from your page component instead.'
    );
  }
  
  return null;
}

// Export the generateMetadata function for easy access
export { generateMetadata };
