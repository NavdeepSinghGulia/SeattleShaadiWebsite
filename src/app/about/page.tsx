import { AnimatedDiv } from "@/components/animated-div";
import { FloatingParticles } from "@/components/floating-particles";
import { RoyalBackground } from "@/components/royal-background";
import { LuxuryCard } from "@/components/luxury-card";
import { ShimmerEffect } from "@/components/shimmer-effect";
import { Seo } from "@/components/seo";

const teamMembers = [
  {
    name: "Rajesh Choudhary",
    role: "Founder & CEO",
    bio: "The visionary behind Seattle Shaadi, Rajesh brings over two decades of premier project and event management experience from the Greater Seattle Area. His deep-rooted expertise in the local landscape and his passion for celebrating South Asian traditions are the cornerstones of our company. Rajesh's leadership and meticulous attention to detail ensure that every wedding we plan is not just an event, but a landmark experience. He has built Seattle Shaadi on a foundation of professionalism, creativity, and a commitment to flawless execution, making dream weddings a reality for couples across the Pacific Northwest.",
  },
  {
    name: "Navdeep Singh",
    role: "Co-founder & Head of Operations",
    bio: "Navdeep is our in-house wizard when it comes to organization and coordination. As the operational mastermind of Seattle Shaadi, he is the backbone of every event we produce. With a remarkable talent for orchestrating complex logistics and managing on-the-ground execution, Navdeep ensures that every element of your celebration flows together seamlessly. From initial vendor planning to the precision of the event-day timeline, his calm demeanor and proactive approach guarantee that the only thing you'll need to focus on is enjoying your special day.",
  },
  {
    name: "Soniya Arora",
    role: "Client Relations Manager",
    bio: "Soniya is the heart of our client experience and the driving force at every wedding – right from the inception to the end. She works closely with each couple and their families through the entire planning process, acting as their dedicated guide and trusted advocate. Soniya excels at listening to your ideas and understanding your unique story, ensuring that all your visions translate into reality in the best possible way. Her warmth, dedication, and creative touch make the journey to your wedding day as joyful and stress-free as the celebration itself.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us - The Team Behind Seattle Shaadi"
        description="Meet the passionate and experienced team of wedding planners at Seattle Shaadi. Learn about our philosophy of 'Regal Modernity' and our commitment to creating your dream wedding."
        pathname="/about"
      />
      <div className="relative min-h-screen">
        <RoyalBackground />
        <FloatingParticles />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center">
            <AnimatedDiv animation="royalEntrance">
              <ShimmerEffect>
                <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 bg-clip-text text-transparent leading-normal drop-shadow-sm">
                  Meet the Dream Weavers
                </h1>
              </ShimmerEffect>
            </AnimatedDiv>
            <AnimatedDiv delay={300} animation="fadeInScale">
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                We are a team of passionate, creative, and
                slightly-obsessed-with-details individuals who
                believe in the magic of weddings. Get to know the
                faces behind Seattle Shaadi.
              </p>
            </AnimatedDiv>
          </div>

          <div className="mt-16 max-w-4xl mx-auto space-y-12">
            {teamMembers.map((member, index) => (
              <AnimatedDiv key={member.name} delay={index * 200} animation="fadeInScale">
                <LuxuryCard variant="royal" glowEffect>
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="font-headline text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                        {member.name}
                      </h3>
                      <p className="text-lg text-muted-foreground mt-2 font-medium">
                        {member.role}
                      </p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-center">
                      {member.bio}
                    </p>
                  </div>
                </LuxuryCard>
              </AnimatedDiv>
            ))}
          </div>

          <div className="mt-16 md:mt-24">
            <AnimatedDiv animation="royalEntrance" delay={600}>
              <ShimmerEffect className="rounded-lg">
                <div className="bg-gradient-to-br from-secondary/60 via-secondary/40 to-background/60 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-2xl border border-amber-200/20">
                  <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-normal drop-shadow-sm">
                      Our Core Philosophy: "Regal Modernity"
                    </h2>
                    <p className="mt-4 max-w-4xl mx-auto text-muted-foreground leading-relaxed">
                      We believe in honoring the deep, rich tapestry of Indian wedding traditions while providing cutting-edge beauty and innovation. Our "Regal Modernity" approach creates a space that feels luxurious, exclusive, and supremely competent - where timeless customs meet contemporary elegance. Every celebration we craft respects your heritage while embracing the sophistication of modern design, ensuring your wedding is both deeply meaningful and breathtakingly beautiful.
                    </p>
                  </div>
                </div>
              </ShimmerEffect>
            </AnimatedDiv>
          </div>
        </div>
      </div>
    </>
  );
}
