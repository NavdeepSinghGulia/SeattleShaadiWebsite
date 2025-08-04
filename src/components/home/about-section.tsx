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
            {/* Subtle decorative elements - elegant without crowns */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute bottom-10 right-10 text-accent/15 text-2xl animate-elegant-float animation-delay-300"
                    variants={elegantVariants.decorativeFloat}
                    animate="animate"
                    style={{ animationDelay: '3s' }}
                >
                    💎
                </motion.div>
            </div>

            <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                <motion.div
                    variants={elegantVariants.staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <motion.div variants={elegantVariants.fadeInUp}>
                        <RoyalTypography
                            variant="h2"
                            className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-elegant-gradient"
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

                    {/* Our Values - Purposeful: Showcases key benefits */}
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
                        variants={elegantVariants.staggerContainer}
                    >
                        <motion.div variants={elegantVariants.fadeInUp}>
                            <LuxuryCard variant="royal" className="text-center p-6 group hover:shadow-lg transition-all duration-300 ease-out">
                                <div className="text-3xl mb-4 animate-elegant-float">
                                    ✨
                                </div>
                                <RoyalTypography
                                    variant="h4"
                                    className="text-xl font-bold text-primary mb-3"
                                >
                                    Royal Elegance
                                </RoyalTypography>
                                <p className="text-muted-foreground text-sm">
                                    Every detail crafted with majestic precision and timeless sophistication
                                </p>
                            </LuxuryCard>
                        </motion.div>

                        <motion.div variants={elegantVariants.fadeInUp}>
                            <LuxuryCard variant="royal" className="text-center p-6 group hover:shadow-lg transition-all duration-300 ease-out">
                                <div className="text-3xl mb-4 animate-elegant-sparkle">
                                    💎
                                </div>
                                <RoyalTypography
                                    variant="h4"
                                    className="text-xl font-bold text-primary mb-3"
                                >
                                    Personalized Touch
                                </RoyalTypography>
                                <p className="text-muted-foreground text-sm">
                                    Your unique love story deserves a celebration as special as you are
                                </p>
                            </LuxuryCard>
                        </motion.div>

                        <motion.div variants={elegantVariants.fadeInUp}>
                            <LuxuryCard variant="royal" className="text-center p-6 group hover:shadow-lg transition-all duration-300 ease-out">
                                <div className="text-3xl mb-4 animate-elegant-float animation-delay-200">
                                    ✨
                                </div>
                                <RoyalTypography
                                    variant="h4"
                                    className="text-xl font-bold text-primary mb-3"
                                >
                                    Magical Moments
                                </RoyalTypography>
                                <p className="text-muted-foreground text-sm">
                                    Creating unforgettable memories that will last a lifetime
                                </p>
                            </LuxuryCard>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
