import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals';

// Web Vitals thresholds
const VITALS_THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
};

// Performance rating
function getRating(metric: Metric): 'good' | 'needs-improvement' | 'poor' {
  const threshold = VITALS_THRESHOLDS[metric.name as keyof typeof VITALS_THRESHOLDS];
  if (!threshold) return 'good';
  
  if (metric.value <= threshold.good) return 'good';
  if (metric.value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

// Send metrics to analytics service
function sendToAnalytics(metric: Metric) {
  const rating = getRating(metric);
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // Send to your analytics service
  // Replace with your actual analytics endpoint
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_map: {
        metric_rating: rating,
      },
    });
  }

  // Alternative: Send to custom analytics endpoint
  // fetch('/api/analytics/web-vitals', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     name: metric.name,
  //     value: metric.value,
  //     rating,
  //     delta: metric.delta,
  //     id: metric.id,
  //     timestamp: Date.now(),
  //     url: window.location.href,
  //     userAgent: navigator.userAgent,
  //   }),
  // }).catch(console.error);
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
    console.error('Failed to initialize Web Vitals:', error);
  }
}

// Track custom events
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  }

  // Custom analytics
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${eventName}:`, properties);
  }
}

// Track page views
export function trackPageView(url: string, title?: string) {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_title: title,
      page_location: url,
    });
  }
}

// Track user interactions
export function trackInteraction(element: string, action: string, value?: number) {
  trackEvent('user_interaction', {
    element,
    action,
    value,
    timestamp: Date.now(),
  });
}

// Track performance metrics
export function trackPerformance(metric: string, value: number, unit: string = 'ms') {
  trackEvent('performance_metric', {
    metric,
    value,
    unit,
    timestamp: Date.now(),
  });
}

// Track errors
export function trackError(error: Error, context?: string) {
  trackEvent('error', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: Date.now(),
    url: typeof window !== 'undefined' ? window.location.href : '',
  });
}

// Performance observer for custom metrics
export function observePerformance() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    // Observe navigation timing
    const navObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          
          // Track custom timing metrics
          trackPerformance('dom_content_loaded', navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart);
          trackPerformance('load_complete', navEntry.loadEventEnd - navEntry.loadEventStart);
          trackPerformance('dns_lookup', navEntry.domainLookupEnd - navEntry.domainLookupStart);
          trackPerformance('tcp_connection', navEntry.connectEnd - navEntry.connectStart);
        }
      }
    });
    navObserver.observe({ entryTypes: ['navigation'] });

    // Observe resource timing
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          
          // Track slow resources
          if (resourceEntry.duration > 1000) {
            trackPerformance('slow_resource', resourceEntry.duration, 'ms');
          }
        }
      }
    });
    resourceObserver.observe({ entryTypes: ['resource'] });

    // Observe long tasks
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'longtask') {
          trackPerformance('long_task', entry.duration, 'ms');
        }
      }
    });
    longTaskObserver.observe({ entryTypes: ['longtask'] });

  } catch (error) {
    console.error('Failed to initialize performance observers:', error);
  }
}

// Initialize all analytics
export function initAnalytics() {
  initWebVitals();
  observePerformance();
}

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

