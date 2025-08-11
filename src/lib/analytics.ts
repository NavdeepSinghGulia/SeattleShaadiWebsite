// Google Analytics 4 Configuration and Utilities

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_TRACKING_ID) {
    console.warn('Google Analytics tracking ID not found');
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
    send_page_view: false, // We'll send page views manually
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!GA_TRACKING_ID || typeof window.gtag !== 'function') return;

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    page_title: title,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!GA_TRACKING_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track wedding planning specific events
export const trackWeddingEvent = (
  eventType: 'contact_form_submit' | 'service_inquiry' | 'consultation_request' | 'portfolio_view',
  details?: Record<string, any>
) => {
  trackEvent(eventType, 'wedding_planning', JSON.stringify(details));
};

// Track Core Web Vitals
export const trackWebVitals = (metric: any) => {
  if (!GA_TRACKING_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    non_interaction: true,
  });
};

// Enhanced ecommerce tracking for service inquiries
export const trackServiceInquiry = (serviceName: string, serviceCategory: string) => {
  if (!GA_TRACKING_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', 'begin_checkout', {
    currency: 'USD',
    value: 0, // Set appropriate value if known
    items: [
      {
        item_id: serviceName.toLowerCase().replace(/\s+/g, '_'),
        item_name: serviceName,
        item_category: serviceCategory,
        quantity: 1,
      },
    ],
  });
};

// Track user engagement
export const trackEngagement = (
  engagementType: 'scroll_depth' | 'time_on_page' | 'click_to_call' | 'email_click',
  value?: number
) => {
  trackEvent(engagementType, 'engagement', undefined, value);
};

// Track local business interactions
export const trackLocalBusinessEvent = (
  eventType: 'directions_click' | 'phone_click' | 'hours_view' | 'location_view'
) => {
  trackEvent(eventType, 'local_business');
};
