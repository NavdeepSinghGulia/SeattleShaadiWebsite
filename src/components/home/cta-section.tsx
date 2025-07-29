
import { AnimatedDiv } from '@/components/animated-div';
import { InteractiveCtaButton } from '@/components/interactive-cta-button';

export function CtaSection() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <AnimatedDiv>
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Ready to Start Planning?</h2>
                </AnimatedDiv>
                <AnimatedDiv delay={200}>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Let's connect and talk about your vision. Your dream wedding is just a conversation away.</p>
                </AnimatedDiv>
                <AnimatedDiv delay={400}>
                    <InteractiveCtaButton />
                </AnimatedDiv>
            </div>
        </section>
    );
}
