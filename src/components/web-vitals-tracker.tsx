'use client';

import { useEffect } from 'react';
import { initWebVitals, initPerformanceObserver } from '@/lib/web-vitals';

export function WebVitalsTracker() {
  useEffect(() => {
    // Initialize Web Vitals tracking
    initWebVitals();
    
    // Initialize Performance Observer
    initPerformanceObserver();
    
    // Track page visibility changes for better analytics
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && window.gtag) {
        window.gtag('event', 'page_view_end', {
          event_category: 'Engagement',
          value: Date.now(),
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}

