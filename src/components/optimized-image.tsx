'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  blurEffect?: boolean;
  fadeIn?: boolean;
  hoverEffect?: 'zoom' | 'glow' | 'none';
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  decorativeBorder?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading = 'lazy',
  blurEffect = true,
  fadeIn = true,
  hoverEffect = 'none',
  aspectRatio = 'aspect-square',
  objectFit = 'cover',
  objectPosition = 'center',
  placeholder = 'blur',
  blurDataURL,
  decorativeBorder = false,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [generatedBlurDataURL, setGeneratedBlurDataURL] = useState<string | undefined>(blurDataURL);

  // Generate a placeholder blur data URL if not provided
  useEffect(() => {
    if (!blurDataURL && placeholder === 'blur') {
      // Simple SVG-based blur placeholder with a gold gradient
      const svgString = `
        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stop-color="#f5e7c1" offset="0%"/>
              <stop stop-color="#d4af37" offset="50%"/>
              <stop stop-color="#f5e7c1" offset="100%"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)"/>
          <filter id="b" x="0" y="0" width="100%" height="100%">
            <feGaussianBlur stdDeviation="20"/>
          </filter>
          <rect width="100%" height="100%" fill="url(#g)" filter="url(#b)"/>
        </svg>
      `;
      const encodedSvg = Buffer.from(svgString).toString('base64');
      setGeneratedBlurDataURL(`data:image/svg+xml;base64,${encodedSvg}`);
    }
  }, [blurDataURL, placeholder]);

  // Determine object fit class
  const objectFitClass = 
    objectFit === 'cover' ? 'object-cover' :
    objectFit === 'contain' ? 'object-contain' :
    objectFit === 'fill' ? 'object-fill' :
    objectFit === 'none' ? 'object-none' :
    'object-scale-down';

  // Determine hover effect classes
  const hoverEffectClass = 
    hoverEffect === 'zoom' ? 'group-hover:scale-110 transition-transform duration-500' :
    hoverEffect === 'glow' ? 'transition-all duration-300' :
    '';

  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        !fill && aspectRatio,
        hoverEffect === 'zoom' && 'group',
        decorativeBorder && 'border-2 border-primary/20 p-1 rounded-lg',
        className
      )}
    >
      {hoverEffect === 'glow' && (
        <div className="absolute inset-0 opacity-0 bg-primary/20 transition-opacity duration-300 group-hover:opacity-100 z-10" />
      )}
      
      <motion.div
        initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="relative h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={cn(
            objectFitClass,
            objectPosition && `object-${objectPosition}`,
            hoverEffectClass,
            'transition-opacity duration-500',
            !isLoaded && blurEffect ? 'opacity-0' : 'opacity-100',
          )}
          style={{ objectPosition }}
          quality={quality}
          priority={priority}
          fill={fill}
          sizes={sizes}
          loading={loading}
          placeholder={placeholder === 'blur' ? 'blur' : 'empty'}
          blurDataURL={generatedBlurDataURL}
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>

      {/* Decorative elements for luxury look */}
      {decorativeBorder && (
        <>
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/40" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/40" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/40" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/40" />
        </>
      )}
    </div>
  );
}

export function OptimizedImageGallery({
  images,
  className,
  imageClassName,
  columns = 3,
  gap = 4,
  aspectRatio = 'aspect-square',
  hoverEffect = 'zoom',
}: {
  images: { src: string; alt: string; width?: number; height?: number }[];
  className?: string;
  imageClassName?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: 2 | 4 | 6 | 8;
  aspectRatio?: string;
  hoverEffect?: 'zoom' | 'glow' | 'none';
}) {
  const gridCols = 
    columns === 1 ? 'grid-cols-1' :
    columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
    columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
    'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  const gapClass = `gap-${gap}`;

  return (
    <div className={cn('grid', gridCols, gapClass, className)}>
      {images.map((image, index) => (
        <OptimizedImage
          key={index}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className={cn('w-full h-full', imageClassName)}
          aspectRatio={aspectRatio}
          hoverEffect={hoverEffect}
          decorativeBorder={true}
        />
      ))}
    </div>
  );
}

