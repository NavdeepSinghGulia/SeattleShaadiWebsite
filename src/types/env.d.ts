/**
 * Environment Variable Type Definitions
 * 
 * This file provides TypeScript type safety for environment variables
 * used throughout the application.
 */

declare namespace NodeJS {
  interface ProcessEnv {
    // Next.js Environment Variables
    NODE_ENV: 'development' | 'production' | 'test';
    
    // Public Environment Variables (accessible in browser)
    NEXT_PUBLIC_GA_ID?: string;
    NEXT_PUBLIC_SITE_URL?: string;
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
    NEXT_PUBLIC_YANDEX_VERIFICATION?: string;
    NEXT_PUBLIC_YAHOO_SITE_VERIFICATION?: string;
    NEXT_PUBLIC_BING_SITE_VERIFICATION?: string;
    
    // Server-side Environment Variables (secure)
    RESEND_API_KEY?: string;
    CONTACT_EMAIL?: string;
    
    // Firebase Configuration (if used)
    FIREBASE_PROJECT_ID?: string;
    FIREBASE_PRIVATE_KEY?: string;
    FIREBASE_CLIENT_EMAIL?: string;
    
    // Database Configuration (if used)
    DATABASE_URL?: string;
    
    // Authentication Secrets (if used)
    NEXTAUTH_SECRET?: string;
    NEXTAUTH_URL?: string;
    
    // Third-party API Keys (if used)
    STRIPE_SECRET_KEY?: string;
    STRIPE_PUBLISHABLE_KEY?: string;
    
    // Monitoring and Analytics
    SENTRY_DSN?: string;
    VERCEL_URL?: string;
  }
}

// Utility type for required environment variables
export type RequiredEnvVars = {
  NEXT_PUBLIC_SITE_URL: string;
  RESEND_API_KEY: string;
};

// Utility function to validate required environment variables
export function validateRequiredEnvVars(): RequiredEnvVars {
  const requiredVars = {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }

  return requiredVars as RequiredEnvVars;
}

