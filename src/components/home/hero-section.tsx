
'use client';
import React from 'react';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const mainCarouselImages = [
    { src: "/Homepage_main.jpeg", alt: "Elegant wedding reception dinner setup" },
    { src: "/Homepage_main2.jpg", alt: "Bride and groom in a beautiful outdoor setting" },
];

export function HeroSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );
    return (
        <section className="relative w-full bg-background">
            <div className="hidden md:block">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {mainCarouselImages.map((image, index) => (
                            <CarouselItem key={index}>
                                <div className="relative h-[90vh] w-full">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover object-center"
                                        priority={index === 0}
                                        sizes="100vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 bg-white/20 hover:bg-white/40 text-white border-none" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 bg-white/20 hover:bg-white/40 text-white border-none" />
                </Carousel>
            </div>
            <div className="md:hidden relative h-[60vh] w-full">
                <Image
                    src={mainCarouselImages[0].src}
                    alt={mainCarouselImages[0].alt}
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
        </section>
    );
}
