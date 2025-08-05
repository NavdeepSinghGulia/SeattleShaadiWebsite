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
import { HomePageSchemas } from '@/components/seo/schema-markup';


export default function Home() {

  return (
    <>
      <HomePageSchemas />
      <div className="flex flex-col relative">
        <RoyalBackground />
        <FloatingParticles />
        <div className="relative z-10">
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
