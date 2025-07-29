
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedDiv } from '@/components/animated-div';

const teamMembers = [
  { 
    name: 'Rajesh Choudhary', 
    role: 'Founder & CEO', 
    bio: "The visionary behind Seattle Shaadi, Rajesh brings over two decades of premier project and event management experience from the Greater Seattle Area. His deep-rooted expertise in the local landscape and his passion for celebrating South Asian traditions are the cornerstones of our company. Rajesh's leadership and meticulous attention to detail ensure that every wedding we plan is not just an event, but a landmark experience. He has built Seattle Shaadi on a foundation of professionalism, creativity, and a commitment to flawless execution, making dream weddings a reality for couples across the Pacific Northwest." 
  },
  { 
    name: 'Navdeep Singh', 
    role: 'Co-founder & Head of Operations', 
    bio: "Navdeep is our in-house wizard when it comes to organization and coordination. As the operational mastermind of Seattle Shaadi, he is the backbone of every event we produce. With a remarkable talent for orchestrating complex logistics and managing on-the-ground execution, Navdeep ensures that every element of your celebration flows together seamlessly. From initial vendor planning to the precision of the event-day timeline, his calm demeanor and proactive approach guarantee that the only thing you’ll need to focus on is enjoying your special day."
  },
  { 
    name: 'Soniya Arora', 
    role: 'Client Relations Manager', 
    bio: "Soniya is the heart of our client experience and the driving force at every wedding – right from the inception to the end. She works closely with each couple and their families through the entire planning process, acting as their dedicated guide and trusted advocate. Soniya excels at listening to your ideas and understanding your unique story, ensuring that all your visions translate into reality in the best possible way. Her warmth, dedication, and creative touch make the journey to your wedding day as joyful and stress-free as the celebration itself."
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <AnimatedDiv>
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Meet the Team</h1>
        </AnimatedDiv>
        <AnimatedDiv delay={200}>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We are a team of passionate, creative, and slightly-obsessed-with-details individuals who believe in the magic of weddings. Get to know the faces behind Seattle Shaadi.
          </p>
        </AnimatedDiv>
      </div>

      <div className="mt-16 max-w-4xl mx-auto space-y-12">
        {teamMembers.map((member, index) => (
          <AnimatedDiv key={member.name} delay={index * 150}>
            <Card className="border-none shadow-lg overflow-hidden bg-secondary/30">
              <CardHeader>
                <CardTitle className="font-headline text-3xl font-bold">{member.name}</CardTitle>
                <p className="text-primary font-semibold text-lg">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{member.bio}</p>
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
