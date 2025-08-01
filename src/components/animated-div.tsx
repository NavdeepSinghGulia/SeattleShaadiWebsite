
'use client';

import { useRef, ReactNode } from 'react';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';

type AnimationType = 'slideIn' | 'royalEntrance' | 'fadeInScale';

interface AnimatedDivProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number; // in milliseconds
  animation?: AnimationType;
}

export function AnimatedDiv({ 
  children, 
  className, 
  style, 
  delay = 0,
  animation = 'slideIn' 
}: AnimatedDivProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px');

  const animationClasses = {
    slideIn: 'opacity-0 translate-y-5',
    royalEntrance: 'opacity-0 scale-90 -translate-y-4',
    fadeInScale: 'opacity-0 scale-95',
  };

  const visibleClasses = {
    slideIn: 'opacity-100 translate-y-0',
    royalEntrance: 'opacity-100 scale-100 translate-y-0',
    fadeInScale: 'opacity-100 scale-100',
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        isVisible ? visibleClasses[animation] : animationClasses[animation],
        className
      )}
      style={{
        ...style,
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}
