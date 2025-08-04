'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { useMobileRoyalAnimations } from '@/hooks/use-mobile-royal-animations';

interface RoyalTypographyProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  animation?: 'typewriter' | 'goldenGlow' | 'royalReveal' | 'elegantFade' | 'crownTitle';
  className?: string;
  delay?: number;
  duration?: number;
  glowOnHover?: boolean;
}

export function RoyalTypography({
  children,
  variant = 'p',
  animation = 'elegantFade',
  className,
  delay = 0,
  duration = 1,
  glowOnHover = false
}: RoyalTypographyProps) {
  const [isHovered, setIsHovered] = useState(false);
  const text = typeof children === 'string' ? children : '';
  const { isMobile, isTouch, variants, settings, isSmallScreen } = useMobileRoyalAnimations();

  const Component = motion[variant as keyof typeof motion] || motion.p;

  const baseClasses = {
    h1: "text-4xl md:text-6xl font-headline font-bold",
    h2: "text-3xl md:text-5xl font-headline font-semibold",
    h3: "text-2xl md:text-4xl font-headline font-semibold",
    h4: "text-xl md:text-2xl font-headline font-medium",
    p: "text-base md:text-lg font-body",
    span: "font-body"
  };

  // Mobile-optimized animation duration
  const mobileDuration = isMobile ? settings.animationDuration : duration;
  
  const animationVariants = {
    typewriter: {
      hidden: { width: 0 },
      visible: {
        width: "100%",
        transition: {
          duration: mobileDuration,
          ease: "easeInOut",
          delay: delay
        }
      }
    },
    goldenGlow: {
      hidden: { 
        opacity: 0,
        textShadow: "0 0 0px rgba(184, 134, 11, 0)"
      },
      visible: {
        opacity: 1,
        textShadow: settings.enableComplexAnimations ? [
          "0 0 0px rgba(184, 134, 11, 0)",
          `0 0 10px rgba(184, 134, 11, ${settings.glowIntensity * 0.5})`,
          `0 0 20px rgba(184, 134, 11, ${settings.glowIntensity * 0.3})`,
          `0 0 10px rgba(184, 134, 11, ${settings.glowIntensity * 0.5})`
        ] : `0 0 5px rgba(184, 134, 11, ${settings.glowIntensity * 0.3})`,
        transition: {
          duration: mobileDuration,
          delay: delay,
          textShadow: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }
      }
    },
    royalReveal: isMobile ? variants.mobileTextReveal : {
      hidden: { 
        opacity: 0,
        y: 30,
        clipPath: "inset(100% 0 0 0)"
      },
      visible: {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0 0 0)",
        transition: {
          duration: mobileDuration,
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    },
    elegantFade: {
      hidden: { 
        opacity: 0,
        y: isSmallScreen ? 10 : 20,
        filter: isSmallScreen ? "blur(3px)" : "blur(10px)"
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: mobileDuration,
          delay: delay,
          ease: "easeOut"
        }
      }
    },
    crownTitle: {
      hidden: { 
        opacity: 0,
        scale: 0.8,
        rotateX: -15
      },
      visible: {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        transition: {
          duration: duration,
          delay: delay,
          type: "spring",
          stiffness: 100,
          damping: 15
        }
      }
    }
  };

  const hoverVariants = {
    idle: {
      textShadow: "0 0 0px rgba(184, 134, 11, 0)",
      scale: 1
    },
    hover: {
      textShadow: `0 0 15px rgba(184, 134, 11, ${settings.glowIntensity * 0.6}), 0 0 25px rgba(184, 134, 11, ${settings.glowIntensity * 0.4})`,
      scale: isMobile ? 1.01 : 1.02,
      transition: {
        duration: settings.animationDuration * 0.5,
        ease: "easeOut"
      }
    }
  };

  // Split text into words for staggered animation
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (animation === 'typewriter' && typeof children === 'string') {
    return (
      <div className="relative overflow-hidden">
        <Component
          className={cn(baseClasses[variant], "whitespace-nowrap", className)}
          variants={animationVariants[animation]}
          initial="hidden"
          animate="visible"
        >
          {children}
        </Component>
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-1 bg-primary"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    );
  }

  if (animation === 'royalReveal' && words.length > 1) {
    return (
      <motion.div
        className={cn(baseClasses[variant], className)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-2"
            variants={wordVariants}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Crown decoration for crownTitle */}
      {animation === 'crownTitle' && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl"
          initial={{ opacity: 0, y: -20, rotate: -10 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotate: 0,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 1,
            delay: delay + 0.5,
            scale: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        >
          👑
        </motion.div>
      )}

      <Component
        className={cn(
          baseClasses[variant],
          glowOnHover && "cursor-pointer transition-all duration-300",
          className
        )}
        variants={glowOnHover ? hoverVariants : animationVariants[animation]}
        initial={glowOnHover ? "idle" : "hidden"}
        animate={glowOnHover ? (isHovered ? "hover" : "idle") : "visible"}
        onHoverStart={() => glowOnHover && !isTouch && setIsHovered(true)}
        onHoverEnd={() => glowOnHover && !isTouch && setIsHovered(false)}
        onTapStart={() => glowOnHover && isTouch && setIsHovered(true)}
        onTapEnd={() => glowOnHover && isTouch && setTimeout(() => setIsHovered(false), 200)}
      >
        {children}
      </Component>

      {/* Golden underline effect */}
      {(animation === 'goldenGlow' || glowOnHover) && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary"
          initial={{ width: 0, opacity: 0 }}
          animate={isHovered ? { width: "100%", opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}

      {/* Sparkle effects for special animations - Mobile Optimized */}
      {(animation === 'crownTitle' || animation === 'goldenGlow') && settings.enableParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: Math.min(3, Math.ceil(settings.particleCount / 2)) }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: delay + i * 0.5,
                repeatDelay: 3
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
