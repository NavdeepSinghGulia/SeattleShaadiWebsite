
import { AnimatedDiv } from '@/components/animated-div';

export function AboutSection() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <AnimatedDiv>
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">The Architects of Your Dream Day</h2>
                </AnimatedDiv>
                <AnimatedDiv delay={200}>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                        Seattle Shaadi was born from a passion for creating beautiful, seamless, and personal weddings. We believe that every couple has a unique story, and we're here to help you tell it in the most spectacular way possible. Our team combines meticulous planning with breathtaking design to create moments that last a lifetime.
                    </p>
                </AnimatedDiv>
            </div>
        </section>
    );
}
