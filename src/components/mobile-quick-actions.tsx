'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { useAnimationPreferences } from '@/hooks/use-animation-preferences';

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface MobileQuickActionsProps {
  actions: QuickAction[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

export function MobileQuickActions({
  actions,
  position = 'bottom-right',
  className = '',
}: MobileQuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile, isTablet } = useMobileDetection();
  const { preferences } = useAnimationPreferences();
  
  // Only show on mobile and tablet
  const shouldShow = isMobile || isTablet;
  
  if (!shouldShow) return null;
  
  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-20 right-4',
    'bottom-left': 'bottom-20 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };
  
  // Animation variants
  const containerVariants = {
    closed: {
      opacity: 1,
    },
    open: {
      opacity: 1,
    },
  };
  
  const buttonVariants = {
    closed: (i: number) => ({
      opacity: 0,
      y: 20,
      transition: {
        duration: preferences.reducedMotion ? 0.1 : 0.4,
        delay: preferences.reducedMotion ? 0 : i * 0.1,
      },
    }),
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: preferences.reducedMotion ? 0.1 : 0.4,
        delay: preferences.reducedMotion ? 0 : i * 0.1,
      },
    }),
  };
  
  return (
    <div className={`fixed z-40 ${positionClasses[position]} ${className}`}>
      <motion.div
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={containerVariants}
        className="flex flex-col items-center space-y-2"
      >
        <AnimatePresence>
          {isOpen && (
            <>
              {actions.map((action, i) => (
                <motion.button
                  key={i}
                  custom={actions.length - i}
                  variants={buttonVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  onClick={() => {
                    setIsOpen(false);
                    action.onClick();
                  }}
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center touch-feedback"
                  aria-label={action.label}
                >
                  {action.icon}
                </motion.button>
              ))}
            </>
          )}
        </AnimatePresence>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-10 transition-all duration-300 touch-feedback ${
            isOpen 
              ? 'bg-amber-600 text-white rotate-45' 
              : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
          }`}
          aria-label={isOpen ? 'Close quick actions' : 'Open quick actions'}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </motion.div>
    </div>
  );
}

