'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type AnimationPreferences = {
  reducedMotion: boolean;
  highPerformance: boolean;
  prefersReducedData: boolean;
};

type AnimationContextType = {
  preferences: AnimationPreferences;
  setReducedMotion: (value: boolean) => void;
  setHighPerformance: (value: boolean) => void;
  setPrefersReducedData: (value: boolean) => void;
  toggleReducedMotion: () => void;
  toggleHighPerformance: () => void;
  togglePrefersReducedData: () => void;
};

const defaultPreferences: AnimationPreferences = {
  reducedMotion: false,
  highPerformance: true,
  prefersReducedData: false,
};

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<AnimationPreferences>(defaultPreferences);

  // Check for user's system preferences on initial load
  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check for saved preferences in localStorage
    const savedPreferences = localStorage.getItem('animationPreferences');
    
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    } else {
      // If no saved preferences, respect system preference for reduced motion
      setPreferences(prev => ({
        ...prev,
        reducedMotion: prefersReducedMotion
      }));
    }
    
    // Listen for changes in system preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setPreferences(prev => ({
        ...prev,
        reducedMotion: e.matches
      }));
    };
    
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    
    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);
  
  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('animationPreferences', JSON.stringify(preferences));
    
    // Apply classes to document based on preferences
    if (preferences.reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    
    if (preferences.highPerformance) {
      document.documentElement.classList.add('high-performance');
    } else {
      document.documentElement.classList.remove('high-performance');
    }
    
    if (preferences.prefersReducedData) {
      document.documentElement.classList.add('reduced-data');
    } else {
      document.documentElement.classList.remove('reduced-data');
    }
  }, [preferences]);

  const setReducedMotion = (value: boolean) => {
    setPreferences(prev => ({ ...prev, reducedMotion: value }));
  };

  const setHighPerformance = (value: boolean) => {
    setPreferences(prev => ({ ...prev, highPerformance: value }));
  };

  const setPrefersReducedData = (value: boolean) => {
    setPreferences(prev => ({ ...prev, prefersReducedData: value }));
  };

  const toggleReducedMotion = () => {
    setPreferences(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  const toggleHighPerformance = () => {
    setPreferences(prev => ({ ...prev, highPerformance: !prev.highPerformance }));
  };

  const togglePrefersReducedData = () => {
    setPreferences(prev => ({ ...prev, prefersReducedData: !prev.prefersReducedData }));
  };

  return (
    <AnimationContext.Provider
      value={{
        preferences,
        setReducedMotion,
        setHighPerformance,
        setPrefersReducedData,
        toggleReducedMotion,
        toggleHighPerformance,
        togglePrefersReducedData,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationPreferences() {
  const context = useContext(AnimationContext);
  
  if (context === undefined) {
    throw new Error('useAnimationPreferences must be used within an AnimationProvider');
  }
  
  return context;
}

// For backward compatibility with existing code
export const useAnimation = useAnimationPreferences;

