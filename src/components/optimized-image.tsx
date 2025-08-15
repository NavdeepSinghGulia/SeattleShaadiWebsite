'use client';

import React from 'react';
import Image from 'next/image';
import { generateBlurPlaceholder, getResponsiveSizes, shouldLoadWithPriority } from '@/lib/image-utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  layout?: 'fill' | 'responsive' | 'intrinsic' | 'fixed';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  index?: number;
  isHero?: boolean;
  decorativeBorder?: boolean;
  animation?: 'fade' | 'zoom' | 'slide' | 'none';
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  layout = 'responsive',
  objectFit = 'cover',
  objectPosition = 'center',
  index = 0,
  isHero = false,
  decorativeBorder = false,
  animation = 'none',
}: OptimizedImageProps) {
  // Generate blur placeholder
  const blurDataURL = generateBlurPlaceholder();
  
  // Determine if image should be loaded with priority
  const shouldPrioritize = priority || shouldLoadWithPriority(index, isHero);
  
  // Get responsive sizes attribute
  const sizes = getResponsiveSizes(layout);
  
  // Animation classes
  const animationClasses = {
    fade: 'transition-opacity duration-700 ease-in-out',
    zoom: 'transition-transform duration-700 ease-in-out hover:scale-105',
    slide: 'transition-transform duration-500 ease-in-out hover:translate-x-2',
    none: '',
  };
  
  // Decorative border styles
  const borderStyles = decorativeBorder
    ? 'border-4 border-amber-600 shadow-lg rounded-md overflow-hidden'
    : '';
  
  // Combined classes
  const combinedClasses = `hardware-accelerated ${animationClasses[animation]} ${borderStyles} ${className}`;
  
  return (
    <div className={`relative ${decorativeBorder ? 'p-1 bg-gradient-to-r from-amber-100 via-amber-600 to-amber-100 rounded-lg' : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={combinedClasses}
        priority={shouldPrioritize}
        quality={quality}
        placeholder="blur"
        blurDataURL={blurDataURL}
        sizes={sizes}
        style={{
          objectFit,
          objectPosition,
        }}
      />
      
      {decorativeBorder && (
        <div className="absolute inset-0 pointer-events-none border-2 border-amber-600 rounded-lg opacity-50"></div>
      )}
    </div>
  );
}

export function HeroImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      isHero={true}
      priority={true}
      quality={90}
      className={`w-full h-[70vh] ${props.className || ''}`}
    />
  );
}

export function ThumbnailImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      width={props.width || 300}
      height={props.height || 200}
      quality={75}
      animation="zoom"
      className={`rounded-md hover:shadow-lg transition-shadow duration-300 ${props.className || ''}`}
    />
  );
}

export function GalleryImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      quality={80}
      animation="fade"
      decorativeBorder={true}
      className={`rounded-md ${props.className || ''}`}
    />
  );
}

export function TraditionImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      quality={85}
      decorativeBorder={true}
      animation="fade"
      className={`rounded-md aspect-video ${props.className || ''}`}
    />
  );
}

