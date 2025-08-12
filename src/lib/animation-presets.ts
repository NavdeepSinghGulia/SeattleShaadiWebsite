/**
 * Animation Presets System
 * 
 * Predefined animation configurations for consistent motion design
 * across the application. Supports accessibility and performance optimization.
 */

import { Variants } from 'framer-motion';

// Base animation durations (in seconds)
export const ANIMATION_DURATIONS = {
  instant: 0.01,
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  slowest: 1.2,
} as const;

// Easing functions for consistent motion
export const EASING = {
  // Standard easing
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  
  // Custom easing for royal/elegant feel
  royal: [0.25, 0.46, 0.45, 0.94],
  elegant: [0.23, 1, 0.32, 1],
  smooth: [0.4, 0, 0.2, 1],
  
  // Bouncy animations
  bounce: [0.68, -0.55, 0.265, 1.55],
  softBounce: [0.34, 1.56, 0.64, 1],
  
  // Sharp animations
  sharp: [0.4, 0, 0.6, 1],
  snappy: [0.25, 0.46, 0.45, 0.94],
} as const;

// Fade animations
export const fadeVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: EASING.easeOut
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: EASING.easeIn
    }
  }
};

// Slide animations
export const slideVariants = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: ANIMATION_DURATIONS.normal,
        ease: EASING.royal
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: ANIMATION_DURATIONS.fast,
        ease: EASING.easeIn
      }
    }
  },
  down: {
    hidden: { opacity: 0, y: -40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: ANIMATION_DURATIONS.normal,
        ease: EASING.royal
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: {
        duration: ANIMATION_DURATIONS.fast,
        ease: EASING.easeIn
      }
    }
  },
  left: {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: ANIMATION_DURATIONS.normal,
        ease: EASING.royal
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: {
        duration: ANIMATION_DURATIONS.fast,
        ease: EASING.easeIn
      }
    }
  },
  right: {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: ANIMATION_DURATIONS.normal,
        ease: EASING.royal
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: {
        duration: ANIMATION_DURATIONS.fast,
        ease: EASING.easeIn
      }
    }
  }
} as const;

// Scale animations
export const scaleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: EASING.elegant
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: EASING.easeIn
    }
  }
};

// Stagger animations for lists
export const staggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      duration: ANIMATION_DURATIONS.fast
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      duration: ANIMATION_DURATIONS.fast
    }
  }
};

// Stagger child variants
export const staggerChildVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: EASING.royal
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: EASING.easeIn
    }
  }
};

// Hover animations
export const hoverVariants = {
  scale: {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: ANIMATION_DURATIONS.fast,
        ease: EASING.easeOut
      }
    }
  },
  lift: {
    rest: { y: 0, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
    hover: { 
      y: -4,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        duration: ANIMATION_DURATIONS.fast,
        ease: EASING.easeOut
      }
    }
  },
  glow: {
    rest: { boxShadow: '0 0 0 0 rgba(168, 85, 247, 0)' },
    hover: { 
      boxShadow: '0 0 20px 0 rgba(168, 85, 247, 0.4)',
      transition: {
        duration: ANIMATION_DURATIONS.normal,
        ease: EASING.easeOut
      }
    }
  }
} as const;

// Loading animations
export const loadingVariants: Variants = {
  spin: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  },
  pulse: {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: EASING.easeInOut
      }
    }
  },
  bounce: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: EASING.easeInOut
      }
    }
  }
};

// Page transition animations
export const pageVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  in: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: EASING.royal
    }
  },
  out: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: EASING.easeIn
    }
  }
};

// Modal/Dialog animations
export const modalVariants: Variants = {
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
      duration: ANIMATION_DURATIONS.normal,
      ease: EASING.elegant
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    y: 20,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: EASING.easeIn
    }
  }
};

// Backdrop animations
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: EASING.easeOut
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: EASING.easeIn
    }
  }
};

// Notification animations
export const notificationVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 300,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: EASING.elegant
    }
  },
  exit: { 
    opacity: 0, 
    x: 300,
    scale: 0.9,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: EASING.easeIn
    }
  }
};

// Utility function to get animation variants based on preferences
export const getAnimationVariants = (
  type: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'modal' | 'notification',
  reducedMotion: boolean = false
) => {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: ANIMATION_DURATIONS.instant } },
      exit: { opacity: 0, transition: { duration: ANIMATION_DURATIONS.instant } }
    };
  }

  switch (type) {
    case 'fade':
      return fadeVariants;
    case 'slideUp':
      return slideVariants.up;
    case 'slideDown':
      return slideVariants.down;
    case 'slideLeft':
      return slideVariants.left;
    case 'slideRight':
      return slideVariants.right;
    case 'scale':
      return scaleVariants;
    case 'modal':
      return modalVariants;
    case 'notification':
      return notificationVariants;
    default:
      return fadeVariants;
  }
};

// Utility function to get stagger configuration
export const getStaggerConfig = (reducedMotion: boolean = false) => {
  if (reducedMotion) {
    return {
      staggerChildren: 0,
      delayChildren: 0
    };
  }

  return {
    staggerChildren: 0.1,
    delayChildren: 0.1
  };
};

