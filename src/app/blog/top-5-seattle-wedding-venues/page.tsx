import Image from 'next/image';
import Link from 'next/link';
import { AnimatedDiv } from '@/components/animated-div';
import { RoyalBackground } from '@/components/royal-background';
import { FloatingParticles } from '@/components/floating-particles';
import { ShimmerEffect } from '@/components/shimmer-effect';
import { generateMetadata } from "@/lib/seo-config";
import { SchemaMarkup } from '@/components/schema-markup';
import { generateArticleSchema } from '@/lib/schema';
import { Breadcrumb, BreadcrumbStructuredData } from "@/components/breadcrumb";
import type { Metadata } from 'next';

const post = {
  slug: "top-5-seattle-wedding-venues",
  title: "Top 5 Undiscovered Wedding Venues in Seattle",
  description: "Discover Seattle's hidden gems. We unveil 5 unique, breathtaking wedding venues beyond the usual choices, perfect for a memorable South Asian wedding celebration.",
  author: "Soniya Arora",
  date: "2024-07-28",
  image: "/images/venues/seattle-resort-wedding-hall.jpg",
  imageHint: "seattle skyline",
  tags: ["Venues", "Seattle", "Planning"],
};

export const metadata: Metadata = generateMetadata({
  title: post.title,
  description: post.description,
  pathname: `/blog/${post.slug}`,
  image: post.image,
});

const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    authorName: post.author,
    image: post.image,
    url: `/blog/${post.slug}`
});

export default function BlogPostPage() {
  return (
    <>
      <SchemaMarkup schema={articleSchema} id="blog-article" />
      <div className="relative min-h-screen">
        <RoyalBackground />
        <FloatingParticles />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <article className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
               <Breadcrumb 
                items={[{ label: "Blog", href: "/blog" }, { label: "Top 5 Seattle Venues" }]} 
                className="justify-center mb-8"
              />
              <BreadcrumbStructuredData items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

              <AnimatedDiv animation="royalEntrance">
                <ShimmerEffect>
                  <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 bg-clip-text text-transparent leading-tight drop-shadow-sm pb-2">
                    {post.title}
                  </h1>
                </ShimmerEffect>
              </AnimatedDiv>
              <AnimatedDiv delay={300} animation="fadeInScale">
                <p className="mt-4 text-muted-foreground text-lg">
                  Posted on {post.date} by {post.author}
                </p>
              </AnimatedDiv>
            </header>

            <AnimatedDiv delay={500} animation="fadeInScale">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl mb-12 border border-primary/20">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        sizes="(max-width: 768px) 100vw, 896px"
                        data-ai-hint={post.imageHint}
                    />
                </div>
            </AnimatedDiv>

            <AnimatedDiv delay={700} animation="fadeInScale">
                <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
                    <p className="lead">
                        Planning a wedding in the Emerald City? While the iconic Space Needle and waterfront piers are popular choices, Seattle is brimming with unique, undiscovered venues that can provide an unforgettable backdrop for your celebration. As experts in crafting regal South Asian weddings, we're sharing five of our favorite hidden gems.
                    </p>
                    
                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">1. The Admiral's House</h2>
                    <p>
                        Perched in Magnolia with sweeping views of the city skyline and Elliott Bay, this historic home offers unparalleled privacy and elegance. Its beautifully manicured gardens are perfect for an intimate outdoor ceremony, while the grand interiors provide a sophisticated setting for a reception.
                    </p>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden my-6">
                        <Image src="/images/venues/seattle-wedding-hall-ceremony.jpg" alt="The Admiral's House" data-ai-hint="historic mansion" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 896px" loading="lazy"/>
                    </div>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">2. Fremont Foundry</h2>
                    <p>
                        For a chic, industrial vibe, look no further than the Fremont Foundry. This versatile space combines rustic charm with modern amenities, featuring a stunning glass-enclosed rooftop terrace perfect for a cocktail hour with city views. Its spacious atrium can be transformed to suit any wedding theme, from minimalist to opulent.
                    </p>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">3. The Corson Building</h2>
                    <p>
                        Nestled in Georgetown, The Corson Building feels like a secret European villa. With its lush gardens, charming patio, and intimate dining room, it's an ideal choice for couples seeking a romantic, food-focused celebration. The venue is renowned for its farm-to-table dining experiences, making it a true culinary destination.
                    </p>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden my-6">
                        <Image src="/images/venues/traditional-phere-ceremony-hall.jpg" alt="The Corson Building" data-ai-hint="italian villa" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 896px" loading="lazy"/>
                    </div>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">4. The Center for Wooden Boats</h2>
                    <p>
                        Located on the shores of Lake Union, this venue offers a quintessential Pacific Northwest experience. Exchange vows on a dock with the city skyline as your backdrop, or host your reception in a gallery surrounded by beautiful historic boats. It’s a unique and memorable choice for nautical-loving couples.
                    </p>
                    
                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">5. WithinSodo</h2>
                    <p>
                        An incredibly flexible and stylish venue in the Sodo district, WithinSodo boasts a multi-level layout that includes a modern loft, a spacious ground floor, and a stunning rooftop deck with a fireplace. The ability to use different spaces for various parts of your event (ceremony, cocktails, reception) makes it a dynamic and exciting option.
                    </p>

                    <blockquote className="border-l-4 border-primary pl-4 italic my-8">
                        Choosing the right venue is the foundation of your wedding's story. These hidden gems offer a chance to create a truly personal and unforgettable narrative for you and your guests.
                    </blockquote>

                    <p>
                        Ready to explore one of these stunning venues? <Link href="/contact" className="text-primary font-bold hover:underline">Contact Seattle Shaadi today</Link>, and let's start planning the first chapter of your forever.
                    </p>
                </div>
            </AnimatedDiv>
          </article>
        </div>
      </div>
    </>
  );
}
