'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { useAnimationPreferences } from '@/hooks/use-animation-preferences';
import { MobileOptimizedImage } from './mobile-optimized-image';

interface MobileTouchCarouselProps {
  images: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
  autoplay?: boolean;
  autoplayInterval?: number;
  showIndicators?: boolean;
  className?: string;
}

export function MobileTouchCarousel({
  images,
  autoplay = true,
  autoplayInterval = 5000,
  showIndicators = true,
  className = '',
}: MobileTouchCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { isMobile, isTablet } = useMobileDetection();
  const { preferences } = useAnimationPreferences();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Disable autoplay when reduced motion is preferred
  const shouldAutoplay = autoplay && !preferences.reducedMotion;
  
  // Handle autoplay
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (shouldAutoplay) {
      interval = setInterval(() => {
        if (!isDragging) {
          setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
        }
      }, autoplayInterval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [shouldAutoplay, autoplayInterval, images.length, isDragging]);
  
  // Update animation when index changes
  useEffect(() => {
    controls.start({
      x: `${-currentIndex * 100}%`,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 200,
        duration: preferences.reducedMotion ? 0.1 : 0.5,
      },
    });
  }, [currentIndex, controls, preferences.reducedMotion]);
  
  // Handle drag end
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    const threshold = 50; // minimum distance to trigger a swipe
    const velocity = 0.5; // minimum velocity to trigger a swipe
    
    if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > velocity) {
      if (info.offset.x > 0) {
        // Swiped right, go to previous
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      } else {
        // Swiped left, go to next
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    } else {
      // Not enough to trigger a swipe, snap back
      controls.start({
        x: `${-currentIndex * 100}%`,
        transition: { type: 'spring', damping: 30, stiffness: 200 },
      });
    }
  };
  
  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  // Go to next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Go to previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      ref={containerRef}
    >
      <motion.div
        className="flex"
        drag={isMobile || isTablet ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ x: 0 }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="min-w-full flex-shrink-0"
            style={{ touchAction: 'pan-y' }}
          >
            <MobileOptimizedImage
              src={image.src}
              alt={image.alt}
              width={image.width || 800}
              height={image.height || 600}
              priority={index === 0}
              index={index}
              className="w-full h-full"
            />
          </div>
        ))}
      </motion.div>
      
      {/* Navigation Arrows - Only show on tablet and desktop */}
      {(!isMobile || images.length > 1) && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md z-10"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md z-10"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}
      
      {/* Indicators */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-amber-600 w-4' 
                  : 'bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Swipe Instruction - Only show on mobile and first load */}
      {isMobile && (
        <div className="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-none">
          <div className="bg-black/40 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            Swipe to navigate
          </div>
        </div>
      )}
    </div>
  );
}

