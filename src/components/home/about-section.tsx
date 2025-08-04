import { AnimatedDiv } from '@/components/animated-div';
import { RoyalTypography } from '@/components/royal-typography';
import { LuxuryCard } from '@/components/luxury-card';
import { motion } from 'framer-motion';

// Elegant animation variants following design principles
const elegantVariants = {
  // Purposeful: Provides visual feedback for content loading
  // Swift: 400ms duration with organic easing
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  // Purposeful: Staggered content reveal for better UX
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  // Purposeful: Adds subtle life to decorative elements
  // Organic Motion: Natural floating movement
  decorativeFloat: {
    animate: {
      y: [-2, 2, -2],
      rotate: [-1, 1, -1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

export function AboutSection() {
    return (
        <section className="py-16 md:py-24 bg-background/50 relative overflow-hidden">


            <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                <motion.div
                    variants={elegantVariants.staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <motion.div variants={elegantVariants.fadeInUp}>
                        <RoyalTypography
                            variant="h2"
                            className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-elegant-gradient pb-2"
                        >
                            The Architects of Your Dream Day
                        </RoyalTypography>
                    </motion.div>
                    
                    <motion.div variants={elegantVariants.fadeInUp}>
                        <RoyalTypography
                            variant="p"
                            className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground"
                        >
                            Seattle Shaadi was born from a passion for creating beautiful, seamless, and personal weddings. We believe that every couple has a unique story, and we're here to help you tell it in the most spectacular way possible.
                        </RoyalTypography>
                    </motion.div>


                </motion.div>
            </div>
        </section>
    );
}
