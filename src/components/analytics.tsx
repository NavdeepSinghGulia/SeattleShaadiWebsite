'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView, trackWebVitals } from '@/lib/analytics';

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);

  useEffect(() => {
    let mounted = true;
    if (typeof window !== 'undefined') {
      import('web-vitals').then((webVitals) => {
        if (!mounted) return;
        if ('onCLS' in webVitals) (webVitals as any).onCLS(trackWebVitals);
        if ('onFID' in webVitals) (webVitals as any).onFID(trackWebVitals);
        if ('onFCP' in webVitals) (webVitals as any).onFCP(trackWebVitals);
        if ('onLCP' in webVitals) (webVitals as any).onLCP(trackWebVitals);
        if ('onTTFB' in webVitals) (webVitals as any).onTTFB(trackWebVitals);
      }).catch(() => {});
    }
    return () => { mounted = false; };
  }, []);

  return null;
}

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
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

    try {
      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
    } catch {}

    return () => observer.disconnect();
  }, []);

  return null;
}
