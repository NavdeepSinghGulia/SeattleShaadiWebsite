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
      import('web-vitals').then((webVitals) => {
        // Use the new API (web-vitals v5+)
        if (webVitals.onCLS) webVitals.onCLS(trackWebVitals);
        if (webVitals.onFID) webVitals.onFID(trackWebVitals);
        if (webVitals.onFCP) webVitals.onFCP(trackWebVitals);
        if (webVitals.onLCP) webVitals.onLCP(trackWebVitals);
        if (webVitals.onTTFB) webVitals.onTTFB(trackWebVitals);
        
        // Fallback for older versions (web-vitals v4 and below)
        if (webVitals.getCLS) webVitals.getCLS(trackWebVitals);
        if (webVitals.getFID) webVitals.getFID(trackWebVitals);
        if (webVitals.getFCP) webVitals.getFCP(trackWebVitals);
        if (webVitals.getLCP) webVitals.getLCP(trackWebVitals);
        if (webVitals.getTTFB) webVitals.getTTFB(trackWebVitals);
      }).catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to load web-vitals:', error);
        }
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
            if (process.env.NODE_ENV === 'development') {
              console.log('Navigation timing:', {
                domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
                loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
                firstPaint: navEntry.responseEnd - navEntry.requestStart,
              });
            }
          }
        }
      });

      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });

      return () => observer.disconnect();
    }
  }, []);

  return null;
}
