'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { RoyalTypography } from '@/components/royal-typography';
import { InteractiveCtaButton } from '@/components/interactive-cta-button';

// Elegant animation variants following design principles
const elegantVariants = {
  // Purposeful: Provides visual feedback for content loading
  // Subtle & Swift: 400ms duration with organic easing
  // Organic Motion: Natural ease-out curve
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94] // Organic easing curve
      }
    }
  },
  // Purposeful: Guides attention to interactive elements
  // Subtle: Gentle scale change that doesn't distract
  scaleOnHover: {
    whileHover: { 
      scale: 1.02,
      transition: { 
        duration: 0.3, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }
};

const mainCarouselImages = [
    { src: "/Homepage_main.jpeg", alt: "Elegant wedding reception dinner setup" },
    { src: "/Homepage_main2.jpg", alt: "Bride and groom in a beautiful outdoor setting" },
];

// Mobile carousel content with video
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
              variants={elegantVariants.fadeInUp}
              initial="initial"
              animate="animate"
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
                                  variants={elegantVariants.scaleOnHover}
                                  whileHover="whileHover"
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-contain object-center transition-transform duration-500 ease-out"
                                        priority={index === 0}
                                        sizes="100vw"
                                    />
                                    {/* Purposeful overlay: Improves text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 bg-white/20 hover:bg-white/40 text-white border-none transition-all duration-300 ease-out" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 bg-white/20 hover:bg-white/40 text-white border-none transition-all duration-300 ease-out" />
                </Carousel>
            </motion.section>

            {/* Mobile Hero Carousel with Video */}
            <motion.section 
              className="relative w-full bg-background block md:hidden overflow-hidden"
              variants={elegantVariants.fadeInUp}
              initial="initial"
              animate="animate"
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
                                            {/* Fallback image if video fails */}
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
                                    {/* Purposeful overlay: Ensures content visibility on mobile */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                    
                                    {/* Mobile Hero Content Overlay - Button Only */}
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <motion.div 
                                          className="text-center px-4"
                                          variants={elegantVariants.fadeInUp}
                                          initial="initial"
                                          animate="animate"
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
                    {/* Mobile carousel controls - smaller and more subtle */}
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 bg-white/20 hover:bg-white/40 text-white border-none transition-all duration-300 ease-out" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 bg-white/20 hover:bg-white/40 text-white border-none transition-all duration-300 ease-out" />
                </Carousel>
            </motion.section>
        </>
    );
}
