
'use client';

import { useRef, ReactNode } from 'react';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';

interface AnimatedDivProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number; // in milliseconds
}

export function AnimatedDiv({ children, className, style, delay = 0 }: AnimatedDivProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px');

  return (
    <div
      ref={ref}
      className={cn(className, isVisible ? 'animate-fade-in-up' : 'opacity-0')}
      style={{
        ...style,
        animationDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}
