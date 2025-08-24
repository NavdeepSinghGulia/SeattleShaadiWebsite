import Image from 'next/image';
import { AnimatedDiv } from '@/components/animated-div';
import { generateMetadata } from "@/lib/seo-config";
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: "In The Spotlight - Media Features & Recognition",
  description: "Seattle Shaadi has been featured in prestigious publications including Vogue Weddings, Harper's Bazaar Bride, and more. Discover our award-winning South Asian wedding planning expertise.",
  pathname: "/spotlight",
});

const publications = [
  { name: 'Vogue Weddings', logo: "/images/branding/logos/shaadi-squad-grayscale-logo.png" },
  { name: 'Harper\'s Bazaar Bride', logo: "/images/branding/logos/shaadi-squad-grayscale-logo.png" },
  { name: 'Brides Today', logo: "/images/branding/logos/shaadi-squad-grayscale-logo.png" },
  { name: 'Elle Decor', logo: "/images/branding/logos/shaadi-squad-grayscale-logo.png" },
  { name: 'Condé Nast Traveller', logo: "/images/branding/logos/shaadi-squad-grayscale-logo.png" },
  { name: 'WeddingSutra', logo: "/images/branding/logos/shaadi-squad-grayscale-logo.png" },
];

export default function SpotlightPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <AnimatedDiv>
          <h1 className="font-headline text-4xl md:text-5xl font-bold pb-2">In The Spotlight</h1>
        </AnimatedDiv>
        <AnimatedDiv delay={200}>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We're honored to be featured in some of the most prestigious publications for our work in creating exceptional weddings.
          </p>
        </AnimatedDiv>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
        {publications.map((pub, index) => (
          <AnimatedDiv key={index} delay={index * 100}>
            <div className="group flex justify-center p-6 bg-secondary/50 rounded-lg h-32 items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <Image 
                src={pub.logo} 
                alt={pub.name} 
                width={150} 
                height={60}
                className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </AnimatedDiv>
        ))}
      </div>
    </div>
  );
}
