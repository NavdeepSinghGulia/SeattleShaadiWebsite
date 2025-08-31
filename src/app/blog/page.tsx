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
  description: "Explore wedding planning tips, venue spotlights, and inspiration from the experts at Seattle Shaadi. Your essential guide to planning the perfect Indian wedding in Seattle.",
  pathname: "/blog",
});

const blogPosts = [
  {
    slug: "haldi-ceremony-seattle-indian-wedding",
    title: "Haldi Ceremony in Seattle: The Golden Glow of Indian Wedding Traditions",
    excerpt: "Discover the sacred Haldi ceremony traditions for your Seattle Indian wedding. Learn about turmeric rituals, cultural significance, and how to plan this beautiful pre-wedding celebration.",
    author: "Kavya Reddy",
    date: "2024-08-07",
    image: "/seattle-haldi-ceremony-celebration.webp",
    imageHint: "haldi ceremony turmeric",
    tags: ["Haldi Ceremony", "Indian Wedding", "Seattle", "Pre-Wedding Rituals"],
  },
  {
    slug: "mehndi-ceremony-seattle-indian-wedding",
    title: "Mehndi Ceremony in Seattle: Intricate Henna Art for Your Indian Wedding",
    excerpt: "Explore the beautiful Mehndi ceremony traditions for Seattle Indian weddings. Learn about henna designs, cultural significance, and planning your perfect pre-wedding celebration.",
    author: "Anita Sharma",
    date: "2024-08-06",
    image: "/seattle-mehndi-ceremony-celebration.webp",
    imageHint: "mehndi henna ceremony",
    tags: ["Mehndi Ceremony", "Henna", "Indian Wedding", "Seattle", "Pre-Wedding"],
  },
  {
    slug: "indian-wedding-traditions-seattle",
    title: "Honoring Indian Wedding Traditions in Seattle: A Complete Guide",
    excerpt: "Discover how to beautifully blend traditional Indian wedding customs with modern Seattle celebrations. Expert tips for authentic ceremonies, rituals, and cultural elements.",
    author: "Priya Sharma",
    date: "2024-08-05",
    image: "/hindu-wedding-photography-ceremony.jpg",
    imageHint: "indian wedding ceremony",
    tags: ["Indian Weddings", "Traditions", "Seattle", "Cultural"],
  },
  {
    slug: "baraat-ceremony-seattle-indian-wedding",
    title: "Baraat Ceremony in Seattle: The Grand Groom's Procession for Indian Weddings",
    excerpt: "Discover the spectacular Baraat ceremony traditions for Seattle Indian weddings. Learn about the groom's procession, cultural significance, and planning tips for this joyous celebration.",
    author: "Vikram Singh",
    date: "2024-08-04",
    image: "/seattle-groom-baraat-procession.jpg",
    imageHint: "baraat groom procession",
    tags: ["Baraat Ceremony", "Groom Procession", "Indian Wedding", "Seattle", "Wedding Traditions"],
  },
  {
    slug: "seattle-wedding-planning-guide",
    title: "The Ultimate Seattle Wedding Planning Guide: From Emerald City to 'I Do'",
    excerpt: "Complete guide to planning your dream wedding in Seattle. Expert tips on venues, vendors, timing, and making the most of the Pacific Northwest's natural beauty.",
    author: "Rajesh Patel",
    date: "2024-08-03",
    image: "/elegant-wedding-hall-lighting.webp",
    imageHint: "seattle skyline wedding",
    tags: ["Wedding Planning", "Seattle", "Guide", "Pacific Northwest"],
  },
  {
    slug: "vidaai-ceremony-seattle-indian-wedding",
    title: "Vidaai Ceremony in Seattle: The Emotional Farewell in Indian Wedding Traditions",
    excerpt: "Understand the touching Vidaai ceremony for Seattle Indian weddings. Learn about this emotional farewell ritual, cultural significance, and how to honor this sacred tradition.",
    author: "Deepika Malhotra",
    date: "2024-08-02",
    image: "/seattle-bride-vidaai-ceremony.jpg",
    imageHint: "vidaai farewell ceremony",
    tags: ["Vidaai Ceremony", "Indian Wedding", "Seattle", "Wedding Traditions", "Farewell Ritual"],
  },
  {
    slug: "south-asian-wedding-seattle",
    title: "Indian Weddings in Seattle: Celebrating Culture in the Pacific Northwest",
    excerpt: "Discover how to plan an authentic Indian wedding in Seattle. From traditional ceremonies to modern celebrations, expert guidance for your multicultural wedding.",
    author: "Meera Kapoor",
    date: "2024-08-01",
    image: "/kaajol-pruthul-wedding-portrait.jpg",
    imageHint: "indian wedding celebration",
    tags: ["Indian Wedding", "Multicultural", "Seattle", "Wedding Traditions"],
  },
  {
    slug: "top-5-seattle-wedding-venues",
    title: "Top 5 Undiscovered Wedding Venues in Seattle",
    excerpt: "Move over, Space Needle! We're unveiling five hidden gems in the Emerald City that offer breathtaking backdrops for your unforgettable day.",
    author: "Soniya Arora",
    date: "2024-07-28",
    image: "/seattle-resort-wedding-hall.jpg",
    imageHint: "wedding venue",
    tags: ["Venues", "Seattle", "Planning"],
  },
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
              <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 bg-clip-text text-transparent leading-normal drop-shadow-sm pb-2">
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
