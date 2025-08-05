'use client';

declare global {
  interface Window {
    gtag: (
      command: 'event',
      action: string,
      params?: { [key: string]: any }
    ) => void;
  }
}

// Log the page view with a specific URL
export const pageview = (url: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID as string, {
      page_path: url,
    });
  }
};

// Log a specific event
export const trackEvent = (
  action: string,
  params?: { [key: string]: any }
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
};

// Wedding-specific event tracking examples
export const trackGalleryView = (galleryName: string) => {
  trackEvent('view_gallery', {
    gallery_name: galleryName,
  });
};

export const trackServiceInquiry = (serviceName: string) => {
  trackEvent('service_inquiry', {
    service_name: serviceName,
  });
};

export const trackCtaClick = (ctaLocation: string) => {
  trackEvent('cta_click', {
    cta_location: ctaLocation,
  });
};
