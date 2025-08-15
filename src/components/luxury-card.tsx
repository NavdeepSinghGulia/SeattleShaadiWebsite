'use client';

import React from 'react';
import { useAnimationPreferences } from '@/hooks/use-animation-preferences';

interface LuxuryCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gold' | 'royal' | 'elegant';
  hoverEffect?: boolean;
  decorativeBorder?: boolean;
  onClick?: () => void;
}

export function LuxuryCard({
  children,
  className = '',
  variant = 'default',
  hoverEffect = true,
  decorativeBorder = true,
  onClick,
}: LuxuryCardProps) {
  const { preferences } = useAnimationPreferences();
  
  // Define variant styles
  const variantStyles = {
    default: 'bg-white',
    gold: 'bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50',
    royal: 'bg-gradient-to-r from-purple-50 via-purple-100 to-purple-50',
    elegant: 'bg-gradient-to-r from-slate-50 via-white to-slate-50',
  };
  
  // Define border styles
  const borderStyles = decorativeBorder
    ? variant === 'gold'
      ? 'border-2 border-amber-600'
      : variant === 'royal'
      ? 'border-2 border-purple-700'
      : variant === 'elegant'
      ? 'border-2 border-slate-400'
      : 'border-2 border-gray-300'
    : '';
  
  // Define hover effects
  const hoverStyles = hoverEffect && !preferences.reducedMotion
    ? 'transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1'
    : '';
  
  // Combined classes
  const combinedClasses = `
    luxury-card
    ${variantStyles[variant]}
    ${borderStyles}
    ${hoverStyles}
    ${preferences.highPerformance ? 'hardware-accelerated' : ''}
    rounded-lg overflow-hidden shadow-lg
    ${className}
  `;
  
  return (
    <div className={combinedClasses} onClick={onClick}>
      {/* Decorative corner elements for royal and gold variants */}
      {decorativeBorder && (variant === 'royal' || variant === 'gold') && (
        <>
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-600 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-600 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-600 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-600 rounded-br-lg"></div>
        </>
      )}
      
      {/* Card content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Decorative bottom border for gold and royal variants */}
      {decorativeBorder && (variant === 'gold' || variant === 'royal') && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
      )}
    </div>
  );
}

