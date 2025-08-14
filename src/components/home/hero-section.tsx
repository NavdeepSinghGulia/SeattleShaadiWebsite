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
    return (
        <motion.section 
            className="relative w-full bg-background overflow-hidden py-20 md:py-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="absolute inset-0 bg-gradient-radial from-amber-50/10 to-transparent opacity-30"></div>
            
            {/* Sanskrit Shloka - Centered and Prominent */}
            <motion.div
                className="w-full max-w-5xl mx-auto text-center z-10 px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="font-headline text-2xl md:text-4xl lg:text-5xl" style={{ lineHeight: 1.8 }}>
                    <div className="mb-4">
                        {shlokaLine1.map((word, index) => (
                            <motion.span 
                                key={index} 
                                variants={wordVariants} 
                                className="inline-block mr-3 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400 bg-clip-text text-transparent drop-shadow-lg"
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
                                className="inline-block mr-3 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400 bg-clip-text text-transparent drop-shadow-lg"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                </h2>
                
                <motion.p 
                    className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 1 }}
                >
                    "O Lord Ganesha of the curved trunk and massive body, the one whose splendor is equal to millions of suns, please bless me so that there are no obstacles in all my endeavors, always."
                </motion.p>
            </motion.div>
        </motion.section>
    );
}
