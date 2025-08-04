'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useMobileRoyalAnimations } from '@/hooks/use-mobile-royal-animations';
import { InteractiveCtaButton } from './interactive-cta-button';
import { LuxuryCard } from './luxury-card';
import { RoyalTypography } from './royal-typography';
import { MobileRoyalFooter } from './mobile-royal-footer';

interface MobileRoyalPageProps {
  children?: ReactNode;
  className?: string;
  showDemo?: boolean;
}

export function MobileRoyalPage({ children, className, showDemo = true }: MobileRoyalPageProps) {
  const { isMobile, isTouch, variants, settings, isSmallScreen, triggerHapticFeedback } = useMobileRoyalAnimations();

  const demoFeatures = [
    {
      title: "Royal Animations",
      description: "Majestic animations optimized for mobile devices with haptic feedback.",
      icon: "✨"
    },
    {
      title: "Touch Interactions",
      description: "Intuitive touch gestures with royal elegance and smooth transitions.",
      icon: "👆"
    },
    {
      title: "Performance First",
      description: "Optimized for all devices with adaptive animation complexity.",
      icon: "⚡"
    },
    {
      title: "Accessibility",
      description: "Respects user preferences with reduced motion support.",
      icon: "♿"
    }
  ];

  return (
    <div className={cn("min-h-screen bg-background relative overflow-hidden", className)}>
      {/* Royal Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        {/* Mobile-Optimized Decorative Elements */}
        {settings.enableParticles && (
          <>
            {Array.from({ length: isSmallScreen ? 8 : 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                  x: [0, Math.random() * 20 - 10, 0],
                  y: [0, Math.random() * 20 - 10, 0],
                }}
                transition={{
                  duration: settings.animationDuration * (4 + Math.random() * 4),
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <motion.div
            variants={variants.mobileRoyalEntrance}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <RoyalTypography
              variant="h1"
              animation="crownTitle"
              className="mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
              glowOnHover
            >
              Royal Mobile Experience
            </RoyalTypography>

            <RoyalTypography
              variant="p"
              animation="elegantFade"
              delay={0.3}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Experience the perfect blend of royal elegance and modern mobile optimization. 
              Every interaction is crafted with majestic precision.
            </RoyalTypography>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={variants.mobileStagger}
              initial="hidden"
              animate="visible"
            >
              <InteractiveCtaButton
                variant="royal"
                size="lg"
                onClick={() => {
                  if (isTouch && settings.enableHapticFeedback) {
                    triggerHapticFeedback('heavy');
                  }
                }}
              >
                Experience Royal Magic
              </InteractiveCtaButton>

              <InteractiveCtaButton
                variant="secondary"
                size="lg"
                onClick={() => {
                  if (isTouch && settings.enableHapticFeedback) {
                    triggerHapticFeedback('medium');
                  }
                }}
              >
                Learn More
              </InteractiveCtaButton>
            </motion.div>
          </motion.div>
        </section>

        {/* Demo Features Section */}
        {showDemo && (
          <section className="container mx-auto px-4 py-16">
            <motion.div
              variants={variants.mobileRoyalEntrance}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12"
            >
              <RoyalTypography
                variant="h2"
                animation="goldenGlow"
                className="mb-4"
              >
                Mobile-First Royal Features
              </RoyalTypography>
              <RoyalTypography
                variant="p"
                animation="elegantFade"
                delay={0.2}
                className="text-muted-foreground max-w-2xl mx-auto"
              >
                Discover how royal elegance adapts perfectly to mobile devices with 
                optimized animations and touch interactions.
              </RoyalTypography>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {demoFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={variants.mobileRoyalEntrance}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={index}
                >
                  <LuxuryCard
                    variant="royal"
                    className="h-full p-6 text-center"
                    hoverable
                    glowEffect
                  >
                    <motion.div
                      className="text-4xl mb-4"
                      animate={settings.enableComplexAnimations ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{
                        duration: settings.animationDuration * 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    
                    <RoyalTypography
                      variant="h4"
                      className="mb-3 text-primary"
                      animation="royalReveal"
                      delay={index * 0.1}
                    >
                      {feature.title}
                    </RoyalTypography>
                    
                    <RoyalTypography
                      variant="p"
                      className="text-sm text-muted-foreground leading-relaxed"
                      animation="elegantFade"
                      delay={index * 0.1 + 0.2}
                    >
                      {feature.description}
                    </RoyalTypography>
                  </LuxuryCard>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Device Info Section (for demonstration) */}
        {showDemo && (
          <section className="container mx-auto px-4 py-16">
            <motion.div
              variants={variants.mobileRoyalEntrance}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <LuxuryCard variant="elegant" className="p-8 max-w-2xl mx-auto">
                <RoyalTypography
                  variant="h3"
                  className="mb-6 text-center text-primary"
                  animation="goldenGlow"
                >
                  Your Royal Device Status
                </RoyalTypography>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Device Type:</span>
                      <span className="font-medium">{isMobile ? 'Mobile' : 'Desktop'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Touch Support:</span>
                      <span className="font-medium">{isTouch ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Screen Size:</span>
                      <span className="font-medium">
                        {isSmallScreen ? 'Small' : 'Large'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Particles:</span>
                      <span className="font-medium">
                        {settings.enableParticles ? settings.particleCount : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Animations:</span>
                      <span className="font-medium">
                        {settings.enableComplexAnimations ? 'Full' : 'Reduced'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Haptic:</span>
                      <span className="font-medium">
                        {settings.enableHapticFeedback ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                </div>
              </LuxuryCard>
            </motion.div>
          </section>
        )}

        {/* Custom Content */}
        {children && (
          <section className="container mx-auto px-4 py-16">
            <motion.div
              variants={variants.mobileRoyalEntrance}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {children}
            </motion.div>
          </section>
        )}
      </div>

      {/* Mobile Royal Footer */}
      <MobileRoyalFooter />
    </div>
  );
}
