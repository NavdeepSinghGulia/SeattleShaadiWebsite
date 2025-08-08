'use client';

import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals';

// Function to send metrics to analytics
function sendToAnalytics(metric: Metric) {
  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }

  // Send to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }

  // You can also send to other analytics services here
  // Example: send to custom analytics endpoint
  // fetch('/api/analytics/web-vitals', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(metric),
  // });
}

// Initialize Web Vitals tracking
export function initWebVitals() {
  if (typeof window === 'undefined') return;

  try {
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  } catch (error) {
    console.error('Error initializing Web Vitals:', error);
  }
}

// Performance observer for additional metrics
export function initPerformanceObserver() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    // Observe navigation timing
    const navObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          
          // Track custom metrics
          const metrics = {
            dns_lookup: navEntry.domainLookupEnd - navEntry.domainLookupStart,
            tcp_connection: navEntry.connectEnd - navEntry.connectStart,
            server_response: navEntry.responseStart - navEntry.requestStart,
            dom_processing: navEntry.domContentLoadedEventStart - navEntry.responseEnd,
            resource_loading: navEntry.loadEventStart - navEntry.domContentLoadedEventEnd,
          };

          // Send custom metrics to analytics
          Object.entries(metrics).forEach(([name, value]) => {
            if (window.gtag && value > 0) {
              window.gtag('event', 'timing_complete', {
                name,
                value: Math.round(value),
                event_category: 'Performance',
              });
            }
          });
        }
      }
    });

    navObserver.observe({ entryTypes: ['navigation'] });

    // Observe resource timing for large resources
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resourceEntry = entry as PerformanceResourceTiming;
        
        // Track slow resources (>1s)
        if (resourceEntry.duration > 1000) {
          if (window.gtag) {
            window.gtag('event', 'slow_resource', {
              event_category: 'Performance',
              event_label: resourceEntry.name,
              value: Math.round(resourceEntry.duration),
            });
          }
        }
      }
    });

    resourceObserver.observe({ entryTypes: ['resource'] });

  } catch (error) {
    console.error('Error initializing Performance Observer:', error);
  }
}

// Utility to measure custom performance marks
export function measurePerformance(name: string, startMark?: string, endMark?: string) {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  try {
    if (startMark && endMark) {
      performance.measure(name, startMark, endMark);
    } else {
      performance.mark(name);
    }
  } catch (error) {
    console.error('Error measuring performance:', error);
  }
}

// Component to track page load performance
export function PagePerformanceTracker({ pageName }: { pageName: string }) {
  if (typeof window !== 'undefined') {
    // Mark page start
    measurePerformance(`${pageName}-start`);
    
    // Mark page interactive
    setTimeout(() => {
      measurePerformance(`${pageName}-interactive`);
    }, 0);
  }

  return null;
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

