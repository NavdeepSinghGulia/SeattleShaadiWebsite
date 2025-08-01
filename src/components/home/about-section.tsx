
import { AnimatedDiv } from '@/components/animated-div';
import { ShimmerEffect } from '../shimmer-effect';

export function AboutSection() {
    return (
        <section className="py-16 md:py-24 bg-background/50">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <AnimatedDiv animation="royalEntrance">
                    <ShimmerEffect>
                        <h2 className="font-headline text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">The Architects of Your Dream Day</h2>
                    </ShimmerEffect>
                </AnimatedDiv>
                <AnimatedDiv delay={300} animation="fadeInScale">
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                        Seattle Shaadi was born from a passion for creating beautiful, seamless, and personal weddings. We believe that every couple has a unique story, and we're here to help you tell it in the most spectacular way possible. Our team combines meticulous planning with breathtaking design to create moments that last a lifetime.
                    </p>
                </AnimatedDiv>
            </div>
        </section>
    );
}
