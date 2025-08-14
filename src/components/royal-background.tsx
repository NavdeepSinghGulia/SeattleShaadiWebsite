'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAnimation } from '@/hooks/use-animation-preferences';

interface RoyalParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export function RoyalBackground() {
  const [royalParticles, setRoyalParticles] = useState<RoyalParticle[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { shouldAnimate, shouldShowParticles, intensity } = useAnimation();

  useEffect(() => {
    setIsClient(true);
    const baseCount = intensity === 'high' ? 15 : intensity === 'medium' ? 8 : 0;
    const count = shouldShowParticles ? baseCount : 0;
    const particles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * (intensity === 'high' ? 20 : 12) + (intensity === 'high' ? 15 : 10),
    }));
    setRoyalParticles(particles);
  }, [intensity, shouldShowParticles]);

  if (!isClient || !shouldAnimate) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden bg-secondary">
        {/* Static background for SSR and reduced motion */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      </div>
    );
  }

  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, -10, 0],
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.4, 0.1],
    }
  };

  const lightRayVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.1, 1],
      opacity: [0.1, 0.3, 0.1],
    }
  };

  const gradientVariants = {
    animate: {
      background: [
        'linear-gradient(45deg, hsl(var(--primary) / 0.05), hsl(var(--accent) / 0.05))',
        'linear-gradient(135deg, hsl(var(--accent) / 0.05), hsl(var(--primary) / 0.05))',
        'linear-gradient(225deg, hsl(var(--primary) / 0.05), hsl(var(--accent) / 0.05))',
        'linear-gradient(315deg, hsl(var(--accent) / 0.05), hsl(var(--primary) / 0.05))',
      ],
    }
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-secondary">
      {/* Animated Gradient Background */}
      <motion.div 
        className="absolute inset-0"
        variants={gradientVariants}
        animate="animate"
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Royal Light Rays */}
      <motion.div
        className="absolute inset-0 opacity-20"
        variants={lightRayVariants}
        animate="animate"
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: `conic-gradient(from 0deg, transparent, hsl(var(--primary) / 0.1), transparent, hsl(var(--accent) / 0.1), transparent)`
        }}
      />

      {/* Enhanced Radial Gradients */}
      <motion.div 
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary/15 via-primary/8 to-transparent rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-accent/15 via-accent/8 to-transparent rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Royal Particles */}
      {royalParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-primary/50 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          variants={particleVariants}
          animate="animate"
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
