'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { AnimatedDiv } from './animated-div';
import { RoyalTypography } from './royal-typography';

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-secondary/60 via-secondary/40 to-background/60 backdrop-blur-sm border-t border-primary/20 overflow-hidden">


      <div className="container mx-auto px-4 py-8 sm:py-12 md:px-6 relative z-10">
        <AnimatedDiv animation="royalEntrance" delay={200}>
          <div className="grid grid-cols-1 gap-8 sm:gap-12 text-center md:text-left md:grid-cols-2 lg:grid-cols-4">
            
            {/* Brand Section with Enhanced Logo */}
            <motion.div 
              className="md:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-4 flex justify-center md:justify-start">
                <div className="relative group">
                  <Image
                    src="/images/branding/logos/shaadi-squad-main-logo.webp"
                    alt="Seattle Shaadi Logo"
                    width={120}
                    height={40}
                    className="h-10 w-auto transition-all duration-300 ease-out group-hover:scale-105 filter drop-shadow-sm"
                  />
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out blur-xl -z-10" />
                </div>
              </div>
              
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
                  { icon: Facebook, label: "Facebook", color: "hover:text-blue-500", href: "https://www.facebook.com/seattleshaadi" },
                  { icon: Instagram, label: "Instagram", color: "hover:text-pink-500", href: "https://www.instagram.com/seattleshaadi" },
                  { icon: Twitter, label: "Twitter", color: "hover:text-blue-400", href: "https://x.com/SeattleShaadi" },
                  { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-600", href: "https://www.linkedin.com/company/seattle-shaadi" }
                ].map(({ icon: Icon, label, color, href }) => (
                  <motion.div key={label} whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-muted-foreground ${color} transition-all duration-300 hover:scale-125 p-2 block rounded-full hover:bg-primary/10`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Link>
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
                  { href: "/faq", text: "FAQs" },
                  { href: "/careers", text: "Careers" }
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

            {/* Blog & Resources */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <RoyalTypography
                variant="h4"
                animation="goldenGlow"
                className="font-semibold text-foreground mb-3 sm:mb-4 text-base sm:text-lg"
                glowOnHover={true}
              >
                Blog & Resources
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
                  { href: "/blog", text: "Wedding Blog" },
                  { href: "/blog/indian-wedding-traditions-seattle", text: "Indian Traditions" },
                  { href: "/blog/seattle-wedding-planning-guide", text: "Planning Guide" },
                  { href: "/blog/top-5-seattle-wedding-venues", text: "Top Venues" }
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
