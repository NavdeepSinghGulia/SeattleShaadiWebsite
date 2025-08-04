'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useMobileRoyalAnimations } from '@/hooks/use-mobile-royal-animations';

interface MobileRoyalFooterProps {
  className?: string;
}

export function MobileRoyalFooter({ className }: MobileRoyalFooterProps) {
  const [emailFocused, setEmailFocused] = useState(false);
  const { isMobile, isTouch, variants, triggerHapticFeedback, settings, isSmallScreen } = useMobileRoyalAnimations();

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'Instagram', icon: '📸', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'YouTube', icon: '📺', href: '#' }
  ];

  const handleSocialClick = (name: string) => {
    if (isTouch && settings.enableHapticFeedback) {
      triggerHapticFeedback('medium');
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTouch && settings.enableHapticFeedback) {
      triggerHapticFeedback('heavy');
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

        {/* Royal Crown Pattern */}
        <motion.div
          className="absolute top-4 right-4 text-primary/20 text-2xl"
          animate={settings.enableComplexAnimations ? {
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            duration: settings.animationDuration * 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          👑
        </motion.div>
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
              <span className="text-3xl">👑</span>
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
              {['About', 'Services', 'Portfolio', 'Contact'].map((link, index) => (
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

          {/* Newsletter Section - Mobile Optimized */}
          <motion.div
            className="text-center md:text-left"
            variants={variants.mobileRoyalEntrance}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-lg font-headline font-semibold text-foreground mb-4">
              Royal Newsletter
            </h4>
            <p className="text-muted-foreground mb-4 text-sm">
              Subscribe for exclusive updates and royal insights.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <motion.div
                className="relative"
                animate={emailFocused ? {
                  boxShadow: `0 0 0 2px rgba(184, 134, 11, ${settings.glowIntensity * 0.3})`
                } : {}}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="email"
                  placeholder="Your royal email..."
                  className={cn(
                    "w-full px-4 py-3 rounded-lg bg-background/50 border border-primary/20",
                    "focus:outline-none focus:border-primary/40 transition-all duration-300",
                    "text-sm placeholder:text-muted-foreground/60",
                    isSmallScreen && "text-base" // Prevent zoom on iOS
                  )}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
                
                {/* Golden glow effect */}
                {emailFocused && settings.enableComplexAnimations && (
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 -z-10 blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.05 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
              
              <motion.button
                type="submit"
                className={cn(
                  "w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground",
                  "rounded-lg font-medium transition-all duration-300",
                  "hover:shadow-lg hover:shadow-primary/25",
                  isTouch && "active:scale-98"
                )}
                whileHover={!isMobile ? { 
                  scale: 1.02,
                  boxShadow: `0 4px 20px rgba(184, 134, 11, ${settings.glowIntensity * 0.4})`
                } : {}}
                whileTap={isMobile ? { scale: 0.98 } : {}}
              >
                <span className="flex items-center justify-center gap-2">
                  Subscribe
                  <motion.span
                    animate={settings.enableComplexAnimations ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ✨
                  </motion.span>
                </span>
              </motion.button>
            </form>
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
            <span className="text-xs">Crafted with</span>
            <motion.span
              className="text-sm"
              animate={settings.enableComplexAnimations ? {
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              } : {}}
              transition={{
                duration: settings.animationDuration * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              👑
            </motion.span>
            <span className="text-xs">royal precision</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}

