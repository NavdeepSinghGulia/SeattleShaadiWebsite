import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center text-center">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://placehold.co/1920x1080.png"
          alt="Elegant wedding reception"
          data-ai-hint="wedding reception"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative z-10 container max-w-4xl flex flex-col items-center text-primary-foreground">
        <h1 className="font-headline text-5xl font-bold !leading-tight tracking-tighter sm:text-6xl md:text-7xl">
          Crafting Your Dream Wedding
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
          From grand celebrations to intimate gatherings, Seattle Shaadi brings your vision to life with elegance, passion, and meticulous attention to detail.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="#services">Explore Services</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-black" asChild>
            <Link href="#gallery">View Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
