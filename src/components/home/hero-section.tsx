'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { InteractiveCtaButton } from '@/components/interactive-cta-button';

const mainCarouselImages = [
    { src: "/Homepage_main.jpeg", alt: "Elegant wedding reception dinner setup" },
    { src: "/Homepage_main2.jpg", alt: "Bride and groom in a beautiful outdoor setting" },
];

const mobileCarouselContent = [
    { 
      type: 'video' as const,
      src: "https://videos.pexels.com/video-files/6893946/6893946-hd_1920_1080_30fps.mp4",
      alt: "Beautiful Indian wedding ceremony",
      poster: "/Homepage_main.jpeg"
    },
    { 
      type: 'image' as const,
      src: "/Homepage_main.jpeg", 
      alt: "Elegant wedding reception dinner setup" 
    },
    { 
      type: 'image' as const,
      src: "/Homepage_main2.jpg", 
      alt: "Bride and groom in a beautiful outdoor setting" 
    },
];

const shloka = "वक्रतुण्ड महाकाय सूर्य कोटी समप्रभा। निर्विघ्नं कुरु मे देव सर्व-कार्येशु सर्वदा";
const shlokaWords = shloka.split(' ');

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay: 2.5, // Start after initial hero animations
            staggerChildren: 0.3,
        },
    },
    fadeOut: {
        opacity: 0,
        transition: {
            delay: 1, // Wait a bit after the last word appears
            duration: 2,
            ease: "easeOut"
        }
    }
};

const wordVariants = {
    hidden: { 
        opacity: 0, 
        y: 10,
        filter: "blur(5px)",
        textShadow: "0 0 0px hsl(var(--primary) / 0)"
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        textShadow: "0 0 8px hsl(var(--primary) / 0.5)",
        transition: {
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

export function HeroSection() {
    const desktopPlugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );
    
    const mobilePlugin = React.useRef(
        Autoplay({ delay: 6000, stopOnInteraction: true })
    );

    const [animationState, setAnimationState] = React.useState("visible");

    return (
        <>
            {/* Desktop Hero Carousel */}
            <motion.section 
              className="relative w-full bg-background hidden md:block overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
                <Carousel
                    plugins={[desktopPlugin.current]}
                    className="w-full"
                    onMouseEnter={desktopPlugin.current.stop}
                    onMouseLeave={desktopPlugin.current.reset}
                    opts={{
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {mainCarouselImages.map((image, index) => (
                            <CarouselItem key={index}>
                                <motion.div 
                                  className="relative h-[95vh] w-full"
                                  whileHover={{ scale: 1.02 }}
                                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover object-top transition-transform duration-500 ease-out"
                                        priority={index === 0}
                                        sizes="100vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 bg-white/20 hover:bg-white/40 text-white border-none transition-all duration-300 ease-out" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 bg-white/20 hover:bg-white/40 text-white border-none transition-all duration-300 ease-out" />
                </Carousel>
                
                {/* Spiritual Shloka Animation */}
                <motion.div
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-4xl text-center z-20 pointer-events-none"
                    variants={containerVariants}
                    initial="hidden"
                    animate={animationState}
                    onAnimationComplete={(definition) => {
                        if (definition === "visible") {
                           setTimeout(() => setAnimationState("fadeOut"), 6000); // Time the shloka is visible
                        }
                    }}
                >
                    <h2 className="font-headline text-2xl md:text-3xl text-white drop-shadow-lg" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
                        {shlokaWords.map((word, index) => (
                            <motion.span key={index} variants={wordVariants} className="inline-block mr-3">
                                {word}
                            </motion.span>
                        ))}
                    </h2>
                </motion.div>

            </motion.section>

            {/* Mobile Hero Carousel with Video */}
            <motion.section 
              className="relative w-full bg-background block md:hidden overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
                <Carousel
                    plugins={[mobilePlugin.current]}
                    className="w-full"
                    opts={{
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {mobileCarouselContent.map((item, index) => (
                            <CarouselItem key={index}>
                                <div className="relative h-[40vh] w-full">
                                    {item.type === 'video' ? (
                                        <video
                                            className="w-full h-full object-cover"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            poster={item.poster}
                                        >
                                            <source src={item.src} type="video/mp4" />
                                            <Image
                                                src={item.poster || "/Homepage_main.jpeg"}
                                                alt={item.alt}
                                                fill
                                                className="object-cover object-center"
                                            />
                                        </video>
                                    ) : (
                                        <Image
                                            src={item.src}
                                            alt={item.alt}
                                            fill
                                            className="object-cover object-center transition-transform duration-500 ease-out"
                                            priority={index === 0}
                                            sizes="100vw"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                    
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <motion.div 
                                          className="text-center px-4"
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.2 }}
                                        >
                                            <InteractiveCtaButton
                                                href="/contact"
                                                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-out shadow-lg"
                                            >
                                                Start Planning
                                            </InteractiveCtaButton>
                                        </motion.div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 bg-white/20 hover:bg-white/40 text-white border-none transition-all duration-300 ease-out" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 bg-white/20 hover:bg-white/40 text-white border-none transition-all duration-300 ease-out" />
                </Carousel>
            </motion.section>
        </>
    );
}
