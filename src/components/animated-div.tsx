'use client';

import { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';

type AnimationType = 'slideIn' | 'royalEntrance' | 'fadeInScale' | 'goldenCurtain' | 'crownDrop' | 'royalFanfare';

interface AnimatedDivProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number; // in milliseconds
  animation?: AnimationType;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

export function AnimatedDiv({ 
  children, 
  className, 
  style, 
  delay = 0,
  animation = 'slideIn',
  staggerChildren = false,
  staggerDelay = 0.1
}: AnimatedDivProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px');

  const animationVariants = {
    slideIn: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    },
    royalEntrance: {
      hidden: { 
        opacity: 0, 
        scale: 0.8, 
        y: -20,
        rotateX: -15
      },
      visible: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotateX: 0,
        transition: {
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
        }
      }
    },
    fadeInScale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.6,
          ease: "easeOut"
        }
      }
    },
    goldenCurtain: {
      hidden: { 
        opacity: 0,
        clipPath: 'inset(0 100% 0 0)',
        filter: 'brightness(0.5)'
      },
      visible: { 
        opacity: 1,
        clipPath: 'inset(0 0% 0 0)',
        filter: 'brightness(1)',
        transition: {
          duration: 1.5,
          ease: [0.25, 0.46, 0.45, 0.94],
          clipPath: { delay: 0.2 },
          filter: { delay: 0.5 }
        }
      }
    },
    crownDrop: {
      hidden: { 
        opacity: 0, 
        y: -100, 
        rotate: -10,
        scale: 0.8
      },
      visible: { 
        opacity: 1, 
        y: 0, 
        rotate: 0,
        scale: 1,
        transition: {
          duration: 1.0,
          ease: [0.68, -0.55, 0.265, 1.55],
          type: "spring",
          stiffness: 200,
          damping: 20
        }
      }
    },
    royalFanfare: {
      hidden: { 
        opacity: 0, 
        scale: 0.5,
        rotate: -5,
        filter: 'blur(10px)'
      },
      visible: { 
        opacity: 1, 
        scale: 1,
        rotate: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 1.4,
          ease: [0.25, 0.46, 0.45, 0.94],
          scale: { type: "spring", stiffness: 150, damping: 15 },
          filter: { delay: 0.3 }
        }
      }
    }
  };

  const containerVariants = staggerChildren ? {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay / 1000
      }
    }
  } : {};

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={style}
      variants={staggerChildren ? containerVariants : animationVariants[animation]}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Golden particle trail effect for royal animations */}
      {(animation === 'royalEntrance' || animation === 'royalFanfare') && isVisible && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/60 rounded-full"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + Math.sin(i) * 20}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [0, Math.cos(i) * 20, 0],
                y: [0, Math.sin(i) * 20, 0],
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.1 + 0.3,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Crown effect for crownDrop animation */}
      {animation === 'crownDrop' && isVisible && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl"
          initial={{ opacity: 0, y: -50, rotate: -20 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            y: [-50, -20, -20, 10],
            rotate: [-20, 0, 0, 10]
          }}
          transition={{ 
            duration: 2,
            times: [0, 0.3, 0.7, 1],
            delay: 0.5
          }}
        >
          👑
        </motion.div>
      )}

      {staggerChildren ? (
        <motion.div variants={animationVariants[animation]}>
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}

