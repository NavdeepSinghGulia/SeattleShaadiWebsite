'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  containerClassName?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = '/images/seo/shaadi-squad-og-image.png',
  className,
  containerClassName,
  fill,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize the image source after component mount to avoid hydration issues
  useEffect(() => {
    setImgSrc(src as string);
  }, [src]);

  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setError(true);
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  if (!imgSrc) {
    return (
      <div className={cn('relative bg-gray-100', containerClassName, fill ? 'h-full w-full' : '')}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative', containerClassName, fill ? 'h-full w-full' : '')}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600" />
        </div>
      )}
      
      <Image
        src={imgSrc}
        alt={alt || "Image"}
        className={cn(className, loading ? 'opacity-0' : 'opacity-100')}
        onLoad={handleLoad}
        onError={handleError}
        fill={fill}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;
