'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { RoyalTypography } from '@/components/royal-typography';
import { InteractiveCtaButton } from '@/components/interactive-cta-button';
import { OptimizedImage, HeroImage } from '@/components/optimized-image';
import { RoyalEntrance, RoyalStagger, ParallaxScroll } from '@/components/animations/royal-animations';
import { ScrollProgress } from '@/components/animations/scroll-animations';

const mainCarouselImages = [
    { 
        src: "/Homepage_main.jpeg", 
        alt: "Elegant South Asian wedding reception with royal decorations and golden lighting in Seattle",
        title: "Royal Wedding Celebrations",
        subtitle: "Creating majestic moments that last a lifetime with unparalleled elegance and royal grandeur"
    },
    { 
        src: "/Homepage_main2.jpg", 
        alt: "Beautiful South Asian bride and groom in traditional attire at outdoor Seattle wedding venue",
        title: "Cultural Heritage Meets Modern Elegance",
        subtitle: "Honoring traditions while creating contemporary celebrations that reflect your unique love story"
    },
];

export function HeroSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 6000, stopOnInteraction: true })
    );
    
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    
    return (
        <>
            <ScrollProgress className="z-50" />
            <section className="relative w-full bg-background hidden md:block">
                {/* SEO-optimized structured data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ImageGallery",
                            "name": "Seattle Shaadi Wedding Gallery",
                            "description": "Elegant South Asian wedding celebrations in Seattle",
                            "image": mainCarouselImages.map(img => ({
                                "@type": "ImageObject",
                                "url": img.src,
                                "description": img.alt
                            }))
                        })
                    }}
                />
                
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
                                <div className="relative h-[95vh] w-full overflow-hidden">
                                    {/* Parallax Background */}
                                    <motion.div 
                                        style={{ y }}
                                        className="absolute inset-0 scale-110"
                                    >
                                        <OptimizedImage
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-cover object-center"
                                            priority={index === 0}
                                            sizes="100vw"
                                            quality={90}
                                            placeholder="blur"
                                        />
                                    </motion.div>
                                    
                                    {/* Enhanced Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
                                    
                                    {/* Royal Content Overlay with Enhanced Animations */}
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <div className="text-center text-white max-w-5xl px-6">
                                            <RoyalEntrance delay={0.3}>
                                                <RoyalTypography
                                                    variant="h1"
                                                    animation="crownTitle"
                                                    className="text-white mb-6 text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
                                                    delay={0.5}
                                                >
                                                    {image.title}
                                                </RoyalTypography>
                                            </RoyalEntrance>
                                            
                                            <RoyalEntrance delay={0.8}>
                                                <RoyalTypography
                                                    variant="p"
                                                    animation="royalReveal"
                                                    className="text-white/95 text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed"
                                                    delay={1.0}
                                                >
                                                    {image.subtitle}
                                                </RoyalTypography>
                                            </RoyalEntrance>
                                            
                                            <RoyalStagger staggerDelay={0.2} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                                <InteractiveCtaButton
                                                    variant="royal"
                                                    size="lg"
                                                    className="text-lg px-10 py-5 font-semibold shadow-2xl hover:shadow-primary/25 transition-all duration-300"
                                                    aria-label="Start planning your royal wedding celebration"
                                                >
                                                    Begin Your Royal Journey
                                                </InteractiveCtaButton>
                                                
                                                <InteractiveCtaButton
                                                    variant="secondary"
                                                    size="lg"
                                                    className="text-lg px-10 py-5 bg-white/15 backdrop-blur-md border-white/40 text-white hover:bg-white/25 font-semibold shadow-xl transition-all duration-300"
                                                    aria-label="View our wedding portfolio and past celebrations"
                                                >
                                                    View Our Portfolio
                                                </InteractiveCtaButton>
                                            </RoyalStagger>
                                        </div>
                                    </div>
                                    
                                    {/* Decorative Royal Elements */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 0.1, scale: 1 }}
                                        transition={{ duration: 2, delay: 1.5 }}
                                        className="absolute top-10 left-10 w-20 h-20 border-2 border-primary/30 rounded-full"
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 0.1, scale: 1 }}
                                        transition={{ duration: 2, delay: 2 }}
                                        className="absolute bottom-10 right-10 w-16 h-16 border-2 border-primary/30 rounded-full"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    
                    {/* Enhanced Navigation */}
                    <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 z-30 h-12 w-12 sm:h-14 sm:w-14 bg-white/20 hover:bg-white/40 text-white border-none backdrop-blur-sm transition-all duration-300 hover:scale-110" />
                    <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 z-30 h-12 w-12 sm:h-14 sm:w-14 bg-white/20 hover:bg-white/40 text-white border-none backdrop-blur-sm transition-all duration-300 hover:scale-110" />
                </Carousel>
            </section>
        </>
    );
}
