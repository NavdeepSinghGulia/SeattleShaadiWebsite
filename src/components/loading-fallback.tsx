'use client';

import React from 'react';
import { Loader2, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingFallbackProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'pulse' | 'skeleton' | 'wedding';
  message?: string;
  className?: string;
  fullScreen?: boolean;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  size = 'md',
  variant = 'spinner',
  message,
  className,
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const containerClasses = cn(
    'flex flex-col items-center justify-center',
    fullScreen ? 'min-h-screen' : 'py-8',
    className
  );

  const renderSpinner = () => (
    <Loader2 className={cn('animate-spin text-rose-600', sizeClasses[size])} />
  );

  const renderPulse = () => (
    <div className={cn('animate-pulse bg-rose-200 rounded-full', sizeClasses[size])} />
  );

  const renderSkeleton = () => (
    <div className="space-y-3 w-full max-w-sm">
      <div className="h-4 bg-gray-200 rounded animate-pulse" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
    </div>
  );

  const renderWedding = () => (
    <div className="flex items-center space-x-2">
      <Heart className={cn('animate-pulse text-rose-500', sizeClasses[size])} />
      <div className={cn('animate-spin text-orange-500', sizeClasses[size])}>
        ✨
      </div>
      <Heart className={cn('animate-pulse text-rose-500', sizeClasses[size])} />
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case 'pulse':
        return renderPulse();
      case 'skeleton':
        return renderSkeleton();
      case 'wedding':
        return renderWedding();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={containerClasses}>
      {renderLoader()}
      {message && (
        <p className="mt-4 text-sm text-gray-600 text-center animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

// Specialized loading components
export const PageLoadingFallback: React.FC<{ message?: string }> = ({ 
  message = "Loading your dream wedding experience..." 
}) => (
  <LoadingFallback
    variant="wedding"
    size="lg"
    message={message}
    fullScreen
    className="bg-gradient-to-br from-rose-50 to-orange-50"
  />
);

export const ComponentLoadingFallback: React.FC<{ message?: string }> = ({ 
  message 
}) => (
  <LoadingFallback
    variant="spinner"
    size="md"
    message={message}
    className="py-4"
  />
);

export const SkeletonLoadingFallback: React.FC = () => (
  <LoadingFallback
    variant="skeleton"
    className="p-4"
  />
);

// Loading wrapper component
interface LoadingWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  error?: Error | null;
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  isLoading,
  children,
  fallback,
  error,
}) => {
  if (error) {
    throw error; // Will be caught by ErrorBoundary
  }

  if (isLoading) {
    return <>{fallback || <ComponentLoadingFallback />}</>;
  }

  return <>{children}</>;
};

// Hook for managing loading states
export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = React.useState(initialState);
  const [error, setError] = React.useState<Error | null>(null);

  const startLoading = React.useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  const setLoadingError = React.useCallback((error: Error) => {
    setIsLoading(false);
    setError(error);
  }, []);

  const reset = React.useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setError: setLoadingError,
    reset,
  };
};

export default LoadingFallback;

