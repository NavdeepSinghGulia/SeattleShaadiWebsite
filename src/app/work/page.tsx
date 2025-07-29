import Image from 'next/image';
import { AnimatedDiv } from '@/components/animated-div';

const weddings = [
  { src: "https://placehold.co/800x600.png", caption: 'Anushka & Virat', hint: 'bride groom' },
  { src: "https://placehold.co/800x600.png", caption: 'Deepika & Ranveer', hint: 'couple dancing' },
  { src: "https://placehold.co/800x600.png", caption: 'Priyanka & Nick', hint: 'engagement ceremony' },
  { src: "https://placehold.co/800x600.png", caption: 'Alia & Ranbir', hint: 'wedding decor' },
  { src: "https://placehold.co/800x600.png", caption: 'Kiara & Sidharth', hint: 'wedding dance' },
  { src: "https://placehold.co/800x600.png", caption: 'Katrina & Vicky', hint: 'wedding hall' },
  { src: "https://placehold.co/800x600.png", caption: 'Sonam & Anand', hint: 'flower decor' },
  { src: "https://placehold.co/800x600.png", caption: 'Natasha & Varun', hint: 'wedding lighting' },
  { src: "https://placehold.co/800x600.png", caption: 'Family Feasts', hint: 'wedding food' },
  { src: "https://placehold.co/800x600.png", caption: 'Haldi Moments', hint: 'haldi ceremony' },
  { src: "https://placehold.co/800x600.png", caption: 'Mehndi Designs', hint: 'mehndi hands' },
  { src: "https://placehold.co/800x600.png", caption: 'Baraat Procession', hint: 'baraat wedding' },
];

export default function WorkPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <AnimatedDiv>
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Gallery of Dreams</h1>
        </AnimatedDiv>
        <AnimatedDiv delay={200}>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Explore a curated selection of our favorite moments and designs from weddings we've had the honor to plan.
          </p>
        </AnimatedDiv>
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 mt-16 space-y-4">
        {weddings.map((wedding, index) => (
          <AnimatedDiv key={index} className="break-inside-avoid">
            <div className="group relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={wedding.src}
                  alt={wedding.caption}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  data-ai-hint={wedding.hint}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <h3 className="text-white font-headline text-xl">{wedding.caption}</h3>
                </div>
            </div>
          </AnimatedDiv>
        ))}
      </div>
    </div>
  );
}
