'use client';

import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { useRef, useEffect, ReactNode } from 'react';
import { useAnimationPreferences } from '@/hooks/use-animation-preferences';

interface RoyalAnimationProps {
  children: ReactNode;
  variant?: 'entrance' | 'float' | 'glow' | 'sparkle' | 'crown' | 'jewel';
  delay?: number;
  duration?: number;
  className?: string;
}

// Royal animation variants
const royalVariants: Record<string, Variants> = {
  entrance: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 30,
      rotateX: -15,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      },
    },
  },
  float: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  },
  glow: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 0 30px hsl(var(--primary) / 0.6)',
      transition: {
        duration: 0.3,
      },
    },
  },
  sparkle: {
    hidden: { opacity: 0, rotate: -180, scale: 0 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 100,
      },
    },
  },
  crown: {
    hidden: { opacity: 0, y: -50, rotate: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.68, -0.55, 0.265, 1.55],
      },
    },
    hover: {
      y: -5,
      rotate: 5,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  },
  jewel: {
    hidden: { opacity: 0, scale: 0, rotate: 45 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: 'backOut',
      },
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  },
};

export function RoyalAnimation({
  children,
  variant = 'entrance',
  delay = 0,
  duration,
  className = '',
}: RoyalAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();
  const { prefersReducedMotion } = useAnimationPreferences();

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      controls.start('visible');
    } else if (isInView && prefersReducedMotion) {
      controls.start('visible');
    }
  }, [isInView, controls, prefersReducedMotion]);

  const variants = royalVariants[variant];
  
  // Override duration if provided
  if (duration && variants.visible && typeof variants.visible === 'object') {
    variants.visible.transition = {
      ...variants.visible.transition,
      duration,
    };
  }

  // Add delay if provided
  if (delay && variants.visible && typeof variants.visible === 'object') {
    variants.visible.transition = {
      ...variants.visible.transition,
      delay,
    };
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Specialized royal components
export function RoyalEntrance({ children, delay = 0, className = '' }: Omit<RoyalAnimationProps, 'variant'>) {
  return (
    <RoyalAnimation variant="entrance" delay={delay} className={className}>
      {children}
    </RoyalAnimation>
  );
}

export function RoyalFloat({ children, className = '' }: Omit<RoyalAnimationProps, 'variant'>) {
  return (
    <RoyalAnimation variant="float" className={className}>
      {children}
    </RoyalAnimation>
  );
}

export function RoyalGlow({ children, className = '' }: Omit<RoyalAnimationProps, 'variant'>) {
  return (
    <RoyalAnimation variant="glow" className={className}>
      {children}
    </RoyalAnimation>
  );
}

export function RoyalSparkle({ children, delay = 0, className = '' }: Omit<RoyalAnimationProps, 'variant'>) {
  return (
    <RoyalAnimation variant="sparkle" delay={delay} className={className}>
      {children}
    </RoyalAnimation>
  );
}

// Staggered children animation
interface RoyalStaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function RoyalStagger({ children, staggerDelay = 0.1, className = '' }: RoyalStaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { prefersReducedMotion } = useAnimationPreferences();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

// Parallax effect for royal backgrounds
interface RoyalParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function RoyalParallax({ children, speed = 0.5, className = '' }: RoyalParallaxProps) {
  const ref = useRef(null);
  const { prefersReducedMotion } = useAnimationPreferences();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * speed;
      (element as HTMLElement).style.transform = `translateY(${parallax}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, prefersReducedMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

