'use client';

import React, { useState, useCallback } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-performance';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  loadingClassName?: string;
  errorClassName?: string;
  containerClassName?: string;
  lazy?: boolean;
  showLoadingSpinner?: boolean;
  onLoadComplete?: () => void;
  onError?: (error: Error) => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = '/images/seo/shaadi-squad-og-image.png',
  className,
  loadingClassName,
  errorClassName,
  containerClassName,
  lazy = true,
  showLoadingSpinner = true,
  onLoadComplete,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  
  const { targetRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  }) as unknown as { targetRef: React.RefObject<HTMLDivElement>; hasIntersected: boolean };

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    onLoadComplete?.();
  }, [onLoadComplete]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(true);
    } else {
      const error = new Error(`Failed to load image: ${src}`);
      onError?.(error);
    }
  }, [src, fallbackSrc, currentSrc, onError]);

  const shouldRender = !lazy || hasIntersected;

  const wrapperFillClasses = (props as any).fill ? 'h-full w-full' : '';

  return (
    <div 
      ref={targetRef}
      className={cn(
        'relative overflow-hidden',
        wrapperFillClasses,
        containerClassName
      )}
    >
      {shouldRender && (
        <>
          {isLoading && showLoadingSpinner && (
            <div className={cn(
              'absolute inset-0 flex items-center justify-center bg-gray-100',
              loadingClassName
            )}>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600" />
            </div>
          )}

          {hasError && (
            <div className={cn(
              'absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500',
              errorClassName
            )}>
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2 text-sm">Failed to load image</p>
              </div>
            </div>
          )}

          <Image
            src={currentSrc}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            decoding={props.priority ? 'sync' : 'async'}
            fetchPriority={(props as any).priority ? 'high' : 'auto'}
            className={cn(
              'transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100',
              hasError && 'opacity-0',
              className
            )}
            {...props}
          />
        </>
      )}

      {!shouldRender && (
        <div className={cn(
          'w-full h-full bg-gray-200 animate-pulse',
          className
        )} />
      )}
    </div>
  );
};

export const HeroImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage
    priority
    sizes="100vw"
    lazy={false}
    {...props}
  />
);

export const ThumbnailImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    {...props}
  />
);

export const GalleryImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
    {...props}
  />
);

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  className?: string;
  imageClassName?: string;
  columns?: number;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  className,
  imageClassName,
  columns = 3,
}) => {
  const [loadedImages, setLoadedImages] = useState(new Set<number>());

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  }, []);

  return (
    <div className={cn(
      'grid gap-4',
      columns === 2 && 'grid-cols-1 md:grid-cols-2',
      columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      columns === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      className
    )}>
      {images.map((image, index) => (
        <div key={index} className="relative group">
          <GalleryImage
            src={image.src}
            alt={image.alt}
            fill
            className={cn(
              'object-cover rounded-lg transition-transform duration-300 group-hover:scale-105',
              imageClassName
            )}
            containerClassName="aspect-square"
            onLoadComplete={() => handleImageLoad(index)}
          />
          {image.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm">{image.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

interface ProgressiveImageProps extends OptimizedImageProps {
  lowQualitySrc?: string;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  lowQualitySrc,
  ...props
}) => {
  const [highQualityLoaded, setHighQualityLoaded] = useState(false);

  return (
    <div className="relative">
      {lowQualitySrc && !highQualityLoaded && (
        <OptimizedImage
          src={lowQualitySrc}
          className="absolute inset-0 filter blur-sm"
          lazy={false}
          showLoadingSpinner={false}
          {...props}
        />
      )}

      <OptimizedImage
        src={src}
        {...props}
        onLoadComplete={() => setHighQualityLoaded(true)}
      />
    </div>
  );
};

export default OptimizedImage;

