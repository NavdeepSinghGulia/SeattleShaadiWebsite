
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedDiv } from '@/components/animated-div';

const teamMembers = [
  { name: 'Sana Khan', role: 'Founder & Chief Planner', image: "/bride-vidai.jpg" },
  { name: 'Rohan Mehra', role: 'Co-Founder & Operations Head', image: "/groom-barat.jpg" },
  { name: 'Anjali Sharma', role: 'Lead Designer', image: "/bride-haldi.jpg" },
  { name: 'Vikram Singh', role: 'Client Relations Manager', image: "/Indian-Wedding-Photography-Baraat-Boston-Ptaufiq-Gaylord-National-Maryland.jpg" },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <AnimatedDiv>
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Meet the Dream Weavers</h1>
        </AnimatedDiv>
        <AnimatedDiv delay={200}>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We are a team of passionate, creative, and slightly-obsessed-with-details individuals who believe in the magic of weddings. Get to know the faces behind Seattle Shaadi.
          </p>
        </AnimatedDiv>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 preserve-3d">
        {teamMembers.map((member, index) => (
          <AnimatedDiv key={member.name} delay={index * 150}>
            <Card className="text-center border-none shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:[transform:rotateY(10deg)_rotateX(5deg)] group">
              <CardContent className="p-0">
                <div className="relative w-full h-96">
                  <Image src={member.image} alt={member.name} fill style={{objectFit: 'cover', objectPosition: 'top'}} className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
                   <div className="absolute inset-0 transition-all duration-300 group-hover:shadow-[inset_0_0_0_8px_hsl(var(--primary))]"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-headline text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </div>
              </CardContent>
            </Card>
          </AnimatedDiv>
        ))}
      </div>

       <div className="mt-16 md:mt-24">
         <AnimatedDiv>
            <div className="bg-secondary/50 p-8 md:p-12 rounded-lg">
              <div className="text-center">
                <h2 className="font-headline text-3xl font-bold">Our Philosophy</h2>
                <p className="mt-4 max-w-4xl mx-auto text-muted-foreground">
                  We believe wedding planning should be a joyous journey, not a stressful task. Our approach is built on three pillars: personalization, transparency, and excellence. We listen to your story, understand your vision, and then meticulously bring it to life, ensuring every element reflects you as a couple. With Seattle Shaadi, you're not just getting a planner; you're gaining a partner dedicated to making your dream day perfect.
                </p>
              </div>
            </div>
         </AnimatedDiv>
        </div>
    </div>
  );
}
