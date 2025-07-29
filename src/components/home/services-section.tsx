
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedDiv } from '@/components/animated-div';

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
        <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <AnimatedDiv>
                        <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Signature Services</h2>
                    </AnimatedDiv>
                    <AnimatedDiv delay={200}>
                        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Everything you need for a perfect celebration.</p>
                    </AnimatedDiv>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 preserve-3d">
                    {services.map((service, index) => (
                        <AnimatedDiv key={service.title} delay={index * 150}>
                            <Card className="overflow-hidden border-none shadow-lg group transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:[transform:rotateY(10deg)_rotateX(5deg)]">
                                <CardContent className="p-0">
                                    <div className="overflow-hidden relative aspect-4/3 clip-arch">
                                        <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" />
                                    </div>
                                    <div className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:shadow-[inset_0_0_0_8px_hsl(var(--primary))]"></div>
                                    <div className="p-6">
                                        <h3 className="font-headline text-2xl font-semibold">{service.title}</h3>
                                        <p className="mt-2 text-muted-foreground">{service.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedDiv>
                    ))}
                </div>
            </div>
        </section>
    );
}
