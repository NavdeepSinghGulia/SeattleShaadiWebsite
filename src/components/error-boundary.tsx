'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorFallbackProps {
  error?: Error;
  resetError: () => void;
  errorInfo?: React.ErrorInfo;
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  resetError,
  errorInfo 
}) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-orange-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Oops! Something went wrong
        </h1>
        
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. Our team has been notified and is working to fix this issue.
        </p>

        {isDevelopment && error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
            <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
            <p className="text-sm text-red-700 font-mono break-all">
              {error.message}
            </p>
            {error.stack && (
              <details className="mt-2">
                <summary className="cursor-pointer text-red-800 font-semibold">
                  Stack Trace
                </summary>
                <pre className="text-xs text-red-600 mt-2 overflow-auto max-h-32">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={resetError}
            className="flex items-center gap-2"
            variant="default"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{' '}
            <a 
              href="mailto:support@seattleshaadi.com" 
              className="text-rose-600 hover:text-rose-700 underline"
            >
              support@seattleshaadi.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you might want to log to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }

    this.setState({
      error,
      errorInfo,
    });
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      
      return (
        <FallbackComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

// Hook for functional components to handle errors
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const handleError = React.useCallback((error: Error) => {
    console.error('Error caught by useErrorHandler:', error);
    setError(error);
  }, []);

  // Reset error when component unmounts
  React.useEffect(() => {
    return () => setError(null);
  }, []);

  if (error) {
    throw error; // This will be caught by the nearest ErrorBoundary
  }

  return { handleError, resetError };
};

// Higher-order component for wrapping components with error boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

export default ErrorBoundary;
export type { ErrorBoundaryProps, ErrorFallbackProps };

