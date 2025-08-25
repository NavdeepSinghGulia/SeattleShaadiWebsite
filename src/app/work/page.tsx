'use client';

import ImageWithFallback from '@/components/image-with-fallback';
import { AnimatedDiv } from '@/components/animated-div';
import { RoyalBackground } from '@/components/royal-background';
import { FloatingParticles } from '@/components/floating-particles';
import { ShimmerEffect } from '@/components/shimmer-effect';
import type { Metadata } from 'next';

const weddings = [
  { src: "/images/portraits/bride-groom-wedding-portrait.jpg", caption: 'Regal Palace Nuptials', key: 'work-1' },
  { src: "/images/portraits/bride-groom-dance-celebration.jpg", caption: 'Lakeside Serenity', key: 'work-2' },
  { src: "/images/portraits/kaajol-pruthul-wedding-portrait.jpg", caption: 'A Sacred Union', key: 'work-3' },
  { src: "/images/portraits/bride-groom-wedding-decor.jpg", caption: 'Secret Garden Vows', key: 'work-4' },
  { src: "/images/portraits/sarita-souvik-wedding-portrait.jpg", caption: 'Portrait of Love', key: 'work-5' },
  { src: "/images/venues/traditional-phere-ceremony-hall.jpg", caption: 'Timeless Traditions', key: 'work-6' },
  { src: "/images/venues/wedding-floral-decoration-setup.jpg", caption: 'Opulent Floral Fantasy', key: 'work-7' },
  { src: "/images/venues/elegant-wedding-hall-lighting.webp", caption: 'Grand Ballroom Gala', key: 'work-8' },
  { src: "/images/portraits/kaajol-pruthul-wedding-portrait.jpg", caption: 'Radiant Smiles', key: 'work-9' },
  { src: "/images/ceremonies/haldi/seattle-haldi-ceremony-celebration.webp", caption: 'Vibrant Haldi Rituals', key: 'work-10' },
  { src: "/images/ceremonies/mehndi/intricate-mehndi-henna-designs.jpg", caption: 'Intricate Mehndi Art', key: 'work-11' },
  { src: "/images/ceremonies/baraat/traditional-baraat-procession-celebration.jpg", caption: 'Joyful Baraat Procession', key: 'work-12' },
  { src: "/images/portraits/bride-groom-ceremony-handshake.jpg", caption: 'A Vow of Togetherness', key: 'work-13' },
  { src: "/images/venues/seattle-resort-wedding-hall.jpg", caption: 'Destination Dream', key: 'work-14' },
  { src: "/images/venues/seattle-wedding-garden-lawns.jpg", caption: 'Garden Paradise', key: 'work-15' },
  { src: "/images/ceremonies/vidaai/seattle-bride-vidaai-ceremony.jpg", caption: 'An Emotional Farewell', key: 'work-16' },
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
              <AnimatedDiv key={wedding.key} delay={index * 100} className="break-inside-avoid">
                <div className="group relative overflow-hidden rounded-lg shadow-2xl border border-amber-200/20 aspect-[3/4]">
                    <ImageWithFallback
                      src={wedding.src}
                      alt={wedding.caption}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      style={{objectFit: 'cover'}}
                      className="transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      fallbackSrc="/images/seo/shaadi-squad-og-image.png"
                      containerClassName="w-full h-full"
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
