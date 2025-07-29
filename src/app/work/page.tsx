
import Image from 'next/image';
import { AnimatedDiv } from '@/components/animated-div';

const weddings = [
  { src: "/bride_groom_ceremony.jpg", caption: 'Anushka & Virat' },
  { src: "/bride-groom-dance.jpg", caption: 'Deepika & Ranveer' },
  { src: "/groom-bride-sagai.jpg", caption: 'Priyanka & Nick' },
  { src: "/bride-groom-decor.jpg", caption: 'Alia & Ranbir' },
  { src: "/Bollywood+wedding+dance.jpg", caption: 'Kiara & Sidharth' },
  { src: "/phere-hall.jpg", caption: 'Katrina & Vicky' },
  { src: "/flower-decor.jpg", caption: 'Sonam & Anand' },
  { src: "/weddinghall-lighting.webp", caption: 'Natasha & Varun' },
  { src: "/hindu+wedding+foods.jpeg", caption: 'Family Feasts' },
  { src: "/haldi-ceremony-indian-wedding.webp", caption: 'Haldi Moments' },
  { src: "/10-mehndi-photos.jpg", caption: 'Mehndi Designs' },
  { src: "/Indian-Wedding-Photography-Baraat-Boston-Ptaufiq-Gaylord-National-Maryland.jpg", caption: 'Baraat Procession' },
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
