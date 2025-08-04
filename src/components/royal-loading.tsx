'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface RoyalLoadingProps {
  variant?: 'spinner' | 'dots' | 'shimmer';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export function RoyalLoading({
  variant = 'spinner',
  size = 'md',
  className,
  text
}: RoyalLoadingProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (variant === 'spinner') {
    return (
      <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
        <motion.div
          className={cn("text-primary", sizeClasses[size])}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Loader2 className="w-full h-full" />
        </motion.div>
        
        {text && (
          <motion.p
            className={cn("text-muted-foreground font-medium", textSizeClasses[size])}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
        <div className="flex space-x-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "bg-primary rounded-full",
                size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
              )}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {text && (
          <motion.p
            className={cn("text-muted-foreground font-medium", textSizeClasses[size])}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'shimmer') {
    return (
      <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
        <div className={cn("relative overflow-hidden rounded-lg bg-muted", sizeClasses[size])}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {text && (
          <div className="relative overflow-hidden rounded bg-muted px-4 py-2">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <p className={cn("text-transparent", textSizeClasses[size])}>
              {text}
            </p>
          </div>
        )}
      </div>
    );
  }

  return null;
}

// Royal Skeleton Loader Component
interface RoyalSkeletonProps {
  className?: string;
  lines?: number;
  avatar?: boolean;
}

export function RoyalSkeleton({ className, lines = 3, avatar = false }: RoyalSkeletonProps) {
  return (
    <div className={cn("animate-pulse space-y-4", className)}>
      {avatar && (
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-muted rounded-full relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-muted rounded w-1/4 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              />
            </div>
            <div className="h-3 bg-muted rounded w-1/6 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-4 bg-muted rounded relative overflow-hidden",
              i === lines - 1 ? "w-3/4" : "w-full"
            )}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
