'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DecorativeBorderProps {
  className?: string;
  variant?: 'gold' | 'accent' | 'subtle';
  animate?: boolean;
}

export function DecorativeBorder({
  className,
  variant = 'gold',
  animate = true,
}: DecorativeBorderProps) {
  const borderColor = 
    variant === 'gold' ? 'border-primary/70' : 
    variant === 'accent' ? 'border-accent/60' : 
    'border-primary/30';

  const borderWidth = variant === 'subtle' ? 'border-[1px]' : 'border-[2px]';

  return (
    <div className={cn(
      'relative p-0.5 rounded-lg overflow-hidden',
      className
    )}>
      {animate ? (
        <motion.div 
          className={cn(
            'absolute inset-0 rounded-lg',
            borderWidth,
            borderColor
          )}
          initial={{ opacity: 0.7 }}
          animate={{ 
            opacity: [0.7, 1, 0.7],
            boxShadow: [
              '0 0 0px hsl(var(--primary) / 0.1)',
              '0 0 8px hsl(var(--primary) / 0.3)',
              '0 0 0px hsl(var(--primary) / 0.1)'
            ]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ) : (
        <div className={cn(
          'absolute inset-0 rounded-lg',
          borderWidth,
          borderColor
        )} />
      )}
    </div>
  );
}

interface DecorativeCornerProps {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: 'sm' | 'md' | 'lg';
  color?: 'gold' | 'accent';
  animate?: boolean;
}

export function DecorativeCorner({
  className,
  position = 'top-left',
  size = 'md',
  color = 'gold',
  animate = true,
}: DecorativeCornerProps) {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
  };

  const sizeClasses = {
    'sm': 'w-6 h-6',
    'md': 'w-10 h-10',
    'lg': 'w-16 h-16',
  };

  const strokeColor = color === 'gold' ? 'stroke-primary' : 'stroke-accent';

  return (
    <div className={cn(
      'absolute',
      positionClasses[position],
      sizeClasses[size],
      className
    )}>
      {animate ? (
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full"
          initial={{ opacity: 0.7 }}
          animate={{ 
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path 
            d="M2 2v8a2 2 0 0 0 2 2h8" 
            className={cn(
              strokeColor,
              "stroke-[1.5] fill-none"
            )} 
            strokeLinecap="round" 
          />
        </motion.svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full"
        >
          <path 
            d="M2 2v8a2 2 0 0 0 2 2h8" 
            className={cn(
              strokeColor,
              "stroke-[1.5] fill-none"
            )} 
            strokeLinecap="round" 
          />
        </svg>
      )}
    </div>
  );
}

interface MandalaPatternProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  opacity?: number;
  animate?: boolean;
}

export function MandalaPattern({
  className,
  size = 'md',
  opacity = 0.1,
  animate = true,
}: MandalaPatternProps) {
  const sizeClasses = {
    'sm': 'w-20 h-20',
    'md': 'w-32 h-32',
    'lg': 'w-48 h-48',
  };

  return (
    <div className={cn(
      'absolute',
      sizeClasses[size],
      className
    )}>
      {animate ? (
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ opacity }}
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <g fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5">
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="35" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="25" />
            <circle cx="50" cy="50" r="20" />
            <circle cx="50" cy="50" r="15" />
            <path d="M50,10 L50,90 M10,50 L90,50 M22,22 L78,78 M22,78 L78,22" />
            <path d="M50,10 C70,30 70,70 50,90 C30,70 30,30 50,10" />
            <path d="M10,50 C30,30 70,30 90,50 C70,70 30,70 10,50" />
          </g>
        </motion.svg>
      ) : (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ opacity }}
        >
          <g fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5">
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="35" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="25" />
            <circle cx="50" cy="50" r="20" />
            <circle cx="50" cy="50" r="15" />
            <path d="M50,10 L50,90 M10,50 L90,50 M22,22 L78,78 M22,78 L78,22" />
            <path d="M50,10 C70,30 70,70 50,90 C30,70 30,30 50,10" />
            <path d="M10,50 C30,30 70,30 90,50 C70,70 30,70 10,50" />
          </g>
        </svg>
      )}
    </div>
  );
}

interface PaisleyPatternProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'gold' | 'accent';
  opacity?: number;
}

export function PaisleyPattern({
  className,
  size = 'md',
  color = 'gold',
  opacity = 0.1,
}: PaisleyPatternProps) {
  const sizeClasses = {
    'sm': 'w-12 h-12',
    'md': 'w-20 h-20',
    'lg': 'w-32 h-32',
  };

  const strokeColor = color === 'gold' ? 'stroke-primary' : 'stroke-accent';

  return (
    <div className={cn(
      'absolute',
      sizeClasses[size],
      className
    )}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ opacity }}
      >
        <path 
          d="M50,10 C70,10 80,30 80,50 C80,70 70,90 50,90 C30,90 20,70 20,50 C20,30 30,10 50,10 Z" 
          className={strokeColor}
          fill="none"
          strokeWidth="1"
        />
        <path 
          d="M50,20 C60,20 65,35 65,50 C65,65 60,80 50,80 C40,80 35,65 35,50 C35,35 40,20 50,20 Z" 
          className={strokeColor}
          fill="none"
          strokeWidth="0.5"
        />
        <path 
          d="M50,30 C55,30 60,40 60,50 C60,60 55,70 50,70 C45,70 40,60 40,50 C40,40 45,30 50,30 Z" 
          className={strokeColor}
          fill="none"
          strokeWidth="0.5"
        />
        <path 
          d="M50,10 C60,30 60,70 50,90" 
          className={strokeColor}
          fill="none"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}

export function DecorativeDivider({
  className,
  variant = 'gold',
}: {
  className?: string;
  variant?: 'gold' | 'accent' | 'subtle';
}) {
  const color = 
    variant === 'gold' ? 'bg-primary' : 
    variant === 'accent' ? 'bg-accent' : 
    'bg-primary/30';

  return (
    <div className={cn("flex items-center w-full my-4", className)}>
      <div className={cn("flex-grow h-px", color, variant === 'subtle' ? 'opacity-30' : 'opacity-70')}></div>
      <div className="mx-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
            className={cn(
              variant === 'gold' ? 'stroke-primary' : 
              variant === 'accent' ? 'stroke-accent' : 
              'stroke-primary/30'
            )}
            strokeWidth="1" 
          />
          <path 
            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" 
            className={cn(
              variant === 'gold' ? 'stroke-primary' : 
              variant === 'accent' ? 'stroke-accent' : 
              'stroke-primary/30'
            )}
            strokeWidth="1" 
            fill="none"
          />
          <circle 
            cx="12" 
            cy="12" 
            r="2" 
            className={cn(
              variant === 'gold' ? 'fill-primary' : 
              variant === 'accent' ? 'fill-accent' : 
              'fill-primary/30'
            )}
          />
        </svg>
      </div>
      <div className={cn("flex-grow h-px", color, variant === 'subtle' ? 'opacity-30' : 'opacity-70')}></div>
    </div>
  );
}

export function LuxuryContainer({ 
  children, 
  className,
  decorative = true,
}: { 
  children: React.ReactNode;
  className?: string;
  decorative?: boolean;
}) {
  return (
    <div className={cn(
      "relative p-6 rounded-lg",
      className
    )}>
      {decorative && (
        <>
          <DecorativeCorner position="top-left" />
          <DecorativeCorner position="top-right" />
          <DecorativeCorner position="bottom-left" />
          <DecorativeCorner position="bottom-right" />
        </>
      )}
      {children}
    </div>
  );
}

