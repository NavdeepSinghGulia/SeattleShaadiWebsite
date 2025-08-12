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
                
                {/* SEO-Optimized Hero Content */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="text-center px-4 max-w-6xl mx-auto">
                        <motion.h1 
                            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent"
                            style={{ textShadow: '2px 2px 12px rgba(0,0,0,0.8)' }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Best Indian Wedding Planner in Seattle
                        </motion.h1>
                        
                        <motion.p 
                            className="text-xl md:text-2xl mb-8 text-white/90 max-w-4xl mx-auto leading-relaxed"
                            style={{ textShadow: '1px 1px 8px rgba(0,0,0,0.7)' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            Seattle's #1 rated Indian wedding planner for all communities - Hindu, Sikh, Punjabi, Tamil, Telugu, Kannada, Muslim Indian, Bengali, Gujarati & Marathi weddings. 
                            Complete authentic celebrations from $30K with luxury touches.
                        </motion.p>
                        
                        <motion.div 
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1, duration: 0.8 }}
                        >
                            <InteractiveCtaButton
                                href="/contact"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ease-out shadow-xl hover:shadow-2xl transform hover:scale-105"
                            >
                                Get Free Consultation
                            </InteractiveCtaButton>
                            
                            <InteractiveCtaButton
                                href="/portfolio"
                                className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ease-out backdrop-blur-sm"
                            >
                                View Our Weddings
                            </InteractiveCtaButton>
                        </motion.div>
                        
                        <motion.div 
                            className="mt-8 flex items-center justify-center gap-6 text-white/80"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-400">★★★★★</span>
                                <span className="text-sm">4.9/5 Rating</span>
                            </div>
                            <div className="w-px h-4 bg-white/30"></div>
                            <div className="text-sm">127+ Happy Couples</div>
                            <div className="w-px h-4 bg-white/30"></div>
                            <div className="text-sm">5+ Years Experience</div>
                        </motion.div>
                    </div>
                </div>

                {/* Spiritual Shloka Animation (Secondary) */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-5xl text-center z-10 pointer-events-none"
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
                    <h2 className="font-headline text-lg md:text-2xl opacity-70" style={{ textShadow: '2px 2px 12px rgba(0,0,0,0.5)', lineHeight: 1.6 }}>
                        <div className="mb-1">
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
                                          className="text-center px-4 max-w-sm mx-auto"
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.2 }}
                                        >
                                            <h1 className="text-2xl font-bold mb-3 text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                                                Best Indian Wedding Planner Seattle
                                            </h1>
                                            <p className="text-sm mb-4 text-white/90" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.7)' }}>
                                                All Indian communities • Complete weddings from $30K
                                            </p>
                                            <InteractiveCtaButton
                                                href="/contact"
                                                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-out shadow-lg"
                                            >
                                                Get Free Consultation
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
