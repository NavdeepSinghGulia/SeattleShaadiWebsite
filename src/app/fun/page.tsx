import Image from 'next/image';
import { AnimatedDiv } from '@/components/animated-div';
import { generateMetadata } from "@/lib/seo-config";
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: "Behind the Scenes - Fun at Seattle Shaadi",
  description: "Get a glimpse behind the scenes at Seattle Shaadi! See our team in action, candid moments, and the joy that goes into creating your perfect South Asian wedding celebration.",
  pathname: "/fun",
});

const funMoments = [
  { src: "/images/celebrations/traditional-wedding-dance.jpg", caption: 'Post-event shenanigans' },
  { src: "/images/celebrations/bride-dance-celebration.jpeg", caption: 'Our amazing crew' },
  { src: "/images/celebrations/bollywood-wedding-dance.jpg", caption: 'The magic in making' },
  { src: "/images/celebrations/indian-wedding-dance-celebration.png", caption: 'Laughs on set' },
  { src: "/images/celebrations/wedding-feast-table-setup.webp", caption: 'Celebrating a success' },
  { src: "/images/ceremonies/vidaai/emotional-vidaai-parents-moment.jpeg", caption: 'Candid Moments' },
];

export default function FunPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <AnimatedDiv>
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Fun at Seattle Shaadi</h1>
        </AnimatedDiv>
        <AnimatedDiv delay={200}>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            All work and no play? Not us! A peek into the life and laughter behind the scenes.
          </p>
        </AnimatedDiv>
      </div>

      <div className="columns-2 md:columns-3 gap-4 mt-16 space-y-4">
        {funMoments.map((moment, index) => (
           <AnimatedDiv key={index} className="break-inside-avoid">
             <div className="group relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={moment.src}
                  alt={moment.caption}
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 group-hover:shadow-[inset_0_0_0_8px_hsl(var(--primary))]">
                    <h3 className="text-white font-headline text-xl text-center">{moment.caption}</h3>
                </div>
            </div>
           </AnimatedDiv>
        ))}
      </div>
    </div>
  );
}
