'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMobileRoyalAnimations } from '@/hooks/use-mobile-royal-animations';
import { RoyalTypography } from './royal-typography';

interface MobileRoyalFooterProps {
  className?: string;
}

export function MobileRoyalFooter({ className }: MobileRoyalFooterProps) {

  const { isMobile, isTouch, variants, triggerHapticFeedback, settings, isSmallScreen } = useMobileRoyalAnimations();

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'Instagram', icon: '📸', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'YouTube', icon: '📺', href: '#' }
  ];

  const handleSocialClick = (_name: string) => {
    if (isTouch && settings.enableHapticFeedback) {
      triggerHapticFeedback('medium');
    }
  };



  return (
    <footer className={cn(
      "relative bg-gradient-to-t from-background via-background/95 to-background/90 border-t border-primary/20 overflow-hidden",
      className
    )}>
      {/* Mobile-Optimized Royal Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        {/* Mobile-Optimized Decorative Elements */}
        {settings.enableParticles && (
          <>
            {Array.from({ length: isSmallScreen ? 3 : 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + Math.sin(i) * 30}%`,
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.2, 1],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: settings.animationDuration * 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            className="text-center md:text-left"
            variants={variants.mobileRoyalEntrance}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h3 
              className="text-2xl font-headline font-bold text-primary mb-4 flex items-center justify-center md:justify-start gap-2"
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={isMobile ? { scale: 0.98 } : {}}
            >
              Royal Experience
            </motion.h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Crafting majestic digital experiences with royal elegance and modern innovation.
            </p>
            
            {/* Social Links - Mobile Optimized */}
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className={cn(
                    "w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xl",
                    "hover:bg-primary/20 hover:border-primary/40 transition-all duration-300",
                    isTouch && "active:scale-95"
                  )}
                  variants={variants.mobileRoyalEntrance}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  whileHover={!isMobile ? { 
                    scale: 1.1,
                    boxShadow: `0 4px 15px rgba(184, 134, 11, ${settings.glowIntensity * 0.3})`
                  } : {}}
                  whileTap={isMobile ? { scale: 0.9 } : {}}
                  onTap={() => handleSocialClick(social.name)}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="text-center md:text-left"
            variants={variants.mobileRoyalEntrance}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-headline font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['About', 'Services', 'Portfolio', 'Contact'].map((link, _index) => (
                <motion.li key={link}>
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 inline-block"
                    whileHover={!isMobile ? { x: 5, color: 'hsl(var(--primary))' } : {}}
                    whileTap={isMobile ? { scale: 0.95 } : {}}
                    onTap={() => {
                      if (isTouch && settings.enableHapticFeedback) {
                        triggerHapticFeedback('light');
                      }
                    }}
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>


        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-8 pt-6 border-t border-primary/20 text-center"
          variants={variants.mobileRoyalEntrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 Royal Experience. All rights reserved.
            </p>
            
            <div className="flex gap-6 text-sm">
              {['Privacy', 'Terms', 'Cookies'].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  whileHover={!isMobile ? { y: -2 } : {}}
                  whileTap={isMobile ? { scale: 0.95 } : {}}
                  onTap={() => {
                    if (isTouch && settings.enableHapticFeedback) {
                      triggerHapticFeedback('light');
                    }
                  }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Royal Signature */}
          <motion.div
            className="mt-4 flex items-center justify-center gap-2 text-primary/60"
            animate={settings.enableComplexAnimations ? {
              opacity: [0.6, 1, 0.6],
            } : {}}
            transition={{
              duration: settings.animationDuration * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <RoyalTypography variant='span' className="text-xs">Crafted with royal precision</RoyalTypography>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
