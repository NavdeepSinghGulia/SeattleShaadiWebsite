'use client';
import React from 'react';
import { HeroSection } from '@/components/home/hero-section';
import { AboutSection } from '@/components/home/about-section';
import { ServicesSection } from '@/components/home/services-section';
import { FeaturedWeddingsSection } from '@/components/home/featured-weddings-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { CtaSection } from '@/components/home/cta-section';
import { RoyalBackground } from '@/components/royal-background';
import { FloatingParticles } from '@/components/floating-particles';
// import { WebVitals, AnalyticsErrorBoundary } from '@/components/web-vitals';
import { MandalaPattern, PaisleyPattern, LotusFlower, TraditionalBorder, DecorativeCorner } from '@/components/cultural-elements';
// import { RoyalLoading } from '@/components/royal-loading';

// Regular imports for now to avoid build issues

export default function Home() {
  return (
    <div className="flex flex-col relative bg-royal-texture min-h-screen">
      {/* Cultural Background Elements */}
      <MandalaPattern className="top-20 right-10 animate-mandala-spin" />
      <PaisleyPattern className="top-1/3 left-10 animate-paisley-sway" />
      <LotusFlower className="bottom-1/3 right-20 animate-lotus-bloom" />
      <DecorativeCorner position="top-left" />
      <DecorativeCorner position="bottom-right" />
      
      {/* Royal Background Effects */}
      <RoyalBackground />
      <FloatingParticles />
      
      {/* Traditional Border */}
      <TraditionalBorder className="absolute top-0 left-0 right-0 z-10" />
      
      <div className="relative z-10">
        {/* Hero Section - Always loaded immediately */}
        <HeroSection />
        
        {/* Regular sections without lazy loading for now */}
        <AboutSection />
        <ServicesSection />
        <FeaturedWeddingsSection />
        <TestimonialsSection />
        <CtaSection />
      </div>
      
      {/* Bottom Traditional Border */}
      <TraditionalBorder className="absolute bottom-0 left-0 right-0 z-10" />
    </div>
  );
}
