
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { AnimatedDiv } from '@/components/animated-div';

const services = [
  {
    title: "Full-Service Planning & Execution",
    description: "Our most comprehensive package, covering every aspect from the initial concept to the final farewell. We handle everything, so you can soak in every moment.",
    features: ["Unlimited Consultations", "Budget Management", "Venue & Vendor Sourcing", "Event Day Coordination"],
    image: "/bride-groom-weeding-hall.jpg",
  },
  {
    title: "Destination Wedding Curation",
    description: "From the serene beaches of Goa to the royal palaces of Rajasthan, we craft breathtaking destination weddings that are as unique as your love story.",
    features: ["Location Scouting", "Travel & Accommodation Logistics", "Guest Management", "Local Vendor Coordination"],
    image: "/wedding-lawns.jpg",
  },
  {
    title: "Decor, Design & Styling",
    description: "For couples who have the planning under control but need a creative eye to bring their aesthetic vision to life. We design and execute stunning visual concepts.",
    features: ["Theme Conceptualization", "Floral & Lighting Design", "Custom Installations", "Furniture & Linen Sourcing"],
    image: "/weddinghall-lighting.webp",
  },
  {
    title: "Partial Planning",
    description: "Perfect for couples who have started planning but need expert assistance to tie up loose ends and manage specific aspects of their wedding.",
    features: ["Vendor Recommendations", "Timeline Creation", "Select Vendor Management", "Final Month Coordination"],
    image: "/bride-groom-handshake.jpg",
  }
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <AnimatedDiv>
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Services Tailored for You</h1>
        </AnimatedDiv>
        <AnimatedDiv delay={200}>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Whether you need us to orchestrate your entire wedding or just add the finishing touches, we have a service to fit your needs.
          </p>
        </AnimatedDiv>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 preserve-3d">
        {services.map((service, index) => (
          <AnimatedDiv key={service.title} delay={index * 150}>
            <Card className="shadow-lg border-none transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group hover:[transform:rotateY(10deg)_rotateX(5deg)]">
              <CardHeader className="p-4 md:p-6">
                {service.image && (
                  <div className="relative w-full h-56 md:h-64 mb-4 overflow-hidden rounded-md">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      style={{objectFit:"cover"}}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <CardTitle className="font-headline text-xl md:text-2xl">{service.title}</CardTitle>
                <CardDescription className="pt-2 text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm md:text-base">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </AnimatedDiv>
        ))}
      </div>
    </div>
  );
}
