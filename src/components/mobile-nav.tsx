'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { useAnimationPreferences } from '@/hooks/use-animation-preferences';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  emoji?: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', emoji: '🏠' },
  { label: 'Services', href: '/services', emoji: '💍' },
  { label: 'Gallery', href: '/gallery', emoji: '🖼️' },
  { label: 'Traditions', href: '/traditions', emoji: '🪔' },
  { label: 'Blog', href: '/blog', emoji: '📝' },
  { label: 'About', href: '/about', emoji: '👋' },
  { label: 'Contact', href: '/contact', emoji: '📞' },
  { label: 'Calculator', href: '/wedding-calculator', emoji: '💰' },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isMobile, isTablet } = useMobileDetection();
  const { preferences } = useAnimationPreferences();
  const [scrolled, setScrolled] = useState(false);

  // Only show mobile nav on mobile and tablet devices
  const shouldShow = isMobile || isTablet;

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render anything on desktop
  if (!shouldShow) return null;

  // Animation variants
  const menuVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      transition: { 
        duration: preferences.reducedMotion ? 0.1 : 0.3,
        ease: "easeInOut" 
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: preferences.reducedMotion ? 0.1 : 0.3,
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      y: 100,
      transition: { 
        duration: preferences.reducedMotion ? 0.1 : 0.2,
        ease: "easeIn" 
      }
    }
  };

  // Staggered item animation
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: preferences.reducedMotion ? 0 : i * 0.05,
        duration: preferences.reducedMotion ? 0.1 : 0.3,
      }
    })
  };

  return (
    <>
      {/* Mobile Nav Bar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 mobile-bottom-nav ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col items-center justify-center p-2 rounded-full bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 touch-feedback"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span className="text-xs font-medium">Menu</span>
            <div className="flex flex-col items-center justify-center mt-1">
              <span className={`block w-5 h-0.5 bg-amber-800 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-amber-800 mt-1 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-5 h-0.5 bg-amber-800 mt-1 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
          
          {/* Bottom Navigation Icons */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex flex-col items-center touch-feedback">
              <span className="text-amber-800 text-xl">🏠</span>
              <span className="text-xs text-amber-800 font-medium">Home</span>
            </Link>
            
            <Link href="/gallery" className="flex flex-col items-center touch-feedback">
              <span className="text-amber-800 text-xl">🖼️</span>
              <span className="text-xs text-amber-800 font-medium">Gallery</span>
            </Link>
            
            <Link href="/contact" className="flex flex-col items-center touch-feedback">
              <span className="text-amber-800 text-xl">📞</span>
              <span className="text-xs text-amber-800 font-medium">Contact</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-gradient-to-b from-amber-50 to-white"
          >
            <div className="flex flex-col h-full pt-4 pb-20 overflow-y-auto">
              <div className="px-4 mb-4">
                <h2 className="text-2xl font-playfair text-amber-800 font-bold royal-accent">Menu</h2>
              </div>
              
              <nav className="px-4">
                <ul className="space-y-2">
                  {navItems.map((item, i) => (
                    <motion.li 
                      key={item.href}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                    >
                      <Link 
                        href={item.href}
                        className={`flex items-center py-3 px-4 rounded-lg transition-all duration-200 touch-feedback ${
                          pathname === item.href 
                            ? 'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 font-medium border-l-4 border-amber-600' 
                            : 'hover:bg-amber-50'
                        }`}
                      >
                        <span className="mr-3 text-xl">{item.emoji}</span>
                        <span>{item.label}</span>
                        
                        {pathname === item.href && (
                          <span className="ml-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              {/* Quick Actions */}
              <div className="mt-auto px-4 py-4 border-t border-amber-100">
                <h3 className="text-sm font-medium text-amber-800 mb-2">Quick Actions</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Link 
                    href="/wedding-calculator" 
                    className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg touch-feedback royal-border"
                  >
                    <span className="text-xl mb-1">💰</span>
                    <span className="text-xs text-center font-medium">Budget Calculator</span>
                  </Link>
                  
                  <Link 
                    href="/traditions" 
                    className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg touch-feedback royal-border"
                  >
                    <span className="text-xl mb-1">🪔</span>
                    <span className="text-xs text-center font-medium">Traditions</span>
                  </Link>
                  
                  <Link 
                    href="/blog" 
                    className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg touch-feedback royal-border"
                  >
                    <span className="text-xl mb-1">📝</span>
                    <span className="text-xs text-center font-medium">Blog</span>
                  </Link>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="px-4 py-3 flex justify-center space-x-4 border-t border-amber-100">
                <a href="https://instagram.com/seattleshaadi" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 touch-feedback" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://facebook.com/seattleshaadi" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 touch-feedback" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="https://pinterest.com/seattleshaadi" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 touch-feedback" aria-label="Pinterest">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                    <path d="M21 12c0 4.418 -4.03 8 -9 8a9.863 9.863 0 0 1 -4.255 -.949l-3.745 1.949l1.08 -3.098a7.902 7.902 0 0 1 -1.08 -3.902c0 -4.418 4.03 -8 9 -8s9 3.582 9 8z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

