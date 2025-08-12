import { Variants } from 'framer-motion';

export interface MobileAnimationConfig {
  enableParticles: boolean;
  enableComplexAnimations: boolean;
  animationDuration: number;
  particleCount: number;
  glowIntensity: number;
  enableHapticFeedback: boolean;
}

export const createMobileRoyalVariants = (config: MobileAnimationConfig): Record<string, Variants> => {
  return {
    // Royal floating animation optimized for mobile
    royalFloat: {
      animate: config.enableComplexAnimations ? {
        y: [0, -8, 0],
        rotate: [0, 1, -1, 0],
        scale: [1, 1.02, 1],
        transition: {
          duration: config.animationDuration * 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      } : {}
    },

    // Golden pulse effect with mobile optimization
    goldenPulse: {
      animate: config.enableComplexAnimations ? {
        boxShadow: [
          `0 0 0px rgba(184, 134, 11, 0)`,
          `0 0 20px rgba(184, 134, 11, ${config.glowIntensity * 0.4})`,
          `0 0 40px rgba(184, 134, 11, ${config.glowIntensity * 0.2})`,
          `0 0 20px rgba(184, 134, 11, ${config.glowIntensity * 0.4})`,
          `0 0 0px rgba(184, 134, 11, 0)`
        ],
        transition: {
          duration: config.animationDuration * 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      } : {}
    },

    // Crown bounce animation for mobile
    crownBounce: {
      animate: config.enableComplexAnimations ? {
        y: [0, -5, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 1],
        transition: {
          duration: config.animationDuration * 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      } : {}
    },

    // Royal entrance with mobile considerations
    royalEntrance: {
      hidden: {
        opacity: 0,
        scale: 0.9,
        y: 20,
        filter: 'blur(5px)'
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: config.animationDuration,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 150,
          damping: 20
        }
      }
    },

    // Jewel sparkle effect optimized for mobile
    jewelSparkle: {
      animate: config.enableParticles ? {
        opacity: [0, 1, 0],
        scale: [0, 1.2, 0],
        rotate: [0, 180, 360],
        transition: {
          duration: config.animationDuration * 2,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }
      } : {}
    },

    // Mobile-friendly hover states
    mobileHover: {
      idle: {
        scale: 1,
        boxShadow: `0 2px 8px rgba(184, 134, 11, ${config.glowIntensity * 0.2})`
      },
      hover: {
        scale: 1.02,
        boxShadow: `0 4px 15px rgba(184, 134, 11, ${config.glowIntensity * 0.4})`,
        transition: {
          duration: config.animationDuration * 0.5,
          ease: "easeOut"
        }
      },
      tap: {
        scale: 0.98,
        transition: {
          duration: 0.1
        }
      }
    },

    // Mobile card animations
    mobileCard: {
      hidden: {
        opacity: 0,
        scale: 0.95,
        y: 20
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: config.animationDuration,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      },
      hover: config.enableComplexAnimations ? {
        scale: 1.02,
        y: -2,
        boxShadow: `0 8px 25px rgba(184, 134, 11, ${config.glowIntensity * 0.3})`,
        transition: {
          duration: config.animationDuration * 0.6,
          ease: "easeOut"
        }
      } : {}
    },

    // Mobile text reveal
    mobileTextReveal: {
      hidden: {
        opacity: 0,
        y: 15,
        filter: 'blur(3px)'
      },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          delay: i * 0.1,
          duration: config.animationDuration,
          ease: "easeOut"
        }
      })
    },

    // Royal button press effect
    royalPress: {
      idle: {
        scale: 1,
        boxShadow: `0 4px 15px rgba(184, 134, 11, ${config.glowIntensity * 0.2})`
      },
      pressed: {
        scale: 0.95,
        boxShadow: `0 2px 8px rgba(184, 134, 11, ${config.glowIntensity * 0.4})`,
        transition: {
          duration: 0.1,
          ease: "easeOut"
        }
      }
    },

    // Elegant fade with mobile optimization
    elegantFade: {
      hidden: {
        opacity: 0,
        y: 10,
        filter: 'blur(2px)'
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: config.animationDuration,
          ease: "easeOut"
        }
      }
    },

    // Mobile-friendly stagger container
    mobileStagger: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    },

    // Royal shimmer effect for mobile
    royalShimmer: {
      animate: config.enableComplexAnimations ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        transition: {
          duration: config.animationDuration * 3,
          repeat: Infinity,
          ease: "linear"
        }
      } : {}
    }
  };
};

// Predefined mobile animation presets
export const mobileAnimationPresets = {
  minimal: {
    enableParticles: false,
    enableComplexAnimations: false,
    animationDuration: 0.3,
    particleCount: 0,
    glowIntensity: 0.2,
    enableHapticFeedback: true
  },
  balanced: {
    enableParticles: true,
    enableComplexAnimations: true,
    animationDuration: 0.6,
    particleCount: 6,
    glowIntensity: 0.5,
    enableHapticFeedback: true
  },
  luxurious: {
    enableParticles: true,
    enableComplexAnimations: true,
    animationDuration: 0.8,
    particleCount: 12,
    glowIntensity: 0.8,
    enableHapticFeedback: true
  }
} as const;

// Utility functions for mobile animations
export const mobileAnimationUtils = {
  // Get optimal particle count based on device capability
  getOptimalParticleCount: (baseCount: number, deviceScore: number): number => {
    if (deviceScore < 0.3) return Math.ceil(baseCount * 0.3);
    if (deviceScore < 0.6) return Math.ceil(baseCount * 0.6);
    return baseCount;
  },

  // Calculate device performance score (0-1)
  calculateDeviceScore: (): number => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    let score = 0.5; // Base score
    
    // Check for hardware acceleration
    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        if (renderer.includes('Apple') || renderer.includes('Mali') || renderer.includes('Adreno')) {
          score += 0.3;
        }
      }
    }
    
    // Check memory
    if ('memory' in performance) {
      const memory = (performance as Performance & { memory?: { usedJSHeapSize: number; totalJSHeapSize: number } }).memory;
      if (memory && memory.usedJSHeapSize < memory.totalJSHeapSize * 0.5) {
        score += 0.2;
      }
    }
    
    return Math.min(score, 1);
  },

  // Trigger haptic feedback with fallback
  triggerHaptic: (pattern: 'light' | 'medium' | 'heavy' = 'light'): void => {
    if (!navigator.vibrate) return;
    
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30, 10, 30]
    };
    
    navigator.vibrate(patterns[pattern]);
  }
};
