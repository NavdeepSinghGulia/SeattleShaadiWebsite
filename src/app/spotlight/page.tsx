
import Image from 'next/image';

const publications = [
  { name: 'Vogue Weddings', logo: "/logo.webp" },
  { name: 'Harper\'s Bazaar Bride', logo: "/logo.webp" },
  { name: 'Brides Today', logo: "/logo.webp" },
  { name: 'Elle Decor', logo: "/logo.webp" },
  { name: 'Condé Nast Traveller', logo: "/logo.webp" },
  { name: 'WeddingSutra', logo: "/logo.webp" },
  { name: 'The Times of India', logo: "/logo.webp" },
  { name: 'Femina', logo: "/logo.webp" },
];

export default function SpotlightPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">In The Spotlight</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          We're honored to be featured in some of the most prestigious publications for our work in creating exceptional weddings.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
        {publications.map((pub, index) => (
          <div key={index} className="flex justify-center p-6 bg-secondary/50 rounded-lg">
            <Image 
              src={pub.logo} 
              alt={pub.name} 
              width={200} 
              height={100}
              className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
