'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { useMobileRoyalAnimations } from '@/hooks/use-mobile-royal-animations';

interface LuxuryCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'royal' | 'elegant';
  hoverable?: boolean;
  glowEffect?: boolean;
}

export function LuxuryCard({
  children,
  className,
  variant = 'default',
  hoverable = true,
  glowEffect = false
}: LuxuryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile, isTouch, variants, triggerHapticFeedback, settings } = useMobileRoyalAnimations();

  const baseClasses = "relative overflow-hidden rounded-xl border backdrop-blur-sm";
  
  const variantClasses = {
    default: "bg-card/80 border-border/50",
    royal: "bg-gradient-to-br from-primary/5 via-card/90 to-accent/5 border-primary/20",
    elegant: "bg-card/90 border-accent/30"
  };

  // Use mobile-optimized variants when on mobile
  const cardVariants = isMobile ? variants.mobileCard : {
    idle: {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      boxShadow: variant === 'royal' 
        ? "0 4px 20px rgba(184, 134, 11, 0.1)" 
        : "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    hover: {
      scale: 1.02,
      rotateX: 2,
      rotateY: 2,
      boxShadow: variant === 'royal' 
        ? "0 12px 40px rgba(184, 134, 11, 0.2), 0 0 30px rgba(184, 134, 11, 0.1)" 
        : "0 8px 30px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const glowVariants = {
    idle: { 
      opacity: 0,
      scale: 0.8,
      rotate: 0
    },
    hover: { 
      opacity: glowEffect ? 0.4 : 0.2,
      scale: 1.1,
      rotate: 180,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const borderVariants = {
    idle: {
      background: variant === 'royal' 
        ? 'linear-gradient(45deg, transparent, hsl(var(--primary) / 0.1), transparent)'
        : 'linear-gradient(45deg, transparent, hsl(var(--border)), transparent)'
    },
    hover: {
      background: variant === 'royal' 
        ? 'linear-gradient(45deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.2), hsl(var(--primary) / 0.3))'
        : 'linear-gradient(45deg, hsl(var(--accent) / 0.2), hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.2))',
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const shimmerVariants = {
    idle: { x: '-100%', opacity: 0 },
    hover: { 
      x: '100%',
      opacity: [0, 0.3, 0],
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        delay: 0.2
      }
    }
  };

  const particleVariants = {
    idle: { opacity: 0, scale: 0, y: 0 },
    hover: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [0, -20, -40],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  };

  return (
    <motion.div
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverable && "cursor-pointer",
        "preserve-3d",
        className
      )}
      variants={cardVariants}
      initial="idle"
      animate={isHovered && hoverable ? "hover" : "idle"}
      onHoverStart={() => !isTouch && setIsHovered(true)}
      onHoverEnd={() => !isTouch && setIsHovered(false)}
      onTapStart={() => {
        if (isTouch && settings.enableHapticFeedback) {
          triggerHapticFeedback('light');
        }
        setIsHovered(true);
      }}
      onTapCancel={() => {
        if (isTouch) {
          setTimeout(() => setIsHovered(false), 200);
        }
      }}
      onPointerUp={() => {
        if (isTouch) {
          setTimeout(() => setIsHovered(false), 200);
        }
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-xl p-[1px]"
        variants={borderVariants}
        initial="idle"
        animate={isHovered ? "hover" : "idle"}
      >
        <div className="w-full h-full rounded-xl bg-card/95" />
      </motion.div>

      {/* Golden Glow Effect */}
      <motion.div
        className="absolute -inset-2 rounded-xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl"
        variants={glowVariants}
        initial="idle"
        animate={isHovered ? "hover" : "idle"}
      />

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
        variants={shimmerVariants}
        initial="idle"
        animate={isHovered ? "hover" : "idle"}
      />

      {/* Royal Particles - Mobile Optimized */}
      {variant === 'royal' && settings.enableParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: Math.min(4, settings.particleCount) }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/60 rounded-full"
              style={{
                left: `${25 + i * 20}%`,
                top: `${80 - i * 10}%`,
              }}
              variants={particleVariants}
              initial="idle"
              animate={isHovered ? "hover" : "idle"}
              transition={{
                delay: i * 0.2,
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>

      {/* Elegant corner decorations */}
      {variant === 'elegant' && (
        <>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/30 rounded-tl-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/30 rounded-br-xl" />
        </>
      )}
    </motion.div>
  );
}
