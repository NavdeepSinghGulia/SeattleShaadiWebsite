'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedDiv } from '@/components/animated-div';
import { RoyalTypography } from '@/components/royal-typography';
import { LuxuryCard } from '@/components/luxury-card';
import { InteractiveCtaButton } from '@/components/interactive-cta-button';

const services = [
    {
        title: "Full Wedding Planning",
        description: "From venue selection to vendor management, we handle every detail so you can enjoy your special day stress-free.",
        image: "/images/venues/seattle-wedding-hall-ceremony.jpg",
        features: ["Venue Selection", "Vendor Management", "Timeline Coordination"]
    },
    {
        title: "Destination Weddings",
        description: "Dreaming of a wedding in an exotic location? We specialize in creating unforgettable destination weddings.",
        image: "/images/venues/seattle-resort-wedding-hall.jpg",
        features: ["Location Scouting", "Travel Coordination", "Local Vendor Network"]
    },
    {
        title: "Decor & Design",
        description: "Our team of talented designers will transform your vision into a stunning reality with bespoke decor concepts.",
        image: "/images/venues/wedding-floral-decoration-setup.jpg",
        features: ["Custom Design", "Floral Arrangements", "Lighting Design"]
    }
];

export function ServicesSection() {
    return (
        <section className="py-16 md:py-24 bg-secondary/30 relative overflow-hidden">


            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-12">
                    <AnimatedDiv animation="royalEntrance">
                        <RoyalTypography
                            variant="h2"
                            animation="crownTitle"
                            className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent pb-2"
                        >
                            Our Signature Services
                        </RoyalTypography>
                    </AnimatedDiv>
                    <AnimatedDiv delay={300} animation="fadeInScale">
                        <RoyalTypography
                            variant="p"
                            animation="royalReveal"
                            className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg"
                            delay={0.5}
                        >
                            Everything you need for a perfect royal celebration, crafted with unparalleled attention to detail.
                        </RoyalTypography>
                    </AnimatedDiv>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <AnimatedDiv 
                            key={service.title} 
                            delay={index * 200} 
                            animation="royalEntrance"
                        >
                            <LuxuryCard 
                                variant="royal" 
                                className="h-full group cursor-pointer"
                                glowEffect={true}
                            >
                                {/* Image Container */}
                                <div className="overflow-hidden relative aspect-4/3 clip-arch mb-6">
                                    <Image 
                                        src={service.image} 
                                        alt={service.title} 
                                        fill 
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                                        className="w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                                    />
                                    
                                    {/* Golden overlay on hover */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <RoyalTypography
                                        variant="h3"
                                        animation="goldenGlow"
                                        glowOnHover={true}
                                        className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                                    >
                                        {service.title}
                                    </RoyalTypography>
                                    
                                    <p className="text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Features List */}
                                    <motion.ul 
                                        className="space-y-2 text-sm"
                                        initial={{ opacity: 0, height: 0 }}
                                        whileHover={{ opacity: 1, height: "auto" }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {service.features.map((feature, featureIndex) => (
                                            <motion.li
                                                key={feature}
                                                className="flex items-center text-muted-foreground"
                                                initial={{ opacity: 0, x: -10 }}
                                                whileHover={{ opacity: 1, x: 0 }}
                                                transition={{ delay: featureIndex * 0.1 }}
                                            >
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                                                {feature}
                                            </motion.li>
                                        ))}
                                    </motion.ul>

                                    {/* CTA Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="pt-4"
                                    >
                                        <InteractiveCtaButton
                                            href="/services"
                                            variant="royal"
                                            size="lg"
                                            className="w-full"
                                        >
                                            Learn More
                                        </InteractiveCtaButton>
                                    </motion.div>
                                </div>
                            </LuxuryCard>
                        </AnimatedDiv>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                >
                    <RoyalTypography
                        variant="p"
                        className="text-muted-foreground mb-6 max-w-2xl mx-auto"
                    >
                        Ready to begin planning your royal celebration? Let's create something extraordinary together.
                    </RoyalTypography>
                    
                    <InteractiveCtaButton
                        href="/contact"
                        variant="royal"
                        size="lg"
                        className="text-lg px-8 py-4"
                    >
                        Start Your Royal Journey
                    </InteractiveCtaButton>
                </motion.div>
            </div>
        </section>
    );
}
