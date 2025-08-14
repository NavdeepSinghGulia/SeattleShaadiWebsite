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
  slug: "south-asian-wedding-seattle",
  title: "Indian Weddings in Seattle: Celebrating Culture in the Pacific Northwest",
  description: "Discover how to plan an authentic Indian wedding in Seattle. From traditional ceremonies to modern celebrations, expert guidance for your multicultural wedding.",
  author: "Meera Kapoor",
  date: "2024-08-01",
  image: "/images/blog/south-asian-wedding-seattle.jpg",
  imageHint: "indian wedding celebration",
  tags: ["Indian Wedding", "Multicultural", "Seattle", "Wedding Traditions"],
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
                items={[{ label: "Blog", href: "/blog" }, { label: "Indian Weddings Seattle" }]} 
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
                        Seattle's vibrant Indian community has created a rich tapestry of wedding traditions that beautifully blend ancient customs with modern Pacific Northwest elegance. As specialists in Indian weddings, we understand the importance of honoring cultural heritage while creating celebrations that reflect contemporary life in the Emerald City.
                    </p>
                    
                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">The Indian Wedding Landscape in Seattle</h2>
                    <p>
                        Seattle's diverse Indian community includes families from many regions, each bringing unique traditions and customs. The city's multicultural environment provides the perfect backdrop for celebrating these rich heritage weddings while embracing modern American wedding elements.
                    </p>
                    
                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Understanding Different Regional Traditions</h3>
                    <p>
                        Indian weddings vary significantly based on regional and religious backgrounds:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>North Indian Weddings:</strong> Elaborate ceremonies with vibrant colors, Bollywood music, and grand celebrations</li>
                        <li><strong>South Indian Weddings:</strong> Traditional rituals with classical music, temple-style decorations, and authentic cuisine</li>
                        <li><strong>Bengali Weddings:</strong> Unique customs like the fish ceremony and distinctive red and white color schemes</li>
                        <li><strong>Punjabi Weddings:</strong> High-energy celebrations with dhol players, bhangra dancing, and lavish feasts</li>
                    </ul>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Planning Multi-Day Celebrations</h2>
                    <p>
                        Indian weddings are typically multi-day affairs, each event requiring careful coordination and cultural sensitivity. Here's how we approach planning these elaborate celebrations in Seattle:
                    </p>
                    
                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Pre-Wedding Events</h3>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden my-6">
                        <Image src="/images/ceremonies/mehndi/charlotte-mehndi-ceremony-bride.jpg" alt="Mehendi ceremony" data-ai-hint="henna ceremony" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 896px" loading="lazy"/>
                    </div>
                    <p>
                        <strong>Engagement and Ring Ceremonies:</strong> Seattle's upscale venues like the Fairmont Olympic Hotel provide elegant settings for formal engagement announcements and ring exchanges.
                    </p>
                    <p>
                        <strong>Mehendi/Henna Parties:</strong> Intimate gatherings where intricate henna designs are applied. Seattle's indoor venues work perfectly for these extended celebrations, especially during the rainy season.
                    </p>
                    <p>
                        <strong>Sangeet Nights:</strong> Musical celebrations featuring family performances and professional entertainment. Seattle's diverse entertainment scene offers authentic musicians, dancers, and DJs specializing in Indian music.
                    </p>

                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Wedding Day Ceremonies</h3>
                    <p>
                        <strong>Morning Rituals:</strong> Traditional ceremonies like Haldi (turmeric ceremony) and Chooda (bangle ceremony) require intimate spaces with good natural light for photography.
                    </p>
                    <p>
                        <strong>Baraat Procession:</strong> The groom's ceremonial arrival is a highlight of Indian weddings. Seattle's streets provide unique opportunities for memorable processions, from downtown routes to waterfront paths.
                    </p>
                    <p>
                        <strong>Ceremony and Reception:</strong> The sacred wedding ceremony followed by elaborate celebrations. Seattle venues can accommodate both traditional mandap setups and modern reception requirements.
                    </p>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Venue Selection for Indian Weddings</h2>
                    
                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Large Capacity Venues</h3>
                    <p>
                        Indian weddings often involve large guest lists. Seattle offers several venues that can accommodate 300+ guests:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Bell Harbor International Conference Center:</strong> Waterfront location with flexible spaces for multiple events</li>
                        <li><strong>Seattle Center Exhibition Hall:</strong> Large capacity with customizable layouts</li>
                        <li><strong>Hyatt Regency Bellevue:</strong> Luxury hotel with multiple ballrooms and Indian wedding experience</li>
                        <li><strong>The Westin Seattle:</strong> Downtown location with elegant ballrooms and city views</li>
                    </ul>

                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Outdoor and Garden Venues</h3>
                    <p>
                        For couples seeking natural beauty for their ceremonies:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Volunteer Park Conservatory:</strong> Tropical greenhouse setting perfect for intimate ceremonies</li>
                        <li><strong>Washington Park Arboretum:</strong> Diverse landscapes for stunning photography</li>
                        <li><strong>Snoqualmie Falls:</strong> Dramatic waterfall backdrop for adventurous couples</li>
                        <li><strong>Chateau Lill:</strong> Vineyard setting in nearby Woodinville</li>
                    </ul>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden my-6">
                        <Image src="/images/venues/traditional-phere-ceremony-hall.jpg" alt="Outdoor mandap ceremony" data-ai-hint="outdoor wedding ceremony" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 896px" loading="lazy"/>
                    </div>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Cultural Elements and Decorations</h2>
                    
                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Traditional Mandap Design</h3>
                    <p>
                        The wedding mandap is the sacred altar where the ceremony takes place. In Seattle, we work with skilled decorators who understand the spiritual significance while creating visually stunning setups:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Four-pillar structures representing the four parents</li>
                        <li>Floral arrangements using traditional marigolds, roses, and local Pacific Northwest flowers</li>
                        <li>Fabric draping in auspicious colors</li>
                        <li>Sacred fire setup for Agni (fire ceremony)</li>
                    </ul>

                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Color Schemes and Themes</h3>
                    <p>
                        Indian weddings are known for their vibrant colors:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Traditional Red and Gold:</strong> Classic combination symbolizing prosperity and purity</li>
                        <li><strong>Royal Purple and Gold:</strong> Elegant and regal for evening celebrations</li>
                        <li><strong>Pink and Orange:</strong> Bright and joyful for daytime events</li>
                        <li><strong>Maroon and Cream:</strong> Sophisticated palette for modern couples</li>
                    </ul>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Catering and Cuisine</h2>
                    <p>
                        Seattle's diverse culinary scene includes excellent Indian caterers who understand the importance of authentic flavors and dietary requirements:
                    </p>
                    
                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Traditional Menu Options</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>North Indian Cuisine:</strong> Butter chicken, biryani, naan, and rich gravies</li>
                        <li><strong>South Indian Specialties:</strong> Dosas, sambar, rasam, and coconut-based dishes</li>
                        <li><strong>Vegetarian Options:</strong> Extensive plant-based menus respecting dietary restrictions</li>
                        <li><strong>Street Food Stations:</strong> Chaat, samosas, and other popular snacks</li>
                        <li><strong>Fusion Elements:</strong> Indo-Chinese dishes and modern interpretations</li>
                    </ul>

                    <h3 className="font-headline text-2xl text-primary/80 mt-8 mb-3">Dietary Considerations</h3>
                    <p>
                        Indian weddings often involve complex dietary requirements:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Strict vegetarian options for religious observances</li>
                        <li>Halal preparations for Muslim guests</li>
                        <li>Jain dietary restrictions (no root vegetables)</li>
                        <li>Gluten-free and vegan alternatives</li>
                    </ul>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Music and Entertainment</h2>
                    <p>
                        Seattle's entertainment scene offers authentic Indian performers:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Classical Musicians:</strong> Sitar, tabla, and vocal artists for ceremony music</li>
                        <li><strong>Bollywood DJs:</strong> Specialists in mixing traditional and contemporary music</li>
                        <li><strong>Dance Performers:</strong> Classical Indian dance troupes and Bollywood choreographers</li>
                        <li><strong>Dhol Players:</strong> Traditional drummers for baraat processions</li>
                        <li><strong>Live Bands:</strong> Fusion groups combining Eastern and Western instruments</li>
                    </ul>

                    <blockquote className="border-l-4 border-primary pl-4 italic my-8">
                        "An Indian wedding is not just a celebration of two individuals, but a joyous union of families, traditions, and communities. In Seattle, we have the unique opportunity to honor our heritage while embracing the beauty of our adopted home."
                    </blockquote>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Photography and Videography</h2>
                    <p>
                        Indian weddings require photographers who understand the cultural significance of various rituals:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Experience with multi-day celebrations</li>
                        <li>Understanding of important ceremonial moments</li>
                        <li>Ability to work in various lighting conditions</li>
                        <li>Sensitivity to religious and cultural customs</li>
                        <li>Knowledge of family dynamics and group photography</li>
                    </ul>

                    <h2 className="font-headline text-3xl text-primary mt-12 mb-4">Working with Seattle's Indian Community</h2>
                    <p>
                        Seattle's established Indian community provides excellent resources:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Religious Centers:</strong> Temples, gurdwaras, and mosques for ceremony venues</li>
                        <li><strong>Cultural Organizations:</strong> Groups that can provide traditional performers and vendors</li>
                        <li><strong>Specialty Shops:</strong> Stores for traditional attire, jewelry, and decorations</li>
                        <li><strong>Community Networks:</strong> Connections to authentic vendors and service providers</li>
                    </ul>

                    <p>
                        Ready to plan your dream Indian wedding in Seattle? <Link href="/contact" className="text-primary font-bold hover:underline">Contact Seattle Shaadi today</Link>, and let our culturally-aware team help you create a celebration that honors your traditions while embracing the beauty of the Pacific Northwest.
                    </p>
                </div>
            </AnimatedDiv>
          </article>
        </div>
      </div>
    </>
  );
}
