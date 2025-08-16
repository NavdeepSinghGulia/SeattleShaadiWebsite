'use client';

import React from 'react';
import Image from 'next/image';
import { generateBlurPlaceholder, getResponsiveSizes, shouldLoadWithPriority } from '@/lib/image-utils';
import { cn } from '@/lib/utils';
import type { StaticImageData } from 'next/image';

interface OptimizedImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
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
  fill = false,
  objectFit = 'cover',
  objectPosition = 'center',
  index = 0,
  isHero = false,
  decorativeBorder = false,
  animation = 'none',
}: OptimizedImageProps) {
  const blurDataURL = generateBlurPlaceholder();
  const shouldPrioritize = priority || shouldLoadWithPriority(index, isHero);
  const sizes = getResponsiveSizes(fill);

  const animationClasses = {
    fade: 'transition-opacity duration-700 ease-in-out',
    zoom: 'transition-transform duration-700 ease-in-out hover:scale-105',
    slide: 'transition-transform duration-500 ease-in-out hover:translate-x-2',
    none: '',
  };

  const borderStyles = decorativeBorder
    ? 'border-4 border-amber-600 shadow-lg rounded-md overflow-hidden'
    : '';

  const combinedClasses = `hardware-accelerated ${animationClasses[animation]} ${borderStyles} ${className}`;

  const imageProps = {
    src: src,
    alt: alt,
    className: combinedClasses,
    priority: shouldPrioritize,
    quality: quality,
    placeholder: 'blur' as const,
    blurDataURL: blurDataURL,
    sizes: sizes,
    style: {
      objectFit,
      objectPosition,
    },
  };
  
  if (fill) {
    // If fill is true, do not pass width and height
    return (
      <div className={`relative ${decorativeBorder ? 'p-1 bg-gradient-to-r from-amber-100 via-amber-600 to-amber-100 rounded-lg' : ''}`}>
        <Image {...imageProps} fill />
      </div>
    );
  }

  // If fill is false, pass width and height
  return (
    <div className={`relative ${decorativeBorder ? 'p-1 bg-gradient-to-r from-amber-100 via-amber-600 to-amber-100 rounded-lg' : ''}`}>
      <Image {...imageProps} width={width} height={height} />
    </div>
  );
}

export function HeroImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      fill={true}
      isHero={true}
      priority={true}
      quality={90}
      className={`w-full h-full ${props.className || ''}`}
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
