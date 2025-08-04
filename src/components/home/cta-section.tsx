import { AnimatedDiv } from '@/components/animated-div';
import { InteractiveCtaButton } from '@/components/interactive-cta-button';
import { ShimmerEffect } from '../shimmer-effect';

export function CtaSection() {
    return (
        <section className="py-16 md:py-24 bg-background/50">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <AnimatedDiv animation="royalEntrance">
                  <ShimmerEffect>
                    <h2 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 bg-clip-text text-transparent leading-normal drop-shadow-sm pb-2">Ready to Start Planning?</h2>
                  </ShimmerEffect>
                </AnimatedDiv>
                <AnimatedDiv delay={300} animation="fadeInScale">
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Let's connect and talk about your vision. Your dream wedding is just a conversation away.</p>
                </AnimatedDiv>
                <AnimatedDiv delay={400}>
                    <InteractiveCtaButton 
                        variant="royal" 
                        size="lg" 
                        href="/contact"
                        className="mt-6"
                    >
                        Get Your Royal Quote
                    </InteractiveCtaButton>
                </AnimatedDiv>
            </div>
        </section>
    );
}
