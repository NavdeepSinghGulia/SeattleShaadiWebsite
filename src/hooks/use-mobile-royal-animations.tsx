'use client';

import { useState, useEffect } from 'react';
import { useAnimation } from './use-animation-preferences';

interface MobileRoyalAnimationSettings {
  enableParticles: boolean;
  enableComplexAnimations: boolean;
  animationDuration: number;
  particleCount: number;
  glowIntensity: number;
  enableHapticFeedback: boolean;
}

export function useMobileRoyalAnimations() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const { shouldAnimate, intensity, getDuration } = useAnimation();

  useEffect(() => {
    const checkMobileDevice = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setIsMobile(isMobileDevice);
      setIsTouch(isTouchDevice);
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    checkMobileDevice();
    window.addEventListener('resize', checkMobileDevice);
    
    return () => window.removeEventListener('resize', checkMobileDevice);
  }, []);

  const getMobileOptimizedSettings = (): MobileRoyalAnimationSettings => {
    const isSmallScreen = screenSize.width < 640; // sm breakpoint
    const isMediumScreen = screenSize.width < 768; // md breakpoint

    if (!shouldAnimate) {
      return {
        enableParticles: false,
        enableComplexAnimations: false,
        animationDuration: 0.1,
        particleCount: 0,
        glowIntensity: 0,
        enableHapticFeedback: false,
      };
    }

    if (isSmallScreen) {
      // Extra small screens (phones in portrait)
      return {
        enableParticles: intensity === 'high',
        enableComplexAnimations: intensity !== 'low',
        animationDuration: getDuration(0.6), // Faster animations
        particleCount: intensity === 'high' ? 8 : 4,
        glowIntensity: intensity === 'high' ? 0.6 : 0.3,
        enableHapticFeedback: isTouch,
      };
    }

    if (isMediumScreen) {
      // Medium screens (tablets, phones in landscape)
      return {
        enableParticles: intensity !== 'low',
        enableComplexAnimations: true,
        animationDuration: getDuration(0.8),
        particleCount: intensity === 'high' ? 12 : 8,
        glowIntensity: intensity === 'high' ? 0.8 : 0.5,
        enableHapticFeedback: isTouch,
      };
    }

    // Large screens
    return {
      enableParticles: true,
      enableComplexAnimations: true,
      animationDuration: getDuration(1.0),
      particleCount: intensity === 'high' ? 20 : 15,
      glowIntensity: intensity === 'high' ? 1.0 : 0.7,
      enableHapticFeedback: isTouch,
    };
  };

  const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!isTouch || !navigator.vibrate) return;

    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30, 10, 30]
    };

    navigator.vibrate(patterns[type]);
  };

  const getMobileRoyalVariants = () => {
    const settings = getMobileOptimizedSettings();
    
    return {
      // Mobile-optimized entrance animations
      mobileRoyalEntrance: {
        hidden: { 
          opacity: 0, 
          scale: 0.9, 
          y: 20,
          filter: 'blur(5px)'
        },
        visible: { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: settings.animationDuration,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 150,
            damping: 20
          }
        }
      },

      // Mobile-friendly hover effects
      mobileHover: {
        idle: { 
          scale: 1,
          boxShadow: `0 2px 8px rgba(184, 134, 11, ${settings.glowIntensity * 0.2})`
        },
        hover: { 
          scale: 1.02, // Smaller scale for mobile
          boxShadow: `0 4px 15px rgba(184, 134, 11, ${settings.glowIntensity * 0.4})`,
          transition: {
            duration: settings.animationDuration * 0.5,
            ease: "easeOut"
          }
        },
        tap: {
          scale: 0.98,
          transition: {
            duration: 0.1
          }
        }
      },

      // Mobile particle animation
      mobileParticle: {
        animate: settings.enableParticles ? {
          y: [0, -15, 0],
          x: [0, 5, -5, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.7, 0.3],
        } : {},
        transition: {
          duration: settings.animationDuration * 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },

      // Mobile text reveal
      mobileTextReveal: {
        hidden: { 
          opacity: 0, 
          y: 15,
          filter: 'blur(3px)'
        },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            delay: i * 0.1,
            duration: settings.animationDuration,
            ease: "easeOut"
          }
        })
      },

      // Mobile card animation
      mobileCard: {
        hidden: { 
          opacity: 0, 
          scale: 0.95,
          y: 20
        },
        visible: { 
          opacity: 1, 
          scale: 1,
          y: 0,
          transition: {
            duration: settings.animationDuration,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        },
        hover: settings.enableComplexAnimations ? {
          scale: 1.02,
          y: -2,
          boxShadow: `0 8px 25px rgba(184, 134, 11, ${settings.glowIntensity * 0.3})`,
          transition: {
            duration: settings.animationDuration * 0.6,
            ease: "easeOut"
          }
        } : {}
      }
    };
  };

  return {
    isMobile,
    isTouch,
    screenSize,
    settings: getMobileOptimizedSettings(),
    variants: getMobileRoyalVariants(),
    triggerHapticFeedback,
    isSmallScreen: screenSize.width < 640,
    isMediumScreen: screenSize.width < 768,
    isLargeScreen: screenSize.width >= 768,
  };
}

