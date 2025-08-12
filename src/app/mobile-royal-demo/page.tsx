'use client';

import { MobileRoyalPage } from '@/components/mobile-royal-page';
import { InteractiveCtaButton } from '@/components/interactive-cta-button';
import { LuxuryCard } from '@/components/luxury-card';
import { RoyalTypography } from '@/components/royal-typography';
import { motion } from 'framer-motion';
import { useMobileRoyalAnimations } from '@/hooks/use-mobile-royal-animations';

export default function MobileRoyalDemo() {
  const { triggerHapticFeedback, settings, isMobile: _isMobile } = useMobileRoyalAnimations();

  const interactionExamples = [
    {
      title: "Haptic Buttons",
      description: "Feel the royal touch with haptic feedback on every interaction.",
      component: (
        <div className="space-y-3">
          <InteractiveCtaButton
            variant="royal"
            size="sm"
            onClick={() => triggerHapticFeedback('light')}
          >
            Light Touch
          </InteractiveCtaButton>
          <InteractiveCtaButton
            variant="primary"
            size="sm"
            onClick={() => triggerHapticFeedback('medium')}
          >
            Medium Press
          </InteractiveCtaButton>
          <InteractiveCtaButton
            variant="secondary"
            size="sm"
            onClick={() => triggerHapticFeedback('heavy')}
          >
            Heavy Impact
          </InteractiveCtaButton>
        </div>
      )
    },
    {
      title: "Royal Typography",
      description: "Experience majestic text animations optimized for mobile.",
      component: (
        <div className="space-y-4">
          <RoyalTypography
            variant="h4"
            animation="goldenGlow"
            className="text-primary"
          >
            Golden Glow
          </RoyalTypography>
          <RoyalTypography
            variant="p"
            animation="royalReveal"
            className="text-sm"
          >
            Royal Reveal Animation
          </RoyalTypography>
          <RoyalTypography
            variant="span"
            animation="crownTitle"
            className="text-accent"
          >
            Crown Title Effect
          </RoyalTypography>
        </div>
      )
    },
    {
      title: "Luxury Cards",
      description: "Touch-optimized cards with royal elegance and smooth animations.",
      component: (
        <div className="space-y-3">
          <LuxuryCard variant="royal" className="p-4" hoverable>
            <div className="text-center">
              <div className="text-2xl mb-2">👑</div>
              <div className="text-sm font-medium">Royal Card</div>
            </div>
          </LuxuryCard>
          <LuxuryCard variant="elegant" className="p-4" hoverable glowEffect>
            <div className="text-center">
              <div className="text-2xl mb-2">✨</div>
              <div className="text-sm font-medium">Elegant Card</div>
            </div>
          </LuxuryCard>
        </div>
      )
    }
  ];

  return (
    <MobileRoyalPage showDemo={false}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <RoyalTypography
            variant="h2"
            animation="crownTitle"
            className="mb-4"
          >
            Interactive Royal Demo
          </RoyalTypography>
          <RoyalTypography
            variant="p"
            animation="elegantFade"
            delay={0.3}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Explore the interactive elements below to experience the full range of 
            mobile-optimized royal animations and haptic feedback.
          </RoyalTypography>
        </div>

        {/* Performance Status */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <LuxuryCard variant="royal" className="p-6">
            <div className="text-center mb-4">
              <RoyalTypography variant="h3" className="text-primary mb-2">
                Current Performance Settings
              </RoyalTypography>
              <div className="text-sm text-muted-foreground">
                Automatically optimized for your device
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-lg font-bold text-primary">
                  {settings.particleCount}
                </div>
                <div className="text-xs text-muted-foreground">Particles</div>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-lg font-bold text-accent">
                  {Math.round(settings.animationDuration * 1000)}ms
                </div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-lg font-bold text-primary">
                  {Math.round(settings.glowIntensity * 100)}%
                </div>
                <div className="text-xs text-muted-foreground">Glow</div>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-lg font-bold text-accent">
                  {settings.enableHapticFeedback ? '✓' : '✗'}
                </div>
                <div className="text-xs text-muted-foreground">Haptic</div>
              </div>
            </div>
          </LuxuryCard>
        </motion.div>

        {/* Interactive Examples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {interactionExamples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.2 }}
            >
              <LuxuryCard variant="elegant" className="p-6 h-full">
                <RoyalTypography
                  variant="h4"
                  className="mb-3 text-primary"
                  animation="royalReveal"
                >
                  {example.title}
                </RoyalTypography>
                
                <RoyalTypography
                  variant="p"
                  className="text-sm text-muted-foreground mb-6 leading-relaxed"
                  animation="elegantFade"
                  delay={0.2}
                >
                  {example.description}
                </RoyalTypography>
                
                <div className="mt-auto">
                  {example.component}
                </div>
              </LuxuryCard>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <RoyalTypography
            variant="h3"
            animation="goldenGlow"
            className="mb-6"
          >
            Ready for Royal Treatment?
          </RoyalTypography>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <InteractiveCtaButton
              variant="royal"
              size="lg"
              onClick={() => {
                if (settings.enableHapticFeedback) {
                  triggerHapticFeedback('heavy');
                }
                // Navigate to main site or contact
                if (typeof window !== 'undefined') {
                  window.location.href = '/';
                }
              }}
            >
              Experience Full Site
            </InteractiveCtaButton>
            
            <InteractiveCtaButton
              variant="secondary"
              size="lg"
              onClick={() => {
                if (settings.enableHapticFeedback) {
                  triggerHapticFeedback('medium');
                }
                // Scroll to top for another demo
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              Try Again
            </InteractiveCtaButton>
          </div>
        </motion.div>
      </div>
    </MobileRoyalPage>
  );
}
