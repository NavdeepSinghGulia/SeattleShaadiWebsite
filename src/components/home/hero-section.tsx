'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { InteractiveCtaButton } from '@/components/interactive-cta-button';

const mainCarouselImages = [
    { src: "/images/hero/seattle-indian-wedding-reception-hero.jpeg", alt: "Elegant wedding reception dinner setup" },
    { src: "/images/hero/seattle-wedding-couple-outdoor-hero.jpg", alt: "Bride and groom in a beautiful outdoor setting" },
];

// Define proper types for media content
type ImageContent = {
  type: 'image';
  src: string;
  alt: string;
};

type VideoContent = {
  type: 'video';
  src: string;
  alt: string;
  poster?: string;
  preload?: 'none' | 'metadata' | 'auto';
};

type MediaContent = ImageContent | VideoContent;

const mobileCarouselContent: MediaContent[] = [
    { 
      type: 'image' as const,
      src: "/images/hero/seattle-indian-wedding-reception-hero.jpeg", 
      alt: "Elegant wedding reception dinner setup" 
    },
    { 
      type: 'image' as const,
      src: "/images/hero/seattle-wedding-couple-outdoor-hero.jpg", 
      alt: "Bride and groom in a beautiful outdoor setting" 
    },
];

const shlokaLine1 = "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।".split(' ');
const shlokaLine2 = "निर्विघ्नम् कुरु मे देव सर्वकार्येषु सर्वदा॥".split(' ');


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay: 1.5,
            staggerChildren: 0.35,
        },
    },
    fadeOut: {
        opacity: 0,
        transition: {
            delay: 4, // Time shloka is visible before fading
            duration: 2.5,
            ease: "easeOut"
        }
    }
};

const wordVariants = {
    hidden: { 
        opacity: 0, 
        y: 15,
        filter: "blur(8px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1], // More dramatic ease
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
    const animationTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Cleanup effect for the component
    React.useEffect(() => {
        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, []);

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
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-5xl text-center z-20 pointer-events-none"
                    variants={containerVariants}
                    initial="hidden"
                    animate={animationState}
                    onAnimationComplete={(definition) => {
                        if (definition === "visible") {
                           // Clear any existing timeout
                           if (animationTimeoutRef.current) {
                               clearTimeout(animationTimeoutRef.current);
                           }
                           animationTimeoutRef.current = setTimeout(() => setAnimationState("fadeOut"), 6000); 
                        }
                    }}
                >
                    <h2 className="font-headline text-3xl md:text-5xl" style={{ textShadow: '2px 2px 12px rgba(0,0,0,0.5)', lineHeight: 1.6 }}>
                        <div className="mb-2">
                            {shlokaLine1.map((word, index) => (
                                <motion.span 
                                  key={index} 
                                  variants={wordVariants} 
                                  className="inline-block mr-4 bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent drop-shadow-lg"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </div>
                        <div>
                             {shlokaLine2.map((word, index) => (
                                <motion.span 
                                  key={index} 
                                  variants={wordVariants} 
                                  className="inline-block mr-4 bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent drop-shadow-lg"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </div>
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
                                            preload={item.preload || "metadata"}
                                            onError={(e) => {
                                                // Hide video and show fallback image
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        >
                                            <source src={item.src} type="video/mp4" />
                                            <Image
                                                src={item.poster || "/images/hero/seattle-indian-wedding-reception-hero.jpeg"}
                                                alt={item.alt}
                                                fill
                                                className="object-cover object-center"
                                                priority={index === 0}
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
