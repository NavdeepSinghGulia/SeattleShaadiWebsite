'use client';

import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useAnimationPreferences } from '@/hooks/use-animation-preferences';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
}

// Smooth scroll reveal animation
export function ScrollReveal({ children, className = '' }: ScrollAnimationProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const { prefersReducedMotion } = useAnimationPreferences();
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax scroll effect
interface ParallaxScrollProps extends ScrollAnimationProps {
  speed?: number;
  direction?: 'up' | 'down';
}

export function ParallaxScroll({ 
  children, 
  className = '', 
  speed = 0.5, 
  direction = 'up' 
}: ParallaxScrollProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const { prefersReducedMotion } = useAnimationPreferences();
  
  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, multiplier * speed * 100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scroll-triggered fade in from different directions
interface ScrollFadeProps extends ScrollAnimationProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  distance?: number;
}

export function ScrollFade({ 
  children, 
  className = '', 
  direction = 'up', 
  distance = 50 
}: ScrollFadeProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.2'],
  });
  
  const { prefersReducedMotion } = useAnimationPreferences();
  
  const getTransform = (dir: string): [number, number] => {
    switch (dir) {
      case 'left': return [-distance, 0];
      case 'right': return [distance, 0];
      case 'down': return [0, -distance];
      default: return [0, distance];
    }
  };

  const [fromX, fromY] = getTransform(direction);
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [fromX, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [fromY, 0]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scale on scroll
export function ScrollScale({ children, className = '' }: ScrollAnimationProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const { prefersReducedMotion } = useAnimationPreferences();
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Rotate on scroll
interface ScrollRotateProps extends ScrollAnimationProps {
  rotation?: number;
}

export function ScrollRotate({ 
  children, 
  className = '', 
  rotation = 360 
}: ScrollRotateProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const { prefersReducedMotion } = useAnimationPreferences();
  
  const rotate = useTransform(scrollYProgress, [0, 1], [0, rotation]);
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotate: smoothRotate }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Progress bar that follows scroll
interface ScrollProgressProps {
  className?: string;
  height?: string;
  color?: string;
}

export function ScrollProgress({ 
  className = '', 
  height = '4px', 
  color = 'hsl(var(--primary))' 
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const { prefersReducedMotion } = useAnimationPreferences();
  
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 origin-left ${className}`}
      style={{
        height,
        backgroundColor: color,
        scaleX,
      }}
    />
  );
}

// Text reveal on scroll
export function ScrollTextReveal({ children, className = '' }: ScrollAnimationProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.2'],
  });
  
  const { prefersReducedMotion } = useAnimationPreferences();
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

