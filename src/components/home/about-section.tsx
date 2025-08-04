import { AnimatedDiv } from '@/components/animated-div';
import { RoyalTypography } from '@/components/royal-typography';
import { LuxuryCard } from '@/components/luxury-card';
import { motion } from 'framer-motion';

export function AboutSection() {
    return (
        <section className="py-16 md:py-24 bg-background/50 relative overflow-hidden">
            {/* Royal decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-10 left-10 text-primary/20 text-4xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    👑
                </motion.div>
                <motion.div
                    className="absolute bottom-10 right-10 text-accent/20 text-3xl"
                    animate={{ 
                        rotate: [0, -360],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                        rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    💎
                </motion.div>
            </div>

            <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                <AnimatedDiv animation="royalEntrance">
                    <RoyalTypography
                        variant="h2"
                        animation="crownTitle"
                        className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                    >
                        The Architects of Your Dream Day
                    </RoyalTypography>
                </AnimatedDiv>
                
                <AnimatedDiv delay={300} animation="fadeInScale">
                    <RoyalTypography
                        variant="p"
                        animation="royalReveal"
                        className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground"
                        delay={0.5}
                    >
                        Seattle Shaadi was born from a passion for creating beautiful, seamless, and personal weddings. We believe that every couple has a unique story, and we're here to help you tell it in the most spectacular way possible.
                    </RoyalTypography>
                </AnimatedDiv>

                {/* Our Values */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    <LuxuryCard variant="royal" className="text-center p-6">
                        <motion.div
                            className="text-3xl mb-4"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            👑
                        </motion.div>
                        <RoyalTypography
                            variant="h4"
                            animation="goldenGlow"
                            className="text-xl font-bold text-primary mb-3"
                        >
                            Royal Elegance
                        </RoyalTypography>
                        <p className="text-muted-foreground text-sm">
                            Every detail crafted with majestic precision and timeless sophistication
                        </p>
                    </LuxuryCard>

                    <LuxuryCard variant="royal" className="text-center p-6">
                        <motion.div
                            className="text-3xl mb-4"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            💎
                        </motion.div>
                        <RoyalTypography
                            variant="h4"
                            animation="goldenGlow"
                            className="text-xl font-bold text-primary mb-3"
                            delay={0.2}
                        >
                            Personalized Touch
                        </RoyalTypography>
                        <p className="text-muted-foreground text-sm">
                            Your unique love story deserves a celebration as special as you are
                        </p>
                    </LuxuryCard>

                    <LuxuryCard variant="royal" className="text-center p-6">
                        <motion.div
                            className="text-3xl mb-4"
                            animate={{ 
                                y: [0, -5, 0],
                                opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                        >
                            ✨
                        </motion.div>
                        <RoyalTypography
                            variant="h4"
                            animation="goldenGlow"
                            className="text-xl font-bold text-primary mb-3"
                            delay={0.4}
                        >
                            Magical Moments
                        </RoyalTypography>
                        <p className="text-muted-foreground text-sm">
                            Creating unforgettable memories that will last a lifetime
                        </p>
                    </LuxuryCard>
                </motion.div>
            </div>
        </section>
    );
}
