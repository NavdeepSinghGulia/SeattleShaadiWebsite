'use client';

import { useEffect } from 'react';
import { errorReporting } from '@/lib/error-reporting';

/**
 * Error Reporting Initializer Component
 * 
 * Initializes the error reporting service when the app loads.
 * This component should be placed high in the component tree.
 */
export function ErrorReportingInitializer() {
  useEffect(() => {
    // Initialize error reporting service
    errorReporting.init();

    // Report app initialization
    errorReporting.reportEvent('app_initialized', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  // This component doesn't render anything
  return null;
}

