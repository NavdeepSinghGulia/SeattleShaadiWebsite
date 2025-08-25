'use client';

import Image from 'next/image';
import { AnimatedDiv } from '@/components/animated-div';
import { RoyalBackground } from '@/components/royal-background';
import { FloatingParticles } from '@/components/floating-particles';
import { ShimmerEffect } from '@/components/shimmer-effect';
import { generateMetadata } from "@/lib/seo-config";
import type { Metadata } from 'next';

const weddings = [
  { src: "/images/portraits/bride-groom-wedding-portrait.jpg", caption: 'Regal Palace Nuptials' },
  { src: "/images/portraits/bride-groom-dance-celebration.jpg", caption: 'Lakeside Serenity' },
  { src: "/images/portraits/groom-bride-sagai-engagement.jpg", caption: 'Cross-Cultural Celebration' },
  { src: "/images/portraits/bride-groom-wedding-decor.jpg", caption: 'Secret Garden Vows' },
  { src: "/images/portraits/sarita-souvik-wedding-portrait.jpg", caption: 'Portrait of Love' },
  { src: "/images/venues/traditional-phere-ceremony-hall.jpg", caption: 'Sunset Beach Ceremony' },
  { src: "/images/venues/wedding-floral-decoration-setup.jpg", caption: 'Opulent Floral Fantasy' },
  { src: "/images/venues/elegant-wedding-hall-lighting.webp", caption: 'Grand Ballroom Gala' },
  { src: "/images/portraits/kaajol-pruthul-wedding-portrait.jpg", caption: 'Radiant Smiles' },
  { src: "/images/ceremonies/haldi/seattle-haldi-ceremony-celebration.webp", caption: 'Vibrant Haldi Rituals' },
  { src: "/images/ceremonies/mehndi/intricate-mehndi-henna-designs.jpg", caption: 'Intricate Mehndi Art' },
  { src: "/images/ceremonies/baraat/traditional-baraat-procession-celebration.jpg", caption: 'Joyful Baraat Procession' },
  { src: "/images/portraits/bride-groom-ceremony-handshake.jpg", caption: 'A Vow of Togetherness' },
  { src: "/images/venues/seattle-resort-wedding-hall.jpg", caption: 'Destination Dream' },
  { src: "/images/venues/seattle-wedding-garden-lawns.jpg", caption: 'Garden Paradise' },
  { src: "/images/ceremonies/vidaai/seattle-bride-vidaai-ceremony.jpg", caption: 'An Emotional Farewell' },
  { src: "/images/ceremonies/sikh-wedding-gurdwara.jpg", caption: 'A Sacred Union' },
  { src: "/images/ceremonies/south-indian-wedding-rituals.jpg", caption: 'Timeless Traditions' }
];

export default function WorkPage() {
  return (
    <>
      <div className="relative min-h-screen">
        <RoyalBackground />
        <FloatingParticles />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center">
            <AnimatedDiv animation="royalEntrance">
              <ShimmerEffect>
                <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 bg-clip-text text-transparent leading-normal drop-shadow-sm pb-2">
                  Our Gallery of Dreams
                </h1>
              </ShimmerEffect>
            </AnimatedDiv>
            <AnimatedDiv delay={300} animation="fadeInScale">
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Explore a curated selection of our favorite moments and designs from weddings we've had the honor to plan.
              </p>
            </AnimatedDiv>
          </div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 mt-16 space-y-4">
            {weddings.map((wedding, index) => (
              <AnimatedDiv key={index} delay={index * 100} className="break-inside-avoid">
                <div className="group relative overflow-hidden rounded-lg shadow-2xl border border-amber-200/20">
                    <Image
                      src={wedding.src}
                      alt={wedding.caption}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      style={{objectFit: 'cover'}}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <h3 className="text-white font-headline text-xl">{wedding.caption}</h3>
                    </div>
                </div>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
