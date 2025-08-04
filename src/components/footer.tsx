
'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { AnimatedDiv } from './animated-div';
import { RoyalTypography } from './royal-typography';
import { InteractiveCtaButton } from './interactive-cta-button';
import { LuxuryCard } from './luxury-card';

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-secondary/60 via-secondary/40 to-background/60 backdrop-blur-sm border-t border-primary/20 overflow-hidden">
      {/* Royal Background Effects for Mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Mobile-optimized floating particles */}
        <motion.div
          className="absolute top-4 right-4 text-primary/20 text-2xl sm:text-3xl"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          👑
        </motion.div>
        
        <motion.div
          className="absolute bottom-4 left-4 text-accent/20 text-xl sm:text-2xl"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          💎
        </motion.div>

        {/* Mobile-friendly constellation - using fixed positions to avoid hydration issues */}
        {[
          { left: 10, top: 20, delay: 0.5 },
          { left: 25, top: 15, delay: 1.2 },
          { left: 40, top: 30, delay: 0.8 },
          { left: 60, top: 10, delay: 1.8 },
          { left: 75, top: 25, delay: 0.3 },
          { left: 85, top: 40, delay: 1.5 },
          { left: 15, top: 60, delay: 2.1 },
          { left: 35, top: 70, delay: 0.9 },
          { left: 55, top: 80, delay: 1.6 },
          { left: 80, top: 65, delay: 0.6 },
          { left: 90, top: 85, delay: 2.3 },
          { left: 20, top: 90, delay: 1.1 },
          { left: 45, top: 95, delay: 1.9 },
          { left: 70, top: 88, delay: 0.4 },
          { left: 95, top: 75, delay: 1.4 }
        ].map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-primary/30 rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12 md:px-6 relative z-10">
        <AnimatedDiv animation="royalEntrance" delay={200}>
          <div className="grid grid-cols-1 gap-8 sm:gap-12 text-center md:text-left md:grid-cols-2 lg:grid-cols-4">
            
            {/* Brand Section */}
            <motion.div 
              className="md:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <RoyalTypography
                variant="h3"
                animation="crownTitle"
                className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 text-2xl sm:text-3xl"
              >
                Seattle Shaadi
              </RoyalTypography>
              
              <motion.p 
                className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Crafting timeless weddings with a touch of modern elegance. Your story, our canvas.
              </motion.p>
              
              {/* Enhanced Social Links */}
              <motion.div 
                className="flex space-x-3 sm:space-x-4 mt-4 sm:mt-6 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, staggerChildren: 0.1 }}
              >
                {[
                  { icon: Facebook, label: "Facebook", color: "hover:text-blue-500" },
                  { icon: Instagram, label: "Instagram", color: "hover:text-pink-500" },
                  { icon: Twitter, label: "Twitter", color: "hover:text-blue-400" },
                  { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-600" }
                ].map(({ icon: Icon, label, color }) => (
                  <motion.div key={label}>
                    <motion.a
                      href="#"
                      aria-label={label}
                      className={`text-muted-foreground ${color} transition-all duration-300 hover:scale-125 p-2 rounded-full hover:bg-primary/10`}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href="#" passHref legacyBehavior>
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </Link>
                    </motion.a>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <RoyalTypography
                variant="h4"
                animation="goldenGlow"
                className="font-semibold text-foreground mb-3 sm:mb-4 text-base sm:text-lg"
                glowOnHover={true}
              >
                Quick Links
              </RoyalTypography>
              <motion.ul 
                className="space-y-2 text-muted-foreground text-sm sm:text-base"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {[
                  { href: "/about", text: "About Us" },
                  { href: "/services", text: "Services" },
                  { href: "/work", text: "Our Work" },
                  { href: "/faq", text: "FAQs" }
                ].map((link) => (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <Link 
                      href={link.href} 
                      className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block relative group"
                    >
                      {link.text}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-primary"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <RoyalTypography
                variant="h4"
                animation="goldenGlow"
                className="font-semibold text-foreground mb-3 sm:mb-4 text-base sm:text-lg"
                glowOnHover={true}
              >
                Contact
              </RoyalTypography>
              <motion.ul 
                className="space-y-2 text-muted-foreground text-sm sm:text-base"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {["Seattle, WA", "+1 (206) 821-6764", "hello@seattleshaadi.com"].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>


          </div>

          {/* Enhanced Footer Bottom */}
          <motion.div 
            className="mt-8 sm:mt-12 border-t border-primary/20 pt-6 sm:pt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <div className="relative">
              {/* Royal decoration */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 -top-4 text-primary/40 text-lg sm:text-xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                👑
              </motion.div>
              
              <RoyalTypography
                variant="p"
                className="text-muted-foreground text-xs sm:text-sm mb-2"
                animation="elegantFade"
                delay={1.7}
              >
                &copy; {new Date().getFullYear()} Seattle Shaadi. All Rights Reserved.
              </RoyalTypography>
              
              <RoyalTypography
                variant="p"
                className="text-muted-foreground text-xs sm:text-sm"
                animation="elegantFade"
                delay={1.9}
              >
                Crafted with <motion.span 
                  className="text-red-500 inline-block"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >❤️</motion.span> for everlasting bonds.
              </RoyalTypography>
            </div>
          </motion.div>
        </AnimatedDiv>
      </div>
    </footer>
  );
}
