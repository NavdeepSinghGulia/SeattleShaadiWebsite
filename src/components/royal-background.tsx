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
  type: 'gold' | 'accent' | 'sparkle';
}

// Indian wedding motif patterns for luxury mode
const MOTIF_PATTERNS = [
  "M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 M10,2 C14.4,2 18,5.6 18,10 C18,14.4 14.4,18 10,18 C5.6,18 2,14.4 2,10 C2,5.6 5.6,2 10,2",
  "M10,0 L20,10 L10,20 L0,10 Z",
  "M0,10 Q5,0 10,10 T20,10",
  "M0,0 L20,0 L20,20 L0,20 Z M5,5 L15,5 L15,15 L5,15 Z"
];

export function RoyalBackground() {
  const [royalParticles, setRoyalParticles] = useState<RoyalParticle[]>([]);
  const [motifs, setMotifs] = useState<{id: number, x: number, y: number, pattern: string, scale: number, rotation: number}[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { shouldAnimate, shouldShowParticles, intensity } = useAnimation();

  useEffect(() => {
    setIsClient(true);
    
    // Enhanced particle generation based on intensity
    const baseCount = 
      intensity === 'luxury' ? 25 : 
      intensity === 'high' ? 15 : 
      intensity === 'medium' ? 8 : 0;
    
    const count = shouldShowParticles ? baseCount : 0;
    
    // Create more diverse particles with different types
    const particles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * (intensity === 'luxury' ? 25 : intensity === 'high' ? 20 : 12) + (intensity === 'luxury' ? 20 : intensity === 'high' ? 15 : 10),
      type: Math.random() > 0.7 ? 'gold' : Math.random() > 0.5 ? 'accent' : 'sparkle'
    }));
    
    setRoyalParticles(particles);
    
    // Add decorative motifs for luxury mode
    if (intensity === 'luxury' && shouldShowParticles) {
      const motifCount = 8;
      const newMotifs = Array.from({ length: motifCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        pattern: MOTIF_PATTERNS[Math.floor(Math.random() * MOTIF_PATTERNS.length)],
        scale: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * 360
      }));
      setMotifs(newMotifs);
    } else {
      setMotifs([]);
    }
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

  // Enhanced gradient variants with more luxurious transitions
  const gradientVariants = {
    animate: {
      background: [
        'linear-gradient(45deg, hsl(var(--primary) / 0.08), hsl(var(--accent) / 0.05))',
        'linear-gradient(135deg, hsl(var(--accent) / 0.05), hsl(var(--primary) / 0.08))',
        'linear-gradient(225deg, hsl(var(--primary) / 0.08), hsl(var(--accent) / 0.05))',
        'linear-gradient(315deg, hsl(var(--accent) / 0.05), hsl(var(--primary) / 0.08))',
      ],
    }
  };

  // Luxury motif animation
  const motifVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.1, 0.9, 1],
      opacity: [0.1, 0.2, 0.1],
    }
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-secondary">
      {/* Animated Gradient Background - Enhanced for luxury */}
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
      
      {/* Royal Light Rays - Enhanced with more elegant animation */}
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
          background: `conic-gradient(from 0deg, transparent, hsl(var(--primary) / 0.15), transparent, hsl(var(--accent) / 0.1), transparent)`
        }}
      />

      {/* Enhanced Radial Gradients */}
      <motion.div 
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary/20 via-primary/10 to-transparent rounded-full"
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
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-accent/20 via-accent/10 to-transparent rounded-full"
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

      {/* Luxury mode: Additional subtle gradient overlay */}
      {intensity === 'luxury' && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"
          animate={{
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Royal Particles - Enhanced with different types and animations */}
      {royalParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            particle.type === 'gold' 
              ? 'bg-primary/60' 
              : particle.type === 'accent' 
                ? 'bg-accent/50' 
                : 'bg-white/70'
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            boxShadow: particle.type === 'sparkle' ? '0 0 3px 1px rgba(255, 255, 255, 0.5)' : 'none'
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

      {/* Luxury mode: Decorative Indian wedding motifs */}
      {motifs.map((motif) => (
        <motion.svg
          key={motif.id}
          className="absolute opacity-10"
          width="40"
          height="40"
          viewBox="0 0 20 20"
          style={{
            left: `${motif.x}%`,
            top: `${motif.y}%`,
            fill: 'none',
            stroke: 'hsl(var(--primary))',
            strokeWidth: '0.5px',
            transform: `scale(${motif.scale}) rotate(${motif.rotation}deg)`
          }}
          variants={motifVariants}
          animate="animate"
          transition={{
            duration: 20 + motif.id,
            repeat: Infinity,
            ease: "easeInOut",
            delay: motif.id * 0.5
          }}
        >
          <path d={motif.pattern} />
        </motion.svg>
      ))}
    </div>
  );
}

