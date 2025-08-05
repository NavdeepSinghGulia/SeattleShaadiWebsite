import { AnimatedDiv } from "@/components/animated-div";
import { FloatingParticles } from "@/components/floating-particles";
import { RoyalBackground } from "@/components/royal-background";
import { LuxuryCard } from "@/components/luxury-card";
import { ShimmerEffect } from "@/components/shimmer-effect";
import { generateMetadata as generateSEOMetadata, pageMetadata } from '@/lib/metadata';
import { Breadcrumbs, pageBreadcrumbs } from '@/components/seo/breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata(pageMetadata.about);

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
    <div className="relative min-h-screen">
      <RoyalBackground />
      <FloatingParticles />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <Breadcrumbs customBreadcrumbs={pageBreadcrumbs.about} />
        <div className="text-center">
          <AnimatedDiv animation="royalEntrance">
            <ShimmerEffect>
              <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
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
            <LuxuryCard
              key={member.name}
              title={member.name}
              subtitle={member.role}
              content={member.bio}
              delay={index * 200}
            />
          ))}
        </div>

        <div className="mt-16 md:mt-24">
          <AnimatedDiv animation="royalEntrance" delay={600}>
            <ShimmerEffect className="rounded-lg">
              <div className="bg-gradient-to-br from-secondary/60 via-secondary/40 to-background/60 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-2xl border border-amber-200/20">
                <div className="text-center">
                  <h2 className="font-headline text-3xl font-bold bg-gradient-to-r from-amber-700 to-rose-700 bg-clip-text text-transparent">
                    Our Philosophy
                  </h2>
                  <p className="mt-4 max-w-4xl mx-auto text-muted-foreground">
                    We believe wedding planning should be a
                    joyous journey, not a stressful task. Our
                    approach is built on three pillars:
                    personalization, transparency, and
                    excellence. We listen to your story,
                    understand your vision, and then
                    meticulously bring it to life, ensuring
                    every element reflects you as a couple. With
                    Seattle Shaadi, you're not just getting a
                    planner; you're gaining a partner dedicated
                    to making your dream day perfect.
                  </p>
                </div>
              </div>
            </ShimmerEffect>
          </AnimatedDiv>
        </div>
      </div>
    </div>
  );
}
