
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from "embla-carousel-autoplay";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Star } from 'lucide-react';
import { AnimatedDiv } from '@/components/animated-div';

const mainCarouselImages = [
  { src: "/Homepage_main.jpeg", alt: "Elegant wedding reception dinner setup" },
  { src: "/Homepage_main2.jpg", alt: "Bride and groom in a beautiful outdoor setting" },
  { src: "/Homepage_main3.webp", alt: "Luxurious wedding decor with floral arrangements" },
];

const services = [
  {
    title: "Full Wedding Planning",
    description: "From venue selection to vendor management, we handle every detail so you can enjoy your special day stress-free.",
    image: "/bride-groom-weeding-hall.jpg",
  },
  {
    title: "Destination Weddings",
    description: "Dreaming of a wedding in an exotic location? We specialize in creating unforgettable destination weddings.",
    image: "/resort-hall.jpg",
  },
  {
    title: "Decor & Design",
    description: "Our team of talented designers will transform your vision into a stunning reality with bespoke decor concepts.",
    image: "/flower-decor.jpg",
  }
];

const featuredWeddings = [
    { src: "/bride-groom-standing.jpg", alt: "Bride smiling" },
    { src: "/bride-groom-dance.jpg", alt: "Couple smiling" },
    { src: "/Hindu+wedding+photography.jpg", alt: "Wedding details" },
    { src: "/phere-hall.jpg", alt: "Groom smiling" },
];

const testimonials = [
  {
    name: "Priya & Rohan",
    avatar: "/Sarita-Souvik-MnMphotography-38.jpg",
    text: "VivaahVerse made our dream wedding a reality! Their attention to detail and creative vision were outstanding. We couldn't have asked for a better team."
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

export default function Home() {
   const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  
  const videoRef = React.useRef<HTMLDivElement>(null);
  const [isVideoVisible, setIsVideoVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVideoVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);
  

  return (
    <div className="flex flex-col">
      {/* Hero Section Carousel */}
      <section className="w-full relative group -mt-24">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {mainCarouselImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-screen w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    style={{objectFit: 'cover'}}
                    className="z-0"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 bg-white/20 hover:bg-white/40 text-white border-none opacity-0 group-hover:opacity-100 transition-opacity" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 bg-white/20 hover:bg-white/40 text-white border-none opacity-0 group-hover:opacity-100 transition-opacity" />
        </Carousel>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <AnimatedDiv>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">The Architects of Your Dream Day</h2>
          </AnimatedDiv>
          <AnimatedDiv delay={200}>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
              VivaahVerse was born from a passion for creating beautiful, seamless, and personal weddings. We believe that every couple has a unique story, and we're here to help you tell it in the most spectacular way possible. Our team combines meticulous planning with breathtaking design to create moments that last a lifetime.
            </p>
          </AnimatedDiv>
          <AnimatedDiv delay={400}>
            <Button asChild variant="link" className="mt-6 text-foreground text-lg">
              <Link href="/about">Meet the Squad <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </AnimatedDiv>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <AnimatedDiv>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Signature Services</h2>
            </AnimatedDiv>
            <AnimatedDiv delay={200}>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Everything you need for a perfect celebration.</p>
            </AnimatedDiv>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedDiv key={service.title} delay={index * 150}>
                <Card className="overflow-hidden border-none shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <CardContent className="p-0">
                    <Image src={service.image} alt={service.title} width={600} height={400} className="w-full h-64 object-cover"/>
                    <div className="p-6">
                      <h3 className="font-headline text-2xl font-semibold">{service.title}</h3>
                      <p className="mt-2 text-muted-foreground">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Weddings Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <AnimatedDiv>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Love in Focus</h2>
            </AnimatedDiv>
            <AnimatedDiv delay={200}>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">A glimpse into the magical weddings we've crafted.</p>
            </AnimatedDiv>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredWeddings.map((wedding, index) => (
              <AnimatedDiv key={index} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-lg shadow-lg aspect-[3/4]">
                  <Image src={wedding.src} alt={wedding.alt} fill style={{objectFit: 'cover'}} className="transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </AnimatedDiv>
            ))}
          </div>
           <div className="text-center mt-12">
             <AnimatedDiv>
              <Button asChild size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
                  <Link href="/work">View Our Portfolio</Link>
              </Button>
             </AnimatedDiv>
           </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <AnimatedDiv>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">VivaahVerse in Motion</h2>
            </AnimatedDiv>
            <AnimatedDiv delay={200}>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">See the magic we create, one celebration at a time.</p>
            </AnimatedDiv>
          </div>
          <AnimatedDiv>
            <div ref={videoRef} className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl mx-auto max-w-4xl">
              {isVideoVisible && (
                <iframe
                  src="https://www.youtube.com/embed/9wHuKleo9pg?autoplay=1&mute=1&loop=1&playlist=9wHuKleo9pg&controls=0"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              )}
            </div>
          </AnimatedDiv>
        </div>
      </section>
      
      {/* Testimonials Section */}
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
          <AnimatedDiv>
            <Carousel opts={{ loop: true }} className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <div className="p-2">
                      <Card className="border-none bg-transparent shadow-none">
                        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                          <Avatar className="w-24 h-24 mb-4">
                            <AvatarImage src={testimonial.avatar} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex gap-1 text-yellow-400 mb-4">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                          </div>
                          <p className="text-lg italic text-foreground mb-4">"{testimonial.text}"</p>
                          <h4 className="font-headline font-bold text-xl">{testimonial.name}</h4>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-[-50px] text-foreground" />
              <CarouselNext className="right-[-50px] text-foreground" />
            </Carousel>
          </AnimatedDiv>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <AnimatedDiv>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready to Start Planning?</h2>
            </AnimatedDiv>
            <AnimatedDiv delay={200}>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Let's connect and talk about your vision. Your dream wedding is just a conversation away.</p>
            </AnimatedDiv>
            <AnimatedDiv delay={400}>
              <Button asChild size="lg" className="mt-8 bg-foreground text-background hover:bg-foreground/90">
                  <Link href="/contact">Schedule a Consultation</Link>
              </Button>
            </AnimatedDiv>
        </div>
      </section>
    </div>
  );
}
