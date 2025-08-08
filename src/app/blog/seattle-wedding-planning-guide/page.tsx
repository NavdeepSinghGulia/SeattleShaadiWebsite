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
  slug: "seattle-wedding-planning-guide",
  title: "The Ultimate Seattle Wedding Planning Guide: From Emerald City to 'I Do'",
  description: "Complete guide to planning your dream wedding in Seattle. Expert tips on venues, vendors, timing, and making the most of the Pacific Northwest's natural beauty.",
  author: "Rajesh Patel",
  date: "2024-08-03",
  image: "https://placehold.co/1200x630.png",
  imageHint: "seattle skyline wedding",
  tags: ["Wedding Planning", "Seattle", "Guide", "Pacific Northwest"],
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
                items={[{ label: "Blog", href: "/blog" }, { label: "Seattle Wedding Planning Guide" }]} 
                className="justify-center mb-8"
              />
              <BreadcrumbStructuredData items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

              <AnimatedDiv animation="royalEntrance">
                <ShimmerEffect>
                  <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 bg-clip-text text-transparent leading-tight drop-shadow-sm">
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
                        Seattle's breathtaking natural beauty, vibrant cultural scene, and world-class venues make it one of the most sought-after wedding destinations in the Pacific Northwest. Whether you're planning an intimate ceremony or a grand celebration, the Emerald City offers endless possibilities for your special day.
                    </p>
                    
                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Understanding Seattle's Wedding Seasons</h2>
                    <p>
                        Seattle's unique climate plays a crucial role in wedding planning. Here's what you need to know about each season:
                    </p>
                    
                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Summer (June - September): Peak Wedding Season</h3>
                    <p>
                        Summer is Seattle's golden season for weddings. With minimal rainfall and temperatures in the 70s-80s, it's perfect for outdoor ceremonies. However, this popularity means:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Higher venue costs and limited availability</li>
                        <li>Book 12-18 months in advance</li>
                        <li>Stunning natural light for photography</li>
                        <li>Perfect for waterfront and garden venues</li>
                    </ul>

                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Fall (October - November): Romantic and Cozy</h3>
                    <p>
                        Fall weddings in Seattle offer beautiful autumn colors and crisp air. The changing leaves create a romantic backdrop, though you'll need indoor backup plans for potential rain.
                    </p>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden my-6">
                        <Image src="https://placehold.co/800x450.png" alt="Fall wedding in Seattle" data-ai-hint="autumn wedding" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 896px" loading="lazy"/>
                    </div>

                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Winter (December - February): Intimate and Elegant</h3>
                    <p>
                        Winter weddings offer lower costs and unique charm. Seattle's mild winters (rarely below freezing) make it feasible, with cozy indoor venues and dramatic lighting opportunities.
                    </p>

                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Spring (March - May): Fresh and Vibrant</h3>
                    <p>
                        Spring brings blooming flowers and moderate temperatures, though rain is common. It's an excellent time for indoor venues with garden views and spring flower arrangements.
                    </p>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Choosing the Perfect Seattle Wedding Venue</h2>
                    
                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Waterfront Venues</h3>
                    <p>
                        Seattle's waterfront locations offer stunning views of Puget Sound, the Olympic Mountains, and the city skyline:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Bell Harbor International Conference Center:</strong> Panoramic water views with professional event services</li>
                        <li><strong>The Edgewater Hotel:</strong> Unique overwater location with rustic elegance</li>
                        <li><strong>Salty's on Alki Beach:</strong> Casual waterfront dining with Seattle skyline views</li>
                        <li><strong>Shilshole Bay Beach Club:</strong> Private beach club with marina views</li>
                    </ul>

                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Garden and Park Venues</h3>
                    <p>
                        Seattle's abundant green spaces provide natural beauty for outdoor ceremonies:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Volunteer Park Conservatory:</strong> Victorian greenhouse with tropical plants</li>
                        <li><strong>Washington Park Arboretum:</strong> 230 acres of diverse plant collections</li>
                        <li><strong>Kubota Garden:</strong> 20-acre Japanese garden with serene landscapes</li>
                        <li><strong>Golden Gardens Park:</strong> Beach setting with mountain and water views</li>
                    </ul>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden my-6">
                        <Image src="https://placehold.co/800x450.png" alt="Seattle garden wedding" data-ai-hint="garden ceremony" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 896px" loading="lazy"/>
                    </div>

                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Historic and Unique Venues</h3>
                    <p>
                        Seattle's rich history offers distinctive venues with character:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>The Fairmont Olympic Hotel:</strong> Luxury and elegance in downtown Seattle</li>
                        <li><strong>Museum of Flight:</strong> Aviation-themed venue with unique aircraft displays</li>
                        <li><strong>Chihuly Garden and Glass:</strong> Artistic venue with stunning glass installations</li>
                        <li><strong>The Arctic Club Seattle:</strong> Historic hotel with distinctive architecture</li>
                    </ul>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Seattle Wedding Vendor Selection</h2>
                    
                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Photography and Videography</h3>
                    <p>
                        Seattle's dramatic landscapes and changing light conditions require experienced photographers who understand the local environment. Look for professionals who specialize in:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Outdoor and natural light photography</li>
                        <li>Weather contingency planning</li>
                        <li>Knowledge of Seattle's best photo locations</li>
                        <li>Experience with diverse cultural celebrations</li>
                    </ul>

                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Catering and Cuisine</h3>
                    <p>
                        Seattle's culinary scene offers incredible diversity. Consider these local specialties:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Pacific Northwest Seafood:</strong> Fresh salmon, Dungeness crab, and oysters</li>
                        <li><strong>Farm-to-Table Options:</strong> Locally sourced ingredients from Washington farms</li>
                        <li><strong>International Cuisine:</strong> Reflecting Seattle's diverse population</li>
                        <li><strong>Coffee Culture:</strong> Specialty coffee bars and dessert pairings</li>
                    </ul>

                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Floral Design</h3>
                    <p>
                        Seattle's flower markets and local growers provide abundant options:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Seasonal Pacific Northwest flowers (dahlias, roses, peonies)</li>
                        <li>Evergreen elements for year-round appeal</li>
                        <li>Sustainable and locally-sourced arrangements</li>
                        <li>Weather-resistant options for outdoor events</li>
                    </ul>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Transportation and Logistics</h2>
                    <p>
                        Seattle's geography requires careful transportation planning:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Traffic Considerations:</strong> Plan around rush hours and major events</li>
                        <li><strong>Parking:</strong> Arrange valet or shuttle services for downtown venues</li>
                        <li><strong>Ferry Transportation:</strong> Unique options for island or waterfront venues</li>
                        <li><strong>Weather Contingencies:</strong> Indoor alternatives for guest comfort</li>
                    </ul>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Budget Planning for Seattle Weddings</h2>
                    <p>
                        Seattle wedding costs vary significantly by season and venue type:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Peak Season Premium:</strong> Summer weddings cost 20-30% more</li>
                        <li><strong>Venue Costs:</strong> Range from $3,000-$15,000+ depending on location and amenities</li>
                        <li><strong>Vendor Rates:</strong> Generally higher than national averages due to demand</li>
                        <li><strong>Hidden Costs:</strong> Weather contingencies, transportation, and permits</li>
                    </ul>

                    <blockquote className="border-l-4 border-primary pl-4 italic my-8">
                        "Seattle weddings are about embracing the natural beauty around you while creating a celebration that reflects your unique love story. The key is planning for the unexpected while staying true to your vision."
                    </blockquote>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Timeline for Seattle Wedding Planning</h2>
                    <p>
                        <strong>12-18 Months Before:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Set date and budget</li>
                        <li>Book venue and major vendors</li>
                        <li>Send save-the-dates</li>
                    </ul>

                    <p className="mt-6">
                        <strong>6-9 Months Before:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Finalize guest list and send invitations</li>
                        <li>Order wedding attire</li>
                        <li>Plan menu and tastings</li>
                    </ul>

                    <p className="mt-6">
                        <strong>3-6 Months Before:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Finalize details with all vendors</li>
                        <li>Obtain necessary permits</li>
                        <li>Plan weather contingencies</li>
                    </ul>

                    <p>
                        Ready to start planning your dream Seattle wedding? <Link href="/contact" className="text-primary font-bold hover:underline">Contact Seattle Shaadi today</Link>, and let our expert team guide you through every step of creating your perfect Pacific Northwest celebration.
                    </p>
                </div>
            </AnimatedDiv>
          </article>
        </div>
      </div>
    </>
  );
}
