import Link from 'next/link';
import Image from 'next/image';
import { AnimatedDiv } from '@/components/animated-div';
import { RoyalBackground } from '@/components/royal-background';
import { FloatingParticles } from '@/components/floating-particles';
import { ShimmerEffect } from '@/components/shimmer-effect';
import { generateMetadata } from "@/lib/seo-config";
import type { Metadata } from 'next';
import { LuxuryCard } from '@/components/luxury-card';
import { Breadcrumb, BreadcrumbStructuredData } from "@/components/breadcrumb";

export const metadata: Metadata = generateMetadata({
  title: "Blog - Royal Musings from Seattle Shaadi",
  description: "Explore wedding planning tips, venue spotlights, and inspiration from the experts at Seattle Shaadi. Your essential guide to planning the perfect South Asian wedding in Seattle.",
  pathname: "/blog",
});

const blogPosts = [
  {
    slug: "top-5-seattle-wedding-venues",
    title: "Top 5 Undiscovered Wedding Venues in Seattle",
    excerpt: "Move over, Space Needle! We're unveiling five hidden gems in the Emerald City that offer breathtaking backdrops for your unforgettable day.",
    author: "Soniya Arora",
    date: "2024-07-28",
    image: "https://placehold.co/800x600.png",
    imageHint: "wedding venue",
    tags: ["Venues", "Seattle", "Planning"],
  },
  // Add more blog posts here as they are created
];

export default function BlogPage() {
  return (
    <div className="relative min-h-screen">
      <RoyalBackground />
      <FloatingParticles />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <Breadcrumb 
          items={[{ label: "Blog" }]} 
          className="mb-8"
        />
        <BreadcrumbStructuredData items={[{ label: "Blog" }]} />

        <div className="text-center">
          <AnimatedDiv animation="royalEntrance">
            <ShimmerEffect>
              <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 bg-clip-text text-transparent leading-normal drop-shadow-sm">
                Royal Musings
              </h1>
            </ShimmerEffect>
          </AnimatedDiv>
          <AnimatedDiv delay={300} animation="fadeInScale">
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Your source for wedding wisdom, trends, and inspiration, from our hearts to yours.
            </p>
          </AnimatedDiv>
        </div>

        <div className="mt-16 max-w-4xl mx-auto space-y-12">
          {blogPosts.map((post, index) => (
            <AnimatedDiv key={post.slug} delay={index * 200} animation="fadeInScale">
              <Link href={`/blog/${post.slug}`}>
                <LuxuryCard variant="royal" glowEffect hoverable className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="relative md:aspect-square w-full h-64 md:h-full overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        data-ai-hint={post.imageHint}
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 md:p-8 md:col-span-2">
                      <div className="mb-2 text-sm text-muted-foreground">
                        <span>{post.date}</span> &bull; <span>{post.author}</span>
                      </div>
                      <h2 className="font-headline text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-xs font-medium bg-accent/10 text-accent rounded-full px-3 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </LuxuryCard>
              </Link>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </div>
  );
}
