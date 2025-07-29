
'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedDiv } from '@/components/animated-div';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Priya & Rohan",
        avatar: "/Sarita-Souvik-MnMphotography-38.jpg",
        text: "Seattle Shaadi made our dream wedding a reality! Their attention to detail and creative vision were outstanding. We couldn't have asked for a better team."
    },
    {
        name: "Aisha & Sameer",
        avatar: "/groom-bride-sagai.jpg",
        text: "The most professional and passionate team we've ever worked with. They took all the stress away and planned a flawless event. Highly recommended!"
    },
    {
        name: "Meera & Arjun",
        avatar: "/Kaajol-Pruthul_Ama-by-Aisha_Westin-Galleria-109.jpg",
        text: "From start to finish, the experience was seamless. The decor was breathtaking, and our guests are still talking about how beautiful everything was."
    }
];

export function TestimonialsSection() {
    return (
        <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <AnimatedDiv>
                        <h2 className="font-headline text-3xl md:text-4xl font-bold">Words of Love</h2>
                    </AnimatedDiv>
                    <AnimatedDiv delay={200}>
                        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">What our happy couples say about us.</p>
                    </AnimatedDiv>
                </div>
                <Carousel opts={{ loop: true }} className="w-full max-w-4xl mx-auto">
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index}>
                                <div className="p-2">
                                    <Card className="border-none bg-transparent shadow-none">
                                        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                            <AnimatedDiv delay={100}>
                                                <Avatar className="w-32 h-32 mb-6 border-4 border-primary">
                                                    <AvatarImage src={testimonial.avatar} alt={`${testimonial.name}'s testimonial photo`} />
                                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            </AnimatedDiv>
                                            <AnimatedDiv delay={200}>
                                                <div className="flex gap-1 text-yellow-400 mb-4">
                                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" aria-label="Star rating" />)}
                                                </div>
                                            </AnimatedDiv>
                                            <div className="relative max-w-2xl">
                                                <AnimatedDiv delay={300}>
                                                    <Quote className="absolute -top-2 -left-8 w-12 h-12 text-primary/20" />
                                                </AnimatedDiv>
                                                <AnimatedDiv delay={400}>
                                                    <p className="text-xl italic text-foreground mb-6">
                                                        {testimonial.text}
                                                    </p>
                                                </AnimatedDiv>
                                                <AnimatedDiv delay={300}>
                                                    <Quote className="absolute -bottom-2 -right-8 w-12 h-12 text-primary/20 transform scale-x-[-1]" />
                                                </AnimatedDiv>
                                            </div>
                                            <AnimatedDiv delay={500}>
                                                <h4 className="font-headline font-bold text-3xl">{testimonial.name}</h4>
                                            </AnimatedDiv>
                                        </CardContent>
                                    </Card>
                                </div>
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
