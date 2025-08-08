import Image from 'next/image';
import { AnimatedDiv } from '@/components/animated-div';
import { RoyalBackground } from '@/components/royal-background';
import { FloatingParticles } from '@/components/floating-particles';
import { ShimmerEffect } from '@/components/shimmer-effect';
import { generateMetadata } from "@/lib/seo-config";
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: "Our Work - Seattle Shaadi Wedding Portfolio",
  description: "Explore our stunning portfolio of South Asian and Indian weddings in Seattle. See how we bring dreams to life with our 'Regal Modernity' approach to wedding planning.",
  pathname: "/work",
});

const weddings = [
  { src: "/bride_groom_ceremony.jpg", caption: 'Regal Palace Nuptials' },
  { src: "/bride-groom-dance.jpg", caption: 'Lakeside Serenity' },
  { src: "/groom-bride-sagai.jpg", caption: 'Cross-Cultural Celebration' },
  { src: "/bride-groom-decor.jpg", caption: 'Secret Garden Vows' },
  { src: "/Bollywood+wedding+dance.jpg", caption: 'Modern City Romance' },
  { src: "/phere-hall.jpg", caption: 'Sunset Beach Ceremony' },
  { src: "/flower-decor.jpg", caption: 'Opulent Floral Fantasy' },
  { src: "/weddinghall-lighting.webp", caption: 'Grand Ballroom Gala' },
  { src: "/hindu+wedding+foods.jpeg", caption: 'A Culinary Journey' },
  { src: "/haldi-ceremony-indian-wedding.webp", caption: 'Vibrant Haldi Rituals' },
  { src: "/10-mehndi-photos.jpg", caption: 'Intricate Mehndi Art' },
  { src: "/Indian-Wedding-Photography-Baraat-Boston-Ptaufiq-Gaylord-National-Maryland.jpg", caption: 'Joyful Baraat Procession' },
  { src: "/bride-groom-handshake.jpg", caption: 'A Vow of Togetherness' },
  { src: "/resort-hall.jpg", caption: 'Destination Dream' },
  { src: "/wedding-lawns.jpg", caption: 'Garden Paradise' },
  { src: "/Sarita-Souvik-MnMphotography-38.jpg", caption: 'Portrait of Love' },
  { src: "/Kaajol-Pruthul_Ama-by-Aisha_Westin-Galleria-109.jpg", caption: 'Radiant Smiles' },
  { src: "/bride-dance.jpeg", caption: 'Joyful Moves' }
];

// Gallery schema is now handled by the global schema markup

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
                <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 bg-clip-text text-transparent leading-normal drop-shadow-sm">
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
                      width={800}
                      height={600}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
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
