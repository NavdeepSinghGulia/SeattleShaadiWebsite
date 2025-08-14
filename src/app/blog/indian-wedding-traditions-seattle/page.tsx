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
import { PageHeading } from '@/components/page-heading';
import type { Metadata } from 'next';

const post = {
  slug: "indian-wedding-traditions-seattle",
  title: "Honoring Indian Wedding Traditions in Seattle: A Complete Guide",
  description: "Discover how to beautifully blend traditional Indian wedding customs with modern Seattle celebrations. Expert tips for authentic ceremonies, rituals, and cultural elements.",
  author: "Priya Sharma",
  date: "2024-08-05",
  image: "/images/blog/indian-wedding-traditions-seattle.jpg",
  imageHint: "indian wedding ceremony",
  tags: ["Indian Weddings", "Traditions", "Seattle", "Cultural"],
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
            <header>
               <Breadcrumb 
                items={[{ label: "Blog", href: "/blog" }, { label: "Indian Wedding Traditions" }]} 
                className="justify-center mb-8"
              />
              <BreadcrumbStructuredData items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

              <PageHeading 
                title={post.title}
                subtitle={`Posted on ${post.date} by ${post.author}`}
                subtitleClassName="text-muted-foreground"
              />
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
                        Planning an Indian wedding in Seattle offers a unique opportunity to blend rich cultural traditions with the Pacific Northwest's natural beauty. As Seattle's premier Indian wedding planners, we understand the importance of honoring sacred customs while creating a celebration that reflects your personal style.
                    </p>
                    
                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Pre-Wedding Ceremonies: Setting the Sacred Foundation</h2>
                    <p>
                        Indian weddings are renowned for their elaborate pre-wedding rituals, each carrying deep spiritual significance. In Seattle, we help families adapt these beautiful traditions to local venues while maintaining their authentic essence.
                    </p>
                    
                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Engagement (Sagai) and Ring Ceremony</h3>
                    <p>
                        The formal engagement ceremony marks the beginning of the wedding journey. Seattle's stunning waterfront venues like the Bell Harbor International Conference Center provide an elegant backdrop for this intimate gathering where families exchange gifts and blessings.
                    </p>

                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Mehendi Ceremony</h3>
                    <p>
                        The mehendi ceremony is a joyous celebration where intricate henna designs adorn the bride's hands and feet. Seattle's indoor venues work perfectly for this tradition, especially during the rainy season. We recommend venues with natural light and comfortable seating for the extended application process.
                    </p>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden my-6">
                        <Image src="https://placehold.co/800x450.png" alt="Mehendi ceremony" data-ai-hint="henna application" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 896px" loading="lazy"/>
                    </div>

                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Sangeet Night</h3>
                    <p>
                        The sangeet is a musical celebration where both families come together for dancing and performances. Seattle's diverse venue options, from historic ballrooms to modern event spaces, provide the perfect setting for this high-energy celebration.
                    </p>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">The Wedding Day: Sacred Rituals and Celebrations</h2>
                    
                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Baraat: The Groom's Grand Entrance</h3>
                    <p>
                        The baraat procession is a spectacular display of joy and celebration. In Seattle, we've organized memorable baraats through downtown streets, waterfront areas, and even ferry rides across Puget Sound. The key is coordinating with local authorities and choosing routes that showcase Seattle's beauty.
                    </p>

                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Mandap Ceremony</h3>
                    <p>
                        The sacred mandap represents the universe and serves as the altar for the wedding ceremony. Seattle's outdoor venues like the Washington Park Arboretum or Volunteer Park offer stunning natural backdrops, while indoor spaces can be transformed with elaborate floral arrangements and traditional decorations.
                    </p>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden my-6">
                        <Image src="https://placehold.co/800x450.png" alt="Wedding mandap" data-ai-hint="indian wedding altar" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 896px" loading="lazy"/>
                    </div>

                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Seven Sacred Vows (Saptapadi)</h3>
                    <p>
                        The saptapadi, where the couple takes seven steps together, is the most sacred part of the Hindu wedding ceremony. Each step represents a vow for their married life. We ensure this ritual is conducted with proper reverence while accommodating photography and guest viewing.
                    </p>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Adapting Traditions to Seattle's Climate</h2>
                    <p>
                        Seattle's unique climate requires thoughtful planning for outdoor ceremonies. We recommend:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Covered mandap structures for unpredictable weather</li>
                        <li>Indoor backup plans for all outdoor events</li>
                        <li>Seasonal flower selections that thrive in the Pacific Northwest</li>
                        <li>Timing ceremonies to take advantage of Seattle's beautiful summer months</li>
                    </ul>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Incorporating Local Elements</h2>
                    <p>
                        Seattle's multicultural environment allows for beautiful fusion elements:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Pacific Northwest flowers like dahlias and roses in traditional garlands</li>
                        <li>Local musicians who understand Indian classical music</li>
                        <li>Fusion menus featuring both traditional Indian cuisine and Pacific Northwest specialties</li>
                        <li>Photography that captures both cultural traditions and Seattle's iconic skyline</li>
                    </ul>

                    <blockquote className="border-l-4 border-primary pl-4 italic my-8">
                        "A wedding is not just a union of two people, but a celebration of two families, two cultures, and countless traditions that have been passed down through generations."
                    </blockquote>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Working with Seattle Vendors</h2>
                    <p>
                        Seattle's diverse vendor community includes many professionals experienced in Indian weddings:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Specialized Indian caterers who understand dietary restrictions and traditional preparations</li>
                        <li>Florists familiar with marigolds, roses, and other traditional wedding flowers</li>
                        <li>Musicians and DJs with extensive Bollywood and classical Indian music libraries</li>
                        <li>Photographers experienced in capturing the nuances of Indian wedding ceremonies</li>
                    </ul>

                    <p>
                        Ready to plan your dream Indian wedding in Seattle? <Link href="/contact" className="text-primary font-bold hover:underline">Contact Seattle Shaadi today</Link>, and let us help you create a celebration that honors your traditions while embracing the beauty of the Pacific Northwest.
                    </p>
                </div>
            </AnimatedDiv>
          </article>
        </div>
      </div>
    </>
  );
}
