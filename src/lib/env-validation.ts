/**
 * Environment Variable Validation
 * 
 * Runtime validation of environment variables to ensure
 * the application has all required configuration.
 */

import { validateRequiredEnvVars } from '@/types/env';

/**
 * Validate environment variables on application startup
 */
export function validateEnvironment() {
  try {
    // Validate required environment variables
    const requiredVars = validateRequiredEnvVars();
    
    console.log('✅ Environment validation passed');
    
    // Log configuration in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Environment Configuration:');
      console.log('- Site URL:', requiredVars.NEXT_PUBLIC_SITE_URL);
      console.log('- Resend API:', requiredVars.RESEND_API_KEY ? '✅ Configured' : '❌ Missing');
      console.log('- GA ID:', process.env.NEXT_PUBLIC_GA_ID ? '✅ Configured' : '⚠️ Optional');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Environment validation failed:', error);
    
    if (process.env.NODE_ENV === 'production') {
      // In production, throw the error to prevent startup
      throw error;
    }
    
    // In development, just warn
    console.warn('⚠️ Continuing in development mode with missing environment variables');
    return false;
  }
}

/**
 * Get environment-specific configuration
 */
export function getEnvironmentConfig() {
  return {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    
    // URLs
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    vercelUrl: process.env.VERCEL_URL,
    
    // Analytics
    gaId: process.env.NEXT_PUBLIC_GA_ID,
    
    // Email
    resendApiKey: process.env.RESEND_API_KEY,
    contactEmail: process.env.CONTACT_EMAIL || 'contact@seattleshaadi.com',
    
    // Error Reporting
    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    
    // Feature Flags
    enableAnalytics: !!process.env.NEXT_PUBLIC_GA_ID,
    enableErrorReporting: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
  };
}

