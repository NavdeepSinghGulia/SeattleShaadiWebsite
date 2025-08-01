
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedDiv } from '@/components/animated-div';
import { ShimmerEffect } from '../shimmer-effect';

const services = [
    {
        title: "Full Wedding Planning",
        description: "From venue selection to vendor management, we handle every detail so you can enjoy your special day stress-free.",
        image: "/bride-groom-weeding-hall.jpg",
    },
    {
        title: "Destination Weddings",
        description: "Dreaming of a wedding in an exotic location? We specialize in creating unforgettable destination weddings.",
        image: "/resort-hall.jpg",
    },
    {
        title: "Decor & Design",
        description: "Our team of talented designers will transform your vision into a stunning reality with bespoke decor concepts.",
        image: "/flower-decor.jpg",
    }
];

export function ServicesSection() {
    return (
        <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <AnimatedDiv animation="royalEntrance">
                        <ShimmerEffect>
                            <h2 className="font-headline text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">Our Signature Services</h2>
                        </ShimmerEffect>
                    </AnimatedDiv>
                    <AnimatedDiv delay={300} animation="fadeInScale">
                        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Everything you need for a perfect celebration.</p>
                    </AnimatedDiv>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <AnimatedDiv key={service.title} delay={index * 150} animation="fadeInScale">
                            <ShimmerEffect className="h-full">
                               <div className="p-px bg-gradient-to-br from-amber-500/30 via-rose-500/30 to-amber-500/30 rounded-lg h-full">
                                    <Card className="border-none shadow-2xl bg-gradient-to-br from-secondary/60 via-secondary/40 to-background/60 backdrop-blur-sm h-full flex flex-col">
                                        <CardContent className="p-0">
                                            <div className="overflow-hidden relative aspect-4/3 clip-arch">
                                                <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-headline text-2xl font-semibold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">{service.title}</h3>
                                                <p className="mt-2 text-muted-foreground">{service.description}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </ShimmerEffect>
                        </AnimatedDiv>
                    ))}
                </div>
            </div>
        </section>
    );
}
