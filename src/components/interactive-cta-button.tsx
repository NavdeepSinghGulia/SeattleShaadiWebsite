'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { useMobileRoyalAnimations } from '@/hooks/use-mobile-royal-animations';

interface InteractiveCtaButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'royal';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  href?: string;
}

export function InteractiveCtaButton({
  children,
  className,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  href
}: InteractiveCtaButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { isMobile, isTouch, variants, triggerHapticFeedback, settings } = useMobileRoyalAnimations();

  const baseClasses = "relative inline-flex items-center justify-center font-medium transition-all duration-300 overflow-hidden rounded-lg";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
    royal: "bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  // Use mobile-optimized variants when on mobile
  const buttonVariants = isMobile ? variants.mobileHover : {
    idle: {
      scale: 1,
      boxShadow: variant === 'royal' 
        ? "0 4px 15px rgba(184, 134, 11, 0.2)" 
        : "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    hover: {
      scale: 1.05,
      boxShadow: variant === 'royal' 
        ? "0 8px 25px rgba(184, 134, 11, 0.4), 0 0 20px rgba(184, 134, 11, 0.3)" 
        : "0 4px 15px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    pressed: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const glowVariants = {
    idle: { opacity: 0, scale: 0.8 },
    hover: { 
      opacity: variant === 'royal' ? 0.6 : 0.3, 
      scale: 1.2,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const shimmerVariants = {
    idle: { x: '-100%' },
    hover: { 
      x: '100%',
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const particleVariants = {
    idle: { opacity: 0, scale: 0 },
    hover: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 0.5
      }
    }
  };

  const Component = href ? motion.a : motion.button;
  const componentProps = href ? { href } : { onClick, disabled };

  return (
    <Component
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      variants={buttonVariants}
      initial="idle"
      animate={isPressed ? "pressed" : isHovered ? "hover" : "idle"}
      onHoverStart={() => !isTouch && setIsHovered(true)}
      onHoverEnd={() => !isTouch && setIsHovered(false)}
      onTapStart={() => {
        setIsPressed(true);
        if (isTouch && settings.enableHapticFeedback) {
          triggerHapticFeedback('light');
        }
      }}
      onTapEnd={() => setIsPressed(false)}
      onTap={() => {
        if (isTouch && settings.enableHapticFeedback) {
          triggerHapticFeedback('medium');
        }
      }}
      whileTap={isMobile ? variants.mobileHover.tap : { scale: 0.98 }}
      {...componentProps}
    >
      {/* Golden Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 blur-md"
        variants={glowVariants}
        initial="idle"
        animate={isHovered ? "hover" : "idle"}
      />

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        variants={shimmerVariants}
        initial="idle"
        animate={isHovered ? "hover" : "idle"}
      />

      {/* Royal Particles - Mobile Optimized */}
      {variant === 'royal' && settings.enableParticles && (
        <>
          {Array.from({ length: settings.particleCount }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-foreground rounded-full"
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + Math.sin(i) * 20}%`,
              }}
              variants={particleVariants}
              initial="idle"
              animate={isHovered ? "hover" : "idle"}
              transition={{
                delay: i * 0.1,
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          ))}
        </>
      )}

      {/* Crown Icon for Royal Variant */}
      {variant === 'royal' && (
        <motion.span
          className="mr-2 text-lg"
          animate={isHovered ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          👑
        </motion.span>
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center">
        {children}
      </span>

      {/* Ripple Effect */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-lg"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
    </Component>
  );
}
