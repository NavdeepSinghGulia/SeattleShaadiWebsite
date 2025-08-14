'use client';
import { useState, useEffect } from 'react';
import { useAnimation } from '@/hooks/use-animation-preferences';

interface Particle {
  id: number;
  style: React.CSSProperties;
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const { shouldAnimate, shouldShowParticles } = useAnimation();

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };
    
    checkMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
    }
    
    // This code now runs only on the client, after the initial render.
    const generateParticles = () => {
      const particleCount = isMobile ? 6 : 18; // Slightly reduced for performance
      return Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 2 + 1}px`, // Smaller particles
          height: `${Math.random() * 2 + 1}px`,
          animationDelay: `${Math.random() * 8}s`, // Longer delays
          animationDuration: `${Math.random() * 15 + 10}s`, // Slower animations
        },
      }));
    };
    setParticles(generateParticles());
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile);
      }
    };
  }, [isMobile]);

  if (!shouldAnimate || !shouldShowParticles) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full animate-particle ${
            isMobile ? 'bg-primary/10' : 'bg-primary/20'
          }`}
          style={particle.style}
        />
      ))}
    </div>
  );
}
