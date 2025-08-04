'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { RoyalTypography } from '@/components/royal-typography';
import { InteractiveCtaButton } from '@/components/interactive-cta-button';

const mainCarouselImages = [
    { src: "/Homepage_main.jpeg", alt: "Elegant wedding reception dinner setup" },
    { src: "/Homepage_main2.jpg", alt: "Bride and groom in a beautiful outdoor setting" },
];

export function HeroSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );
    return (
        <section className="relative w-full bg-background hidden md:block">
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
                            <div className="relative h-[95vh] w-full">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover object-center"
                                    priority={index === 0}
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                
                                {/* Royal Content Overlay */}
                                <motion.div 
                                    className="absolute inset-0 flex items-center justify-center z-20"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                >
                                    <div className="text-center text-white max-w-4xl px-6">
                                        <RoyalTypography
                                            variant="h1"
                                            animation="crownTitle"
                                            className="text-white mb-6"
                                            delay={0.8}
                                        >
                                            Royal Wedding Celebrations
                                        </RoyalTypography>
                                        
                                        <RoyalTypography
                                            variant="p"
                                            animation="royalReveal"
                                            className="text-white/90 text-xl mb-8 max-w-2xl mx-auto"
                                            delay={1.2}
                                        >
                                            Creating majestic moments that last a lifetime with unparalleled elegance and royal grandeur
                                        </RoyalTypography>
                                        
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 1.8 }}
                                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                                        >
                                            <InteractiveCtaButton
                                                variant="royal"
                                                size="lg"
                                                className="text-lg px-8 py-4"
                                            >
                                                Begin Your Royal Journey
                                            </InteractiveCtaButton>
                                            
                                            <InteractiveCtaButton
                                                variant="secondary"
                                                size="lg"
                                                className="text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                                            >
                                                View Our Portfolio
                                            </InteractiveCtaButton>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 bg-white/20 hover:bg-white/40 text-white border-none" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 bg-white/20 hover:bg-white/40 text-white border-none" />
            </Carousel>
        </section>
    );
}
