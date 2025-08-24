import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { AnimatedDiv } from '@/components/animated-div';
import { RoyalBackground } from '@/components/royal-background';
import { FloatingParticles } from '@/components/floating-particles';
import { ShimmerEffect } from '@/components/shimmer-effect';
import { generateMetadata } from "@/lib/seo-config";
import { Breadcrumb, BreadcrumbStructuredData } from "@/components/breadcrumb";
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: "Wedding Planning Services - Seattle Shaadi",
  description: "Explore our bespoke wedding planning services in Seattle, from full-service planning and destination weddings to decor design and partial planning. Specializing in Indian weddings.",
  pathname: "/services",
});

const services = [
  {
    title: "Full-Service Planning & Execution",
    description: "Our most comprehensive package, covering every aspect from the initial concept to the final farewell. We handle everything, so you can soak in every moment.",
    features: ["Unlimited Consultations", "Budget Management", "Venue & Vendor Sourcing", "Event Day Coordination"],
    image: "/images/venues/seattle-wedding-hall-ceremony.jpg",
  },
  {
    title: "Destination Wedding Curation",
    description: "From the serene beaches of Goa to the royal palaces of Rajasthan, we craft breathtaking destination weddings that are as unique as your love story.",
    features: ["Location Scouting", "Travel & Accommodation Logistics", "Guest Management", "Local Vendor Coordination"],
    image: "/images/venues/seattle-wedding-garden-lawns.jpg",
  },
  {
    title: "Decor, Design & Styling",
    description: "For couples who have the planning under control but need a creative eye to bring their aesthetic vision to life. We design and execute stunning visual concepts.",
    features: ["Theme Conceptualization", "Floral & Lighting Design", "Custom Installations", "Furniture & Linen Sourcing"],
    image: "/images/venues/elegant-wedding-hall-lighting.webp",
  },
  {
    title: "Partial Planning",
    description: "Perfect for couples who have started planning but need expert assistance to tie up loose ends and manage specific aspects of their wedding.",
    features: ["Vendor Recommendations", "Timeline Creation", "Select Vendor Management", "Final Month Coordination"],
    image: "/images/portraits/bride-groom-ceremony-handshake.jpg",
  }
];

export default function ServicesPage() {
  return (
    <>
      <div className="relative min-h-screen">
        <RoyalBackground />
        <FloatingParticles />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <Breadcrumb 
            items={[{ label: "Services" }]} 
            className="mb-8"
          />
          <BreadcrumbStructuredData items={[{ label: "Services" }]} />
          <div className="text-center">
             <AnimatedDiv animation="royalEntrance">
              <ShimmerEffect>
                <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 bg-clip-text text-transparent leading-normal drop-shadow-sm pb-2">
                  Services Tailored for You
                </h1>
              </ShimmerEffect>
            </AnimatedDiv>
            <AnimatedDiv delay={300} animation="fadeInScale">
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                 Whether you need us to orchestrate your entire wedding or just add the finishing touches, we have a service to fit your needs.
              </p>
            </AnimatedDiv>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <AnimatedDiv key={service.title} delay={index * 200} animation="fadeInScale">
                <ShimmerEffect className="h-full">
                  <div className="p-px bg-gradient-to-br from-amber-500/30 via-rose-500/30 to-amber-500/30 rounded-lg h-full">
                    <Card className="border-none shadow-2xl bg-gradient-to-br from-secondary/60 via-secondary/40 to-background/60 backdrop-blur-sm h-full flex flex-col">
                      <CardHeader className="p-4 md:p-6">
                        {service.image && (
                          <div className="relative w-full h-56 md:h-64 mb-4 overflow-hidden rounded-md group">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              style={{objectFit:"cover"}}
                              className="transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              decoding="async"
                              fetchPriority="low"
                            />
                          </div>
                        )}
                        <CardTitle className="font-headline text-2xl md:text-3xl bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent leading-normal drop-shadow-sm">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="pt-2 text-base text-muted-foreground">{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 md:p-6 pt-0 mt-auto">
                        <ul className="space-y-3">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center text-sm md:text-base">
                              <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </ShimmerEffect>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
