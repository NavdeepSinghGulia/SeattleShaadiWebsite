'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { useAnimationPreferences } from '@/hooks/use-animation-preferences';
import { generateBlurPlaceholder, shouldLoadWithPriority, getImageFormat } from '@/lib/image-utils';

interface MobileOptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  index?: number;
  isHero?: boolean;
  onClick?: () => void;
  isRoyal?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
  objectPosition?: string;
}

export function MobileOptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  index = 0,
  isHero = false,
  onClick,
  isRoyal = false,
  objectFit = 'cover',
  objectPosition = 'center',
}: MobileOptimizedImageProps) {
  const { isMobile, isTablet } = useMobileDetection();
  const { preferences } = useAnimationPreferences();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  // Determine if this image should be loaded with priority
  const shouldPrioritize = priority || shouldLoadWithPriority(index, isHero);
  
  // Generate blur placeholder
  const blurDataURL = generateBlurPlaceholder();
  
  // Calculate responsive sizes based on device type
  const sizes = isMobile 
    ? '100vw' 
    : isTablet 
      ? '50vw' 
      : '33vw';
  
  // Reduce quality slightly on mobile to improve performance
  const quality = isMobile ? 75 : 85;
  
  // Reduce image dimensions on mobile to save bandwidth
  const responsiveWidth = isMobile ? Math.min(width, 640) : width;
  const responsiveHeight = isMobile 
    ? Math.round((height / width) * responsiveWidth) 
    : height;
    
  // Detect when image is in viewport
  useEffect(() => {
    if (!window.IntersectionObserver || shouldPrioritize) {
      setIsInView(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );
    
    const currentElement = document.getElementById(`image-${index}`);
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [index, shouldPrioritize]);

  // Get image format for better optimization hints
  const format = getImageFormat(src);

  return (
    <div 
      id={`image-${index}`}
      className={`relative overflow-hidden ${isRoyal ? 'royal-border' : ''} ${className}`}
      style={{ 
        aspectRatio: `${width} / ${height}`,
      }}
    >
      {(isInView || shouldPrioritize) && (
        <Image
          src={src}
          alt={alt}
          width={responsiveWidth}
          height={responsiveHeight}
          quality={quality}
          priority={shouldPrioritize}
          sizes={sizes}
          placeholder="blur"
          blurDataURL={blurDataURL}
          className={`
            transition-opacity duration-500 
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${onClick ? 'cursor-pointer' : ''}
            object-${objectFit} w-full h-full
          `}
          style={{ objectPosition }}
          onLoad={() => setIsLoaded(true)}
          onClick={onClick}
          loading={shouldPrioritize ? 'eager' : 'lazy'}
          // Provide format hint to the browser
          {...(format !== 'jpeg' ? { 'data-format': format } : {})}
        />
      )}
      
      {/* Loading indicator */}
      {(!isLoaded || !isInView) && (
        <div className="absolute inset-0 flex items-center justify-center bg-amber-50">
          <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Decorative border for royal look on non-mobile */}
      {!isMobile && isRoyal && (
        <div className="absolute inset-0 pointer-events-none border border-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      
      {/* Royal corner accents */}
      {isRoyal && (
        <>
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-600 opacity-70"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-600 opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-600 opacity-70"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-600 opacity-70"></div>
        </>
      )}
      
      {/* Shimmer effect for royal images */}
      {isRoyal && isLoaded && (
        <div className={`absolute inset-0 shimmer-effect pointer-events-none ${preferences.reducedMotion ? 'hidden' : ''}`}></div>
      )}
    </div>
  );
}

