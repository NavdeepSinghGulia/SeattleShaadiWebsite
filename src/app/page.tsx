'use client';

import React from 'react';
// Home page with improved SEO semantics and performance-aware visuals

import { HeroSection } from '@/components/home/hero-section';
import { AboutSection } from '@/components/home/about-section';
import { RoyalBackground } from '@/components/royal-background';
import { FloatingParticles } from '@/components/floating-particles';
import { ServicesSection } from '@/components/home/services-section';
import { FeaturedWeddingsSection } from '@/components/home/featured-weddings-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { Seo } from '@/components/seo';
import { useAnimation } from '@/hooks/use-animation-preferences';

import { CtaSection } from '@/components/home/cta-section';

export const dynamic = 'force-dynamic';

export default function Home() {
  const { shouldAnimate } = useAnimation();
  return (
    <>
      <Seo title="Best Indian Wedding Planner in Seattle" description="Seattle's premier Indian wedding planners for Hindu, Sikh, Punjabi, South Indian weddings. Authentic traditions with luxurious aesthetics." />
      <div className="flex flex-col relative overflow-x-hidden">
        {shouldAnimate && <RoyalBackground />}
        {shouldAnimate && <FloatingParticles />}
        <div className="relative z-10 overflow-x-hidden">
          <h1 className="sr-only">Seattle Shaadi - Premier Indian Wedding Planner in Seattle</h1>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <FeaturedWeddingsSection />
          <TestimonialsSection />
          <CtaSection />
        </div>
      </div>
    </>
  );
}
