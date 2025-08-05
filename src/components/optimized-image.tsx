'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAnimationPreferences } from '@/hooks/use-animation-preferences';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  royalAnimation?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  objectFit = 'cover',
  objectPosition = 'center',
  loading = 'lazy',
  onLoad,
  onError,
  royalAnimation = true,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { preferences } = useAnimationPreferences();

  // Generate a simple blur placeholder if none provided
  const defaultBlurDataURL = 
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Animation variants for royal entrance
  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 1.1,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Prepare image props, ensuring no conflict between priority and loading
  const imageProps: any = {
    src: hasError ? '/images/placeholder.jpg' : src,
    alt,
    width,
    height,
    fill,
    sizes: sizes || (fill ? '100vw' : undefined),
    quality,
    priority,
    placeholder,
    blurDataURL: blurDataURL || defaultBlurDataURL,
    className: `transition-all duration-300 ${
      isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'
    } ${className}`,
    style: {
      objectFit,
      objectPosition,
    },
    onLoad: handleLoad,
    onError: handleError,
  };

  // Only add loading prop if priority is not true
  // When priority=true, Next.js automatically sets loading='eager'
  if (!priority) {
    imageProps.loading = loading;
  }

  const ImageComponent = <Image {...imageProps} />;

  // Return without animation if reduced motion is preferred or animation is disabled
  if (preferences.reducedMotion || !royalAnimation) {
    return ImageComponent;
  }

  return (
    <motion.div
      initial="hidden"
      animate={isLoading ? "hidden" : "visible"}
      variants={imageVariants}
      className="overflow-hidden"
    >
      {ImageComponent}
    </motion.div>
  );
}

// Specialized components for different use cases
interface HeroImageProps extends Omit<OptimizedImageProps, 'priority' | 'loading'> {
  heroText?: string;
}

export function HeroImage({ heroText, ...props }: HeroImageProps) {
  // Remove loading prop from props to avoid conflicts with priority
  const { loading, ...cleanProps } = props as any;
  
  return (
    <div className="relative">
      <OptimizedImage
        {...cleanProps}
        priority={true}
        sizes="100vw"
        className={`${props.className} hero-image`}
      />
      {heroText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg"
          >
            {heroText}
          </motion.h1>
        </div>
      )}
    </div>
  );
}

interface GalleryImageProps extends OptimizedImageProps {
  caption?: string;
  index?: number;
}

export function GalleryImage({ caption, index = 0, ...props }: GalleryImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <OptimizedImage
          {...props}
          className={`${props.className} transition-transform duration-300 group-hover:scale-110`}
        />
        {caption && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
          >
            <p className="text-white text-sm font-medium">{caption}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Avatar component with royal styling
interface RoyalAvatarProps extends Omit<OptimizedImageProps, 'width' | 'height'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
}

export function RoyalAvatar({ 
  size = 'md', 
  border = true, 
  className = '', 
  ...props 
}: RoyalAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const borderClass = border ? 'ring-2 ring-primary ring-offset-2' : '';

  return (
    <div className={`${sizeClasses[size]} ${borderClass} rounded-full overflow-hidden ${className}`}>
      <OptimizedImage
        {...props}
        fill={true}
        className="object-cover"
        sizes="(max-width: 768px) 100px, 200px"
      />
    </div>
  );
}
