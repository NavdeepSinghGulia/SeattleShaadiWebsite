'use client';

import { motion } from 'framer-motion';
import { useAnimationPreferences } from '@/hooks/use-animation-preferences';
import { ReactNode } from 'react';

interface CulturalElementProps {
  children?: ReactNode;
  className?: string;
}

// Traditional Mandala Pattern
export function MandalaPattern({ className = '' }: CulturalElementProps) {
  const { prefersReducedMotion } = useAnimationPreferences();

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
      animate={{ 
        opacity: 0.1, 
        rotate: prefersReducedMotion ? 0 : 360, 
        scale: 1 
      }}
      transition={{ 
        duration: prefersReducedMotion ? 0.5 : 20, 
        repeat: prefersReducedMotion ? 0 : Infinity, 
        ease: 'linear' 
      }}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="text-primary/20 fill-current"
      >
        <g transform="translate(100,100)">
          {/* Outer petals */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45})`}>
              <path
                d="M0,-60 Q20,-40 0,-20 Q-20,-40 0,-60"
                className="fill-current opacity-60"
              />
            </g>
          ))}
          {/* Inner petals */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45 + 22.5})`}>
              <path
                d="M0,-40 Q15,-25 0,-10 Q-15,-25 0,-40"
                className="fill-current opacity-80"
              />
            </g>
          ))}
          {/* Center circle */}
          <circle r="8" className="fill-current" />
        </g>
      </svg>
    </motion.div>
  );
}

// Paisley Pattern
export function PaisleyPattern({ className = '' }: CulturalElementProps) {
  const { prefersReducedMotion } = useAnimationPreferences();

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.08, y: 0 }}
      transition={{ duration: 1.5 }}
    >
      <svg
        width="120"
        height="180"
        viewBox="0 0 120 180"
        className="text-primary/30 fill-current"
      >
        <path
          d="M60,20 Q90,30 95,60 Q90,90 80,110 Q70,130 60,140 Q50,150 40,160 Q30,170 20,160 Q10,150 15,130 Q20,110 25,90 Q30,70 35,50 Q40,30 50,25 Q55,20 60,20 Z"
          className="fill-current"
        />
        <path
          d="M60,30 Q80,35 85,55 Q80,75 75,90 Q70,105 60,115 Q50,125 45,135 Q40,145 35,140 Q30,135 32,125 Q35,115 38,105 Q42,95 45,85 Q48,75 50,65 Q52,55 55,45 Q57,35 60,30 Z"
          className="fill-background opacity-60"
        />
      </svg>
    </motion.div>
  );
}

// Lotus Flower
export function LotusFlower({ className = '' }: CulturalElementProps) {
  const { prefersReducedMotion } = useAnimationPreferences();

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.12, scale: 1 }}
      transition={{ duration: 2, ease: 'easeOut' }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.1, opacity: 0.2 }}
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="text-primary/40 fill-current"
      >
        <g transform="translate(50,50)">
          {/* Outer petals */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45})`}>
              <ellipse
                rx="8"
                ry="25"
                cy="-20"
                className="fill-current opacity-70"
              />
            </g>
          ))}
          {/* Inner petals */}
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 60})`}>
              <ellipse
                rx="6"
                ry="18"
                cy="-12"
                className="fill-current opacity-90"
              />
            </g>
          ))}
          {/* Center */}
          <circle r="4" className="fill-current" />
        </g>
      </svg>
    </motion.div>
  );
}

// Traditional Border Pattern
export function TraditionalBorder({ className = '' }: CulturalElementProps) {
  const { prefersReducedMotion } = useAnimationPreferences();

  return (
    <motion.div
      className={`border-t-2 border-b-2 border-primary/20 relative overflow-hidden ${className}`}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"
        animate={prefersReducedMotion ? {} : { x: ['0%', '100%', '0%'] }}
        transition={prefersReducedMotion ? {} : { 
          duration: 8, 
          repeat: Infinity, 
          ease: 'linear' 
        }}
      />
      <div className="relative h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </motion.div>
  );
}

// Henna Pattern
export function HennaPattern({ className = '' }: CulturalElementProps) {
  const { prefersReducedMotion } = useAnimationPreferences();

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 0.06, rotate: 0 }}
      transition={{ duration: 2 }}
    >
      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        className="text-primary/25 fill-current"
      >
        <g transform="translate(75,75)">
          {/* Central flower */}
          <circle r="8" className="fill-current" />
          
          {/* Radiating vines */}
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 60})`}>
              <path
                d="M0,0 Q10,-20 20,-30 Q30,-35 35,-30 Q30,-25 25,-20 Q20,-15 15,-10 Q10,-5 5,0"
                className="fill-current opacity-70"
                strokeWidth="1"
                stroke="currentColor"
              />
              {/* Small leaves */}
              <ellipse
                rx="3"
                ry="8"
                cx="15"
                cy="-15"
                transform="rotate(45)"
                className="fill-current opacity-50"
              />
            </g>
          ))}
          
          {/* Decorative dots */}
          {Array.from({ length: 12 }).map((_, i) => (
            <circle
              key={i}
              r="2"
              cx={Math.cos(i * 30 * Math.PI / 180) * 25}
              cy={Math.sin(i * 30 * Math.PI / 180) * 25}
              className="fill-current opacity-60"
            />
          ))}
        </g>
      </svg>
    </motion.div>
  );
}

// Royal Crown Silhouette
export function RoyalCrown({ className = '' }: CulturalElementProps) {
  const { prefersReducedMotion } = useAnimationPreferences();

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 0.08, y: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      whileHover={prefersReducedMotion ? {} : { 
        y: -5, 
        opacity: 0.15,
        transition: { duration: 0.3 }
      }}
    >
      <svg
        width="80"
        height="60"
        viewBox="0 0 80 60"
        className="text-primary/30 fill-current"
      >
        <path
          d="M10,50 L15,30 L25,40 L35,20 L40,35 L45,20 L55,40 L65,30 L70,50 Z"
          className="fill-current"
        />
        <rect x="8" y="50" width="64" height="6" rx="3" className="fill-current" />
        {/* Jewels */}
        <circle cx="20" cy="35" r="2" className="fill-background" />
        <circle cx="40" cy="25" r="3" className="fill-background" />
        <circle cx="60" cy="35" r="2" className="fill-background" />
      </svg>
    </motion.div>
  );
}

// Decorative Corner Element
export function DecorativeCorner({ 
  position = 'top-left',
  className = '' 
}: CulturalElementProps & { position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const { prefersReducedMotion } = useAnimationPreferences();
  
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180'
  };

  return (
    <motion.div
      className={`absolute pointer-events-none ${positionClasses[position]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.1, scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        className="text-primary/20 fill-current"
      >
        <path
          d="M0,0 Q30,0 30,30 Q30,15 45,15 Q60,15 60,0 L60,15 Q45,15 45,30 Q45,45 60,45 L60,60 Q30,60 30,30 Q30,45 15,45 Q0,45 0,60 L0,45 Q15,45 15,30 Q15,15 0,15 Z"
          className="fill-current opacity-60"
        />
      </svg>
    </motion.div>
  );
}

