'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/lib/structured-data';
import Script from 'next/script';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const pathname = usePathname();
  
  // Generate breadcrumbs from pathname if items not provided
  const breadcrumbs = items || generateBreadcrumbsFromPath(pathname);
  
  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map(item => ({ name: item.name, url: item.href }))
  );

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs on home page
  }

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center space-x-2 text-sm text-muted-foreground mb-6 ${className}`}
      >
        <ol className="flex items-center space-x-2">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/60" />
              )}
              {index === 0 && (
                <Home className="h-4 w-4 mr-2 text-muted-foreground/60" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span 
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean);
  
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', href: '/' }
  ];

  // Map of path segments to display names
  const pathNames: Record<string, string> = {
    'about': 'About Us',
    'services': 'Services',
    'contact': 'Contact',
    'work': 'Our Work',
    'spotlight': 'Spotlight',
    'faq': 'FAQ',
    'fun': 'Fun',
    'carriers': 'Careers',
    'mobile-royal-demo': 'Mobile Demo',
  };

  let currentPath = '';
  
  paths.forEach((path) => {
    currentPath += `/${path}`;
    const displayName = pathNames[path] || path.charAt(0).toUpperCase() + path.slice(1);
    
    breadcrumbs.push({
      name: displayName,
      href: currentPath
    });
  });

  return breadcrumbs;
}

