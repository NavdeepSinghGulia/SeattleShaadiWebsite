'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Replace with your actual Google Analytics 4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + searchParams.toString();
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
        }}
      />
    </>
  );
}

// Event tracking functions
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined event tracking functions for wedding website
export const trackWeddingEvents = {
  contactFormSubmit: () => trackEvent('submit', 'contact_form', 'wedding_inquiry'),
  phoneClick: () => trackEvent('click', 'contact', 'phone_number'),
  emailClick: () => trackEvent('click', 'contact', 'email_address'),
  serviceView: (serviceName: string) => trackEvent('view', 'service', serviceName),
  portfolioView: (portfolioItem: string) => trackEvent('view', 'portfolio', portfolioItem),
  consultationRequest: () => trackEvent('click', 'cta', 'consultation_request'),
  socialMediaClick: (platform: string) => trackEvent('click', 'social_media', platform),
  downloadBrochure: () => trackEvent('download', 'marketing_material', 'brochure'),
  videoPlay: (videoTitle: string) => trackEvent('play', 'video', videoTitle),
  galleryImageView: (imageName: string) => trackEvent('view', 'gallery', imageName),
};

// Custom hook for tracking page views
export function usePageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + searchParams.toString();
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);
}

