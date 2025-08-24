'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedDiv } from '@/components/animated-div';
import { Star, Quote } from 'lucide-react';
import { ShimmerEffect } from '../shimmer-effect';

const testimonials = [
    {
        name: "Priya & Rohan",
        avatar: "/images/portraits/bride-groom-wedding-portrait.jpg",
        text: "Seattle Shaadi made our dream wedding a reality! Their attention to detail and creative vision were outstanding. We couldn't have asked for a better team."
    },
    {
        name: "Aisha & Sameer",
        avatar: "/images/portraits/groom-bride-sagai-engagement.jpg",
        text: "The most professional and passionate team we've ever worked with. They took all the stress away and planned a flawless event. Highly recommended!"
    },
    {
        name: "Meera & Arjun",
        avatar: "/images/portraits/kaajol-pruthul-wedding-portrait.jpg",
        text: "From start to finish, the experience was seamless. The decor was breathtaking, and our guests are still talking about how beautiful everything was."
    }
];

export function TestimonialsSection() {
    return (
        <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <AnimatedDiv animation="royalEntrance">
                      <ShimmerEffect>
                        <h2 className="font-headline text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 bg-clip-text text-transparent leading-normal drop-shadow-sm pb-2">Words of Love</h2>
                      </ShimmerEffect>
                    </AnimatedDiv>
                    <AnimatedDiv delay={300} animation="fadeInScale">
                        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">What our happy couples say about us.</p>
                    </AnimatedDiv>
                </div>
                <Carousel opts={{ loop: true }} className="w-full max-w-4xl mx-auto">
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index}>
                                <AnimatedDiv delay={index * 200} animation="fadeInScale">
                                    <ShimmerEffect className="h-full">
                                        <div className="p-px bg-gradient-to-br from-amber-500/30 via-rose-500/30 to-amber-500/30 rounded-lg h-full">
                                            <Card className="border-none shadow-2xl bg-gradient-to-br from-secondary/60 via-secondary/40 to-background/60 backdrop-blur-sm h-full flex flex-col">
                                                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                                    <Avatar className="w-32 h-32 mb-6 border-4 border-primary">
                                                        <AvatarImage src={testimonial.avatar} alt={`${testimonial.name}'s testimonial photo`} />
                                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex gap-1 text-yellow-400 mb-4">
                                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" aria-label="Star rating" />)}
                                                    </div>
                                                    <div className="relative max-w-2xl">
                                                        <Quote className="absolute -top-2 -left-8 w-12 h-12 text-primary/20" />
                                                            <p className="text-xl italic text-foreground mb-6">
                                                                {testimonial.text}
                                                            </p>
                                                        <Quote className="absolute -bottom-2 -right-8 w-12 h-12 text-primary/20 transform scale-x-[-1]" />
                                                    </div>
                                                    <h4 className="font-headline font-bold text-3xl bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent leading-normal drop-shadow-sm">{testimonial.name}</h4>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </ShimmerEffect>
                                </AnimatedDiv>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-[-50px] text-foreground" />
                    <CarouselNext className="right-[-50px] text-foreground" />
                </Carousel>
            </div>
        </section>
    );
}
