'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView, trackWebVitals } from '@/lib/analytics';

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views on route changes
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);

  useEffect(() => {
    // Track Core Web Vitals
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(trackWebVitals);
        getFID(trackWebVitals);
        getFCP(trackWebVitals);
        getLCP(trackWebVitals);
        getTTFB(trackWebVitals);
      });
    }
  }, []);

  return null;
}

// Performance monitoring component
export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor performance and report issues
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log performance entries for monitoring
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            console.log('Navigation timing:', {
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
              firstPaint: navEntry.responseEnd - navEntry.requestStart,
            });
          }
        }
      });

      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });

      return () => observer.disconnect();
    }
  }, []);

  return null;
}

