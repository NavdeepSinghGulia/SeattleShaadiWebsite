import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, PartyPopper, Palette, ClipboardList } from 'lucide-react';

const services = [
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: 'Full-Service Wedding Planning',
    description: 'From concept to execution, we manage every aspect of your wedding day, ensuring a seamless and stress-free experience.',
  },
  {
    icon: <PartyPopper className="h-8 w-8 text-primary" />,
    title: 'Day-of Coordination',
    description: 'For the couple who has planned it all but wants to relax and enjoy their day. We orchestrate the timeline and vendors perfectly.',
  },
  {
    icon: <Palette className="h-8 w-8 text-primary" />,
    title: 'Decor and Design',
    description: 'We create breathtaking environments that reflect your personal style, from floral arrangements to lighting and linens.',
  },
  {
    icon: <ClipboardList className="h-8 w-8 text-primary" />,
    title: 'Vendor Management',
    description: 'Leverage our network of top-tier vendors. We handle negotiations, contracts, and communication to secure the best for you.',
  },
];

export function Services() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">Our Services</div>
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
            What We Offer
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We provide a comprehensive suite of services to cover all your wedding needs. Choose a package or customize one to fit your requirements.
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-transparent hover:border-primary">
                <div className="mb-4">{service.icon}</div>
                <CardHeader className="p-0">
                  <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardDescription className="mt-2 text-base flex-grow">
                  {service.description}
                </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
