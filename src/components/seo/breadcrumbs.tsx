'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbSchema } from './schema-markup';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  customBreadcrumbs?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ customBreadcrumbs, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname if custom ones aren't provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customBreadcrumbs) return customBreadcrumbs;

    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        name,
        url: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (pathname === '/' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <>
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />
      <nav 
        className={`flex items-center space-x-2 text-sm text-muted-foreground mb-6 ${className}`}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.url} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
              )}
              {index === 0 && (
                <Home className="h-4 w-4 mr-2" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span 
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.url}
                  className="hover:text-foreground transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

// Predefined breadcrumbs for specific pages
export const pageBreadcrumbs = {
  about: [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' }
  ],
  services: [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' }
  ],
  contact: [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' }
  ],
  work: [
    { name: 'Home', url: '/' },
    { name: 'Our Work', url: '/work' }
  ],
  spotlight: [
    { name: 'Home', url: '/' },
    { name: 'Wedding Spotlight', url: '/spotlight' }
  ],
  faq: [
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' }
  ],
  fun: [
    { name: 'Home', url: '/' },
    { name: 'Wedding Fun', url: '/fun' }
  ],
  careers: [
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' }
  ]
};

