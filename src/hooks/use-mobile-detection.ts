'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current device is mobile
 * This helps with conditional rendering of mobile-optimized components
 */
export function useMobileDetection() {
  // Default to false to ensure SSR compatibility
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    // Function to update all states based on current window dimensions
    const updateDeviceType = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsLandscape(width > height);
      setViewportHeight(height);
    };

    // Set initial values
    updateDeviceType();

    // Add event listener for resize
    window.addEventListener('resize', updateDeviceType);
    
    // Add event listener for orientation change (mobile specific)
    window.addEventListener('orientationchange', updateDeviceType);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDeviceType);
      window.removeEventListener('orientationchange', updateDeviceType);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isLandscape,
    viewportHeight,
    isDesktop: !isMobile && !isTablet
  };
}

