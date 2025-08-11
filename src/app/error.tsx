'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LuxuryCard } from '@/components/luxury-card';
import { RoyalTypography } from '@/components/royal-typography';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console in development
    console.error('Application error:', error);

    // Track error in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: true,
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <LuxuryCard className="max-w-lg w-full text-center p-8" glowEffect>
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-destructive animate-pulse" />
        </div>
        
        <RoyalTypography variant="h1" className="text-2xl md:text-3xl font-bold mb-4">
          Something Went Wrong
        </RoyalTypography>
        
        <RoyalTypography variant="p" className="text-muted-foreground mb-6 leading-relaxed">
          We apologize for the inconvenience. Our team has been notified and is working to resolve this issue.
        </RoyalTypography>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm font-medium mb-3 text-center">
              Technical Details (Development Only)
            </summary>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Error Message:</p>
              <pre className="text-xs bg-background p-3 rounded overflow-auto max-h-32 mb-3">
                {error.message}
              </pre>
              {error.digest && (
                <>
                  <p className="text-sm font-medium mb-2">Error Digest:</p>
                  <code className="text-xs bg-background p-2 rounded block">
                    {error.digest}
                  </code>
                </>
              )}
            </div>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="default" size="lg">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50">
          <RoyalTypography variant="p" className="text-sm text-muted-foreground">
            If this problem persists, please{' '}
            <Link href="/contact" className="text-primary hover:underline font-medium">
              contact our support team
            </Link>
          </RoyalTypography>
        </div>
      </LuxuryCard>
    </div>
  );
}

