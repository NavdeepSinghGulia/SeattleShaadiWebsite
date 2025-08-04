'use client';
import React, { Suspense } from 'react';
import { HeroSection } from '@/components/home/hero-section';
import { AboutSection } from '@/components/home/about-section';
import { ServicesSection } from '@/components/home/services-section';
import { FeaturedWeddingsSection } from '@/components/home/featured-weddings-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { CtaSection } from '@/components/home/cta-section';
import { RoyalBackground } from '@/components/royal-background';
import { FloatingParticles } from '@/components/floating-particles';
import { WebVitals, AnalyticsErrorBoundary } from '@/components/web-vitals';
import { MandalaPattern, PaisleyPattern, LotusFlower, TraditionalBorder, DecorativeCorner } from '@/components/cultural-elements';
import { RoyalLoading } from '@/components/royal-loading';

// Lazy load sections for better performance
const LazyAboutSection = React.lazy(() => import('@/components/home/about-section').then(module => ({ default: module.AboutSection })));
const LazyServicesSection = React.lazy(() => import('@/components/home/services-section').then(module => ({ default: module.ServicesSection })));
const LazyFeaturedWeddingsSection = React.lazy(() => import('@/components/home/featured-weddings-section').then(module => ({ default: module.FeaturedWeddingsSection })));
const LazyTestimonialsSection = React.lazy(() => import('@/components/home/testimonials-section').then(module => ({ default: module.TestimonialsSection })));
const LazyCtaSection = React.lazy(() => import('@/components/home/cta-section').then(module => ({ default: module.CtaSection })));

export default function Home() {
  return (
    <AnalyticsErrorBoundary>
      <WebVitals />
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
          
          {/* Lazy loaded sections with loading fallbacks */}
          <Suspense fallback={<RoyalLoading />}>
            <LazyAboutSection />
          </Suspense>
          
          <Suspense fallback={<RoyalLoading />}>
            <LazyServicesSection />
          </Suspense>
          
          <Suspense fallback={<RoyalLoading />}>
            <LazyFeaturedWeddingsSection />
          </Suspense>
          
          <Suspense fallback={<RoyalLoading />}>
            <LazyTestimonialsSection />
          </Suspense>
          
          <Suspense fallback={<RoyalLoading />}>
            <LazyCtaSection />
          </Suspense>
        </div>
        
        {/* Bottom Traditional Border */}
        <TraditionalBorder className="absolute bottom-0 left-0 right-0 z-10" />
      </div>
    </AnalyticsErrorBoundary>
  );
}
