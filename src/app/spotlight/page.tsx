import Image from 'next/image';
import { AnimatedDiv } from '@/components/animated-div';
import { generateMetadata } from "@/lib/seo-config";
import { PageHeading } from '@/components/page-heading';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: "In The Spotlight - Media Features & Recognition",
  description: "Seattle Shaadi has been featured in prestigious publications including Vogue Weddings, Harper's Bazaar Bride, and more. Discover our award-winning South Asian wedding planning expertise.",
  pathname: "/spotlight",
});

const publications = [
  { name: 'Vogue Weddings', logo: "/images/media/logos/vogue-weddings-logo.png" },
  { name: 'Harper\'s Bazaar Bride', logo: "/images/media/logos/harpers-bazaar-bride-logo.png" },
  { name: 'Brides Today', logo: "/images/media/logos/brides-today-magazine-logo.png" },
  { name: 'Elle Decor', logo: "/images/media/logos/elle-decor-magazine-logo.png" },
  { name: 'Condé Nast Traveller', logo: "/images/media/logos/conde-nast-traveller-logo.png" },
  { name: 'WeddingSutra', logo: "/images/media/logos/weddingsutra-platform-logo.png" },
];

export default function SpotlightPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <PageHeading 
        title="In The Spotlight"
        subtitle="We're honored to be featured in some of the most prestigious publications for our work in creating exceptional weddings."
      />

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
