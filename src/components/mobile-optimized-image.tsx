'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { generateBlurPlaceholder, shouldLoadWithPriority } from '@/lib/image-utils';

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
}: MobileOptimizedImageProps) {
  const { isMobile, isTablet } = useMobileDetection();
  const [isLoaded, setIsLoaded] = useState(false);
  
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

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        aspectRatio: `${width} / ${height}`,
      }}
    >
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
          object-cover w-full h-full
        `}
        onLoad={() => setIsLoaded(true)}
        onClick={onClick}
        loading={shouldPrioritize ? 'eager' : 'lazy'}
      />
      
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-amber-50">
          <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Decorative border for royal look on non-mobile */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none border border-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </div>
  );
}

