'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

// Skip to content link for keyboard navigation
export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded-md shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-rose-600"
    >
      Skip to main content
    </a>
  );
};

// Screen reader only text component
interface ScreenReaderOnlyProps {
  children: React.ReactNode;
  className?: string;
}

export const ScreenReaderOnly: React.FC<ScreenReaderOnlyProps> = ({ 
  children, 
  className 
}) => {
  return (
    <span className={cn('sr-only', className)}>
      {children}
    </span>
  );
};

// Focus trap component for modals and dialogs
interface FocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
  restoreFocus?: boolean;
}

export const FocusTrap: React.FC<FocusTrapProps> = ({ 
  children, 
  active = true,
  restoreFocus = true 
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    // Get all focusable elements
    const getFocusableElements = () => {
      return container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Focus the first focusable element
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      
      // Restore focus to the previously focused element
      if (restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [active, restoreFocus]);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};

// Keyboard navigation helper
export const useKeyboardNavigation = (
  items: HTMLElement[],
  options: {
    loop?: boolean;
    orientation?: 'horizontal' | 'vertical';
  } = {}
) => {
  const { loop = true, orientation = 'vertical' } = options;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isVertical = orientation === 'vertical';
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

    switch (e.key) {
      case nextKey:
        e.preventDefault();
        setCurrentIndex(prev => {
          const next = prev + 1;
          if (next >= items.length) {
            return loop ? 0 : prev;
          }
          return next;
        });
        break;
      case prevKey:
        e.preventDefault();
        setCurrentIndex(prev => {
          const next = prev - 1;
          if (next < 0) {
            return loop ? items.length - 1 : prev;
          }
          return next;
        });
        break;
      case 'Home':
        e.preventDefault();
        setCurrentIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setCurrentIndex(items.length - 1);
        break;
    }
  }, [items, loop, orientation]);

  useEffect(() => {
    if (items[currentIndex]) {
      items[currentIndex].focus();
    }
  }, [currentIndex, items]);

  return { currentIndex, handleKeyDown };
};

// Accessible button component with proper ARIA attributes
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText = 'Loading...',
  disabled,
  children,
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantClasses = {
    primary: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-describedby={loading ? 'loading-description' : undefined}
      {...props}
    >
      {loading && (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <ScreenReaderOnly id="loading-description">
            {loadingText}
          </ScreenReaderOnly>
        </>
      )}
      {loading ? loadingText : children}
    </button>
  );
};

// Accessible form field with proper labeling
interface AccessibleFieldProps {
  label: string;
  id: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const AccessibleField: React.FC<AccessibleFieldProps> = ({
  label,
  id,
  error,
  description,
  required = false,
  children,
}) => {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      
      {description && (
        <p id={descriptionId} className="text-sm text-gray-600">
          {description}
        </p>
      )}
      
      <div>
        {React.cloneElement(children as React.ReactElement, {
          id,
          'aria-describedby': [descriptionId, errorId].filter(Boolean).join(' ') || undefined,
          'aria-invalid': error ? 'true' : undefined,
          'aria-required': required,
        })}
      </div>
      
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

// Live region for dynamic content announcements
interface LiveRegionProps {
  children: React.ReactNode;
  politeness?: 'polite' | 'assertive' | 'off';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all';
}

export const LiveRegion: React.FC<LiveRegionProps> = ({
  children,
  politeness = 'polite',
  atomic = false,
  relevant = 'additions text',
}) => {
  return (
    <div
      aria-live={politeness}
      aria-atomic={atomic}
      aria-relevant={relevant}
      className="sr-only"
    >
      {children}
    </div>
  );
};

// Accessible modal/dialog component
interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}) => {
  const titleId = `modal-title-${React.useId()}`;
  const descriptionId = description ? `modal-description-${React.useId()}` : undefined;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal content */}
      <FocusTrap active={isOpen}>
        <div className={cn(
          'relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6',
          className
        )}>
          <h2 id={titleId} className="text-lg font-semibold mb-4">
            {title}
          </h2>
          
          {description && (
            <p id={descriptionId} className="text-gray-600 mb-4">
              {description}
            </p>
          )}
          
          {children}
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-600 rounded"
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </FocusTrap>
    </div>
  );
};

// Color contrast checker utility
export const checkColorContrast = (foreground: string, background: string): number => {
  // This is a simplified version - in production, you'd want a more robust implementation
  const getLuminance = (color: string): number => {
    // Convert hex to RGB and calculate luminance
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// Accessibility announcement hook
export const useAnnouncement = () => {
  const [announcement, setAnnouncement] = useState('');

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement(''); // Clear first to ensure re-announcement
    setTimeout(() => setAnnouncement(message), 100);
  }, []);

  return {
    announce,
    AnnouncementRegion: () => (
      <LiveRegion politeness="polite">
        {announcement}
      </LiveRegion>
    ),
  };
};

