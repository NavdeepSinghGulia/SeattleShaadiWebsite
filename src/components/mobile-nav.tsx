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
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Traditions', href: '/traditions' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Calculator', href: '/wedding-calculator' },
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

  return (
    <>
      {/* Mobile Nav Bar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col items-center justify-center p-2 rounded-full bg-amber-50 text-amber-800"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span className="text-xs">Menu</span>
            <div className="flex flex-col items-center justify-center mt-1">
              <span className={`block w-5 h-0.5 bg-amber-800 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-amber-800 mt-1 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-5 h-0.5 bg-amber-800 mt-1 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
          
          {/* Bottom Navigation Icons */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex flex-col items-center">
              <span className="text-amber-800 text-xl">🏠</span>
              <span className="text-xs text-amber-800">Home</span>
            </Link>
            
            <Link href="/gallery" className="flex flex-col items-center">
              <span className="text-amber-800 text-xl">🖼️</span>
              <span className="text-xs text-amber-800">Gallery</span>
            </Link>
            
            <Link href="/contact" className="flex flex-col items-center">
              <span className="text-amber-800 text-xl">📞</span>
              <span className="text-xs text-amber-800">Contact</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: preferences.reducedMotion ? 0.1 : 0.3 }}
            className="fixed inset-0 z-40 bg-white"
          >
            <div className="flex flex-col h-full pt-4 pb-20 overflow-y-auto">
              <div className="px-4 mb-4">
                <h2 className="text-2xl font-playfair text-amber-800 font-bold">Menu</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 rounded mt-1"></div>
              </div>
              
              <nav className="px-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link 
                        href={item.href}
                        className={`block py-3 px-4 rounded-lg transition-all duration-200 ${
                          pathname === item.href 
                            ? 'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 font-medium border-l-4 border-amber-600' 
                            : 'hover:bg-amber-50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              {/* Quick Actions */}
              <div className="mt-auto px-4 py-4 border-t border-amber-100">
                <h3 className="text-sm font-medium text-amber-800 mb-2">Quick Actions</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Link 
                    href="/wedding-calculator" 
                    className="flex flex-col items-center justify-center p-3 bg-amber-50 rounded-lg"
                  >
                    <span className="text-xl mb-1">💰</span>
                    <span className="text-xs text-center">Budget Calculator</span>
                  </Link>
                  
                  <Link 
                    href="/traditions" 
                    className="flex flex-col items-center justify-center p-3 bg-amber-50 rounded-lg"
                  >
                    <span className="text-xl mb-1">🪔</span>
                    <span className="text-xs text-center">Traditions</span>
                  </Link>
                  
                  <Link 
                    href="/blog" 
                    className="flex flex-col items-center justify-center p-3 bg-amber-50 rounded-lg"
                  >
                    <span className="text-xl mb-1">📝</span>
                    <span className="text-xs text-center">Blog</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

