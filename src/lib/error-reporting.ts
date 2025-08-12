/**
 * Error Reporting Service
 * 
 * Centralized error handling and reporting for the application.
 * Supports multiple error reporting services (Sentry, LogRocket, etc.)
 */

import React from 'react';

interface ErrorContext {
  userId?: string;
  userEmail?: string;
  page?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

interface ErrorReport {
  error: Error;
  context?: ErrorContext;
  level?: 'error' | 'warning' | 'info';
  timestamp: Date;
}

class ErrorReportingService {
  private isInitialized = false;
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Initialize error reporting service
   */
  init() {
    if (this.isInitialized) return;

    // Initialize Sentry if DSN is provided
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      this.initSentry();
    }

    // Set up global error handlers
    this.setupGlobalErrorHandlers();

    this.isInitialized = true;

    if (this.isDevelopment) {
      console.log('🔍 Error reporting service initialized');
    }
  }

  /**
   * Initialize Sentry error reporting
   */
  private initSentry() {
    // Sentry initialization would go here
    // Example:
    // import * as Sentry from '@sentry/nextjs';
    // Sentry.init({
    //   dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    //   environment: process.env.NODE_ENV,
    // });
    
    if (this.isDevelopment) {
      console.log('📊 Sentry error reporting would be initialized here');
    }
  }

  /**
   * Set up global error handlers
   */
  private setupGlobalErrorHandlers() {
    if (typeof window === 'undefined') return;

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError(new Error(event.reason), {
        component: 'Global',
        action: 'unhandledrejection',
        metadata: { reason: event.reason }
      });
    });

    // Handle global errors
    window.addEventListener('error', (event) => {
      this.reportError(event.error || new Error(event.message), {
        component: 'Global',
        action: 'global_error',
        metadata: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      });
    });
  }

  /**
   * Report an error to the error reporting service
   */
  reportError(error: Error, context?: ErrorContext, level: 'error' | 'warning' | 'info' = 'error') {
    const errorReport: ErrorReport = {
      error,
      ...(context && { context }),
      level,
      timestamp: new Date()
    };

    // Log to console in development
    if (this.isDevelopment) {
      console.group(`🚨 Error Report (${level.toUpperCase()})`);
      console.error('Error:', error);
      console.log('Context:', context);
      console.log('Timestamp:', errorReport.timestamp.toISOString());
      console.groupEnd();
    }

    // Send to error reporting service in production
    if (!this.isDevelopment) {
      this.sendToErrorService(errorReport);
    }

    // Store locally for debugging (optional)
    this.storeLocalError(errorReport);
  }

  /**
   * Send error to external error reporting service
   */
  private sendToErrorService(errorReport: ErrorReport) {
    // Send to Sentry
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      // Sentry.captureException(errorReport.error, {
      //   level: errorReport.level,
      //   contexts: { custom: errorReport.context },
      //   timestamp: errorReport.timestamp.getTime() / 1000
      // });
    }

    // Send to custom error endpoint (optional)
    if (process.env.NEXT_PUBLIC_ERROR_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ERROR_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: errorReport.error.message,
          stack: errorReport.error.stack,
          context: errorReport.context,
          level: errorReport.level,
          timestamp: errorReport.timestamp.toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent
        })
      }).catch(() => {
        // Silently fail if error reporting fails
      });
    }
  }

  /**
   * Store error locally for debugging
   */
  private storeLocalError(errorReport: ErrorReport) {
    try {
      const errors = JSON.parse(localStorage.getItem('app_errors') || '[]');
      errors.push({
        message: errorReport.error.message,
        stack: errorReport.error.stack,
        context: errorReport.context,
        level: errorReport.level,
        timestamp: errorReport.timestamp.toISOString()
      });

      // Keep only last 50 errors
      if (errors.length > 50) {
        errors.splice(0, errors.length - 50);
      }

      localStorage.setItem('app_errors', JSON.stringify(errors));
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  /**
   * Report a custom event or metric
   */
  reportEvent(eventName: string, properties?: Record<string, unknown>) {
    if (this.isDevelopment) {
      console.log(`📊 Event: ${eventName}`, properties);
    }

    // Send to analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, properties);
    }
  }

  /**
   * Set user context for error reporting
   */
  setUserContext(userId: string, userEmail?: string, additionalData?: Record<string, unknown>) {
    if (this.isDevelopment) {
      console.log('👤 User context set:', { userId, userEmail, additionalData });
    }

    // Set user context in Sentry
    // Sentry.setUser({
    //   id: userId,
    //   email: userEmail,
    //   ...additionalData
    // });
  }

  /**
   * Clear user context
   */
  clearUserContext() {
    if (this.isDevelopment) {
      console.log('👤 User context cleared');
    }

    // Clear user context in Sentry
    // Sentry.setUser(null);
  }

  /**
   * Get stored errors for debugging
   */
  getStoredErrors(): ErrorReport[] {
    try {
      return JSON.parse(localStorage.getItem('app_errors') || '[]');
    } catch {
      return [];
    }
  }

  /**
   * Clear stored errors
   */
  clearStoredErrors() {
    try {
      localStorage.removeItem('app_errors');
    } catch {
      // Silently fail
    }
  }
}

// Create singleton instance
export const errorReporting = new ErrorReportingService();

// Convenience functions
export const reportError = (error: Error, context?: ErrorContext, level?: 'error' | 'warning' | 'info') => {
  errorReporting.reportError(error, context, level);
};

export const reportEvent = (eventName: string, properties?: Record<string, unknown>) => {
  errorReporting.reportEvent(eventName, properties);
};

export const setUserContext = (userId: string, userEmail?: string, additionalData?: Record<string, unknown>) => {
  errorReporting.setUserContext(userId, userEmail, additionalData);
};

export const clearUserContext = () => {
  errorReporting.clearUserContext();
};

// React Error Boundary helper
export const withErrorReporting = <T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
  componentName: string
) => {
  const WrappedComponent = (props: T) => {
    try {
      return React.createElement(Component, props);
    } catch (error) {
      reportError(error as Error, {
        component: componentName,
        action: 'render'
      });
      throw error; // Re-throw to trigger error boundary
    }
  };

  WrappedComponent.displayName = `withErrorReporting(${componentName})`;
  return WrappedComponent;
};
