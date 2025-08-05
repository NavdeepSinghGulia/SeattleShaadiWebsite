// Analytics configuration and utilities

export const ANALYTICS_CONFIG = {
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || '',
  FACEBOOK_PIXEL_ID: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '',
  HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID || '',
};

// Core Web Vitals tracking
export function trackWebVitals(metric: any) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

// Enhanced ecommerce tracking for wedding services
export const trackWeddingInquiry = (inquiryData: {
  service: string;
  budget?: string;
  date?: string;
  location?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'wedding_inquiry', {
      event_category: 'Lead Generation',
      service_type: inquiryData.service,
      budget_range: inquiryData.budget,
      wedding_date: inquiryData.date,
      location: inquiryData.location,
    });
  }
};

// Track consultation bookings
export const trackConsultationBooking = (consultationType: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'consultation_booking', {
      event_category: 'Conversion',
      consultation_type: consultationType,
      value: 1,
    });
  }
};

// Track portfolio interactions
export const trackPortfolioInteraction = (action: string, portfolioItem: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'portfolio_interaction', {
      event_category: 'Engagement',
      action: action,
      portfolio_item: portfolioItem,
    });
  }
};

// Track service page views with engagement time
export const trackServiceEngagement = (serviceName: string, timeSpent: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'service_engagement', {
      event_category: 'User Engagement',
      service_name: serviceName,
      engagement_time: timeSpent,
    });
  }
};

// Track social proof interactions (testimonials, reviews)
export const trackSocialProofInteraction = (type: 'testimonial' | 'review', action: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'social_proof_interaction', {
      event_category: 'Social Proof',
      proof_type: type,
      action: action,
    });
  }
};

// Track file downloads (brochures, price lists, etc.)
export const trackFileDownload = (fileName: string, fileType: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_download', {
      event_category: 'Content',
      file_name: fileName,
      file_type: fileType,
    });
  }
};

// Track external link clicks
export const trackExternalLink = (url: string, linkText: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'external_link_click', {
      event_category: 'Outbound Links',
      link_url: url,
      link_text: linkText,
    });
  }
};

// Track search functionality if implemented
export const trackSiteSearch = (searchTerm: string, resultsCount: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      results_count: resultsCount,
    });
  }
};

// Track form interactions
export const trackFormInteraction = (formName: string, action: 'start' | 'complete' | 'abandon') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_interaction', {
      event_category: 'Form',
      form_name: formName,
      action: action,
    });
  }
};

// Track video interactions
export const trackVideoInteraction = (videoTitle: string, action: 'play' | 'pause' | 'complete') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'video_interaction', {
      event_category: 'Video',
      video_title: videoTitle,
      action: action,
    });
  }
};

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_depth', {
      event_category: 'User Engagement',
      scroll_percentage: percentage,
      non_interaction: true,
    });
  }
};

// Enhanced conversion tracking
export const trackConversion = (conversionType: string, value?: number, currency = 'USD') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      event_category: 'Conversion',
      conversion_type: conversionType,
      value: value,
      currency: currency,
    });
  }
};

