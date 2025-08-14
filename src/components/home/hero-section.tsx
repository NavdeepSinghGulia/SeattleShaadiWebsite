'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { InteractiveCtaButton } from '@/components/interactive-cta-button';
import { HeroImage } from '@/components/optimized-image';

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
                                    <HeroImage
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
                
                {/* Sanskrit Shloka - Centered and Prominent */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center z-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="text-center px-4 max-w-5xl mx-auto">
                        <h2 className="font-headline text-2xl md:text-4xl lg:text-5xl" style={{ lineHeight: 1.8 }}>
                            <div className="mb-4">
                                {shlokaLine1.map((word, index) => (
                                    <motion.span 
                                        key={index} 
                                        variants={wordVariants} 
                                        className="inline-block mr-3 bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent drop-shadow-lg"
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
                                        className="inline-block mr-3 bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent drop-shadow-lg"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </div>
                        </h2>
                        
                        <motion.p 
                            className="mt-8 text-base md:text-lg text-white max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3, duration: 1 }}
                            style={{ textShadow: '1px 1px 8px rgba(0,0,0,0.7)' }}
                        >
                            "O Lord Ganesha of the curved trunk and massive body, the one whose splendor is equal to millions of suns, please bless me so that there are no obstacles in all my endeavors, always."
                        </motion.p>
                    </div>
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
                                <div className="relative h-[60vh] w-full">
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
                                            <HeroImage
                                                src={item.poster || "/images/hero/seattle-indian-wedding-reception-hero.jpeg"}
                                                alt={item.alt}
                                                fill
                                                className="object-cover object-center"
                                                priority={index === 0}
                                            />
                                        </video>
                                    ) : (
                                        <HeroImage
                                            src={(item as any).src}
                                            alt={item.alt}
                                            fill
                                            className="object-cover object-center transition-transform duration-500 ease-out"
                                            priority={index === 0}
                                            sizes="100vw"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                    
                                    {/* Sanskrit Shloka for Mobile */}
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <motion.div 
                                            className="text-center px-4 max-w-sm mx-auto"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            <h2 className="font-headline text-xl" style={{ lineHeight: 1.8 }}>
                                                <div className="mb-2">
                                                    {shlokaLine1.map((word, index) => (
                                                        <motion.span 
                                                            key={index} 
                                                            variants={wordVariants} 
                                                            className="inline-block mr-2 bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent drop-shadow-lg"
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
                                                            className="inline-block mr-2 bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent drop-shadow-lg"
                                                        >
                                                            {word}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </h2>
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
