'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface AnimationPreferences {
  reducedMotion: boolean;
  animationIntensity: 'low' | 'medium' | 'high';
  enableParticles: boolean;
  enableGlow: boolean;
  enableSound: boolean;
}

interface AnimationPreferencesContextType {
  preferences: AnimationPreferences;
  updatePreferences: (updates: Partial<AnimationPreferences>) => void;
  isAnimationEnabled: (type: 'motion' | 'particles' | 'glow' | 'sound') => boolean;
  getAnimationDuration: (baseDuration: number) => number;
}

const AnimationPreferencesContext = createContext<AnimationPreferencesContextType | undefined>(undefined);

const defaultPreferences: AnimationPreferences = {
  reducedMotion: false,
  animationIntensity: 'high',
  enableParticles: true,
  enableGlow: true,
  enableSound: false,
};

export function AnimationPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<AnimationPreferences>(defaultPreferences);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for system preference for reduced motion
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const systemReducedMotion = mediaQuery.matches;

    // Load preferences from localStorage
    const savedPreferences = typeof window !== 'undefined' ? localStorage.getItem('royal-animation-preferences') : null;
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({
          ...defaultPreferences,
          ...parsed,
          reducedMotion: systemReducedMotion || parsed.reducedMotion,
        });
      } catch (error) {
        console.warn('Failed to parse animation preferences:', error);
        setPreferences({
          ...defaultPreferences,
          reducedMotion: systemReducedMotion,
        });
      }
    } else {
      setPreferences({
        ...defaultPreferences,
        reducedMotion: systemReducedMotion,
      });
    }

    // Listen for changes to system preference
    const handleChange = (e: MediaQueryListEvent) => {
      setPreferences(prev => ({
        ...prev,
        reducedMotion: e.matches,
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const updatePreferences = (updates: Partial<AnimationPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);
    
    if (mounted) {
      localStorage.setItem('royal-animation-preferences', JSON.stringify(newPreferences));
    }
  };

  const isAnimationEnabled = (type: 'motion' | 'particles' | 'glow' | 'sound'): boolean => {
    if (preferences.reducedMotion) {
      return false;
    }

    switch (type) {
      case 'motion':
        return preferences.animationIntensity !== 'low';
      case 'particles':
        return preferences.enableParticles && preferences.animationIntensity === 'high';
      case 'glow':
        return preferences.enableGlow;
      case 'sound':
        return preferences.enableSound;
      default:
        return true;
    }
  };

  const getAnimationDuration = (baseDuration: number): number => {
    if (preferences.reducedMotion) {
      return 0.01; // Nearly instant for reduced motion
    }

    switch (preferences.animationIntensity) {
      case 'low':
        return baseDuration * 0.5;
      case 'medium':
        return baseDuration * 0.75;
      case 'high':
        return baseDuration;
      default:
        return baseDuration;
    }
  };

  const contextValue: AnimationPreferencesContextType = {
    preferences,
    updatePreferences,
    isAnimationEnabled,
    getAnimationDuration,
  };

  return (
    <AnimationPreferencesContext.Provider value={contextValue}>
      {children}
    </AnimationPreferencesContext.Provider>
  );
}

export function useAnimationPreferences() {
  const context = useContext(AnimationPreferencesContext);
  if (context === undefined) {
    throw new Error('useAnimationPreferences must be used within an AnimationPreferencesProvider');
  }
  return context;
}

// Hook for individual components to easily check animation preferences
export function useAnimation() {
  const { preferences, isAnimationEnabled, getAnimationDuration } = useAnimationPreferences();

  return {
    shouldAnimate: !preferences.reducedMotion,
    shouldShowParticles: isAnimationEnabled('particles'),
    shouldShowGlow: isAnimationEnabled('glow'),
    shouldPlaySound: isAnimationEnabled('sound'),
    getDuration: getAnimationDuration,
    intensity: preferences.animationIntensity,
  };
}

// Utility hook for responsive animation based on device capabilities
export function useResponsiveAnimation() {
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    isHighPerformance: true,
    isMobile: false,
    hasReducedMotion: false,
  });

  useEffect(() => {
    const checkDeviceCapabilities = () => {
      // Check if device prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check if mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Estimate performance based on hardware concurrency and connection
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const connection = (navigator as any).connection;
      const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
      
      const isHighPerformance = hardwareConcurrency >= 4 && !isSlowConnection && !isMobile;

      setDeviceCapabilities({
        isHighPerformance,
        isMobile,
        hasReducedMotion: prefersReducedMotion,
      });
    };

    checkDeviceCapabilities();

    // Listen for connection changes
    if ('connection' in navigator) {
      (navigator as any).connection.addEventListener('change', checkDeviceCapabilities);
    }

    return () => {
      if ('connection' in navigator) {
        (navigator as any).connection.removeEventListener('change', checkDeviceCapabilities);
      }
    };
  }, []);

  const getOptimalAnimationSettings = () => {
    if (deviceCapabilities.hasReducedMotion) {
      return {
        enableAnimations: false,
        enableParticles: false,
        enableComplexEffects: false,
        animationDuration: 0.01,
      };
    }

    if (!deviceCapabilities.isHighPerformance || deviceCapabilities.isMobile) {
      return {
        enableAnimations: true,
        enableParticles: false,
        enableComplexEffects: false,
        animationDuration: 0.3,
      };
    }

    return {
      enableAnimations: true,
      enableParticles: true,
      enableComplexEffects: true,
      animationDuration: 1,
    };
  };

  return {
    deviceCapabilities,
    optimalSettings: getOptimalAnimationSettings(),
  };
}
