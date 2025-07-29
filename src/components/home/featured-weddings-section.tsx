
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedDiv } from '@/components/animated-div';

const featuredWeddings = [
    { src: "/bride-groom-standing.jpg", alt: "Bride smiling" },
    { src: "/bride-groom-dance.jpg", alt: "Couple smiling" },
    { src: "/Hindu+wedding+photography.jpg", alt: "Wedding details" },
    { src: "/phere-hall.jpg", alt: "Groom smiling" },
];

export function FeaturedWeddingsSection() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <AnimatedDiv>
                        <h2 className="font-headline text-3xl md:text-4xl font-bold">Love in Focus</h2>
                    </AnimatedDiv>
                    <AnimatedDiv delay={200}>
                        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">A glimpse into the magical weddings we've crafted.</p>
                    </AnimatedDiv>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {featuredWeddings.map((wedding, index) => (
                        <AnimatedDiv key={index} delay={index * 100}>
                            <div className="group relative overflow-hidden rounded-lg shadow-lg aspect-[3/4]">
                                <Image src={wedding.src} alt={wedding.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>
                        </AnimatedDiv>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <AnimatedDiv>
                        <Button asChild size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
                            <Link href="/work">View Our Portfolio</Link>
                        </Button>
                    </AnimatedDiv>
                </div>
            </div>
        </section>
    );
}
