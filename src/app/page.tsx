import React from 'react';
import { HeroSection } from '@/components/home/hero-section';
import { AboutSection } from '@/components/home/about-section';
import { RoyalBackground } from '@/components/royal-background';
import { FloatingParticles } from '@/components/floating-particles';
import { ServicesSection } from '@/components/home/services-section';
import { FeaturedWeddingsSection } from '@/components/home/featured-weddings-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { CtaSection } from '@/components/home/cta-section';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="flex flex-col relative overflow-x-hidden">
      <RoyalBackground />
      <FloatingParticles />
      <div className="relative z-10 overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <FeaturedWeddingsSection />
        <TestimonialsSection />
        <CtaSection />
      </div>
    </div>
  );
}
