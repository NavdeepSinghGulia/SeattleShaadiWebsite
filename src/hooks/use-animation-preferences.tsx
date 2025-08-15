'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AnimationIntensity = 'low' | 'medium' | 'high' | 'luxury';

interface AnimationPreferences {
  shouldAnimate: boolean;
  shouldShowParticles: boolean;
  intensity: AnimationIntensity;
  setAnimationEnabled: (enabled: boolean) => void;
  setParticlesEnabled: (enabled: boolean) => void;
  setIntensity: (intensity: AnimationIntensity) => void;
}

const AnimationContext = createContext<AnimationPreferences>({
  shouldAnimate: true,
  shouldShowParticles: true,
  intensity: 'medium',
  setAnimationEnabled: () => {},
  setParticlesEnabled: () => {},
  setIntensity: () => {},
});

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [shouldShowParticles, setShouldShowParticles] = useState(true);
  const [intensity, setIntensity] = useState<AnimationIntensity>('medium');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check for saved preferences
    const savedAnimationPref = localStorage.getItem('animation-enabled');
    const savedParticlesPref = localStorage.getItem('particles-enabled');
    const savedIntensityPref = localStorage.getItem('animation-intensity');
    
    if (savedAnimationPref !== null) {
      setShouldAnimate(savedAnimationPref === 'true');
    }
    
    if (savedParticlesPref !== null) {
      setShouldShowParticles(savedParticlesPref === 'true');
    }
    
    if (savedIntensityPref !== null && 
        (savedIntensityPref === 'low' || 
         savedIntensityPref === 'medium' || 
         savedIntensityPref === 'high' ||
         savedIntensityPref === 'luxury')) {
      setIntensity(savedIntensityPref as AnimationIntensity);
    } else {
      // Default to luxury for a more opulent experience
      setIntensity('luxury');
      localStorage.setItem('animation-intensity', 'luxury');
    }
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShouldAnimate(false);
      setShouldShowParticles(false);
      localStorage.setItem('animation-enabled', 'false');
      localStorage.setItem('particles-enabled', 'false');
    }
  }, []);

  // Only enable animations on client-side
  const effectiveShouldAnimate = isClient && shouldAnimate;
  const effectiveShouldShowParticles = isClient && shouldAnimate && shouldShowParticles;

  const setAnimationEnabled = (enabled: boolean) => {
    setShouldAnimate(enabled);
    localStorage.setItem('animation-enabled', String(enabled));
    
    // If animations are disabled, also disable particles
    if (!enabled) {
      setShouldShowParticles(false);
      localStorage.setItem('particles-enabled', 'false');
    }
  };

  const setParticlesEnabled = (enabled: boolean) => {
    setShouldShowParticles(enabled);
    localStorage.setItem('particles-enabled', String(enabled));
  };

  const setAnimationIntensity = (newIntensity: AnimationIntensity) => {
    setIntensity(newIntensity);
    localStorage.setItem('animation-intensity', newIntensity);
  };

  return (
    <AnimationContext.Provider
      value={{
        shouldAnimate: effectiveShouldAnimate,
        shouldShowParticles: effectiveShouldShowParticles,
        intensity,
        setAnimationEnabled,
        setParticlesEnabled,
        setIntensity: setAnimationIntensity,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  return useContext(AnimationContext);
}

