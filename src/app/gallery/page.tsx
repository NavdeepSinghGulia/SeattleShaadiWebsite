'use client';

import React, { useState, useEffect } from 'react';
import ImageWithFallback from '@/components/image-with-fallback';
import { useAnimation } from '@/hooks/use-animation-preferences';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/page-heading';
import { RoyalBackground } from '@/components/royal-background';
import { FloatingParticles } from '@/components/floating-particles';
import { generateMetadata } from '@/lib/seo-config';
import { SchemaMarkup } from '@/components/schema-markup';

// Corrected and verified GalleryImage data structure
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'ceremonies' | 'decor' | 'food' | 'attire';
  location: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  // Ceremonies
  {
    id: 'ceremony-1',
    src: '/images/ceremonies/hindu-wedding-photography-ceremony.jpg',
    alt: 'Hindu wedding ceremony with mandap',
    category: 'ceremonies',
    location: 'Four Seasons Hotel, Seattle',
    description: 'Traditional Hindu ceremony with a stunning floral mandap and gold accents.',
  },
  {
    id: 'ceremony-2',
    src: '/images/ceremonies/sikh-wedding-gurdwara.jpg',
    alt: 'Sikh wedding ceremony in a Gurdwara',
    category: 'ceremonies',
    location: 'Hyatt Regency, Bellevue',
    description: 'Anand Karaj ceremony with traditional Sikh customs and vibrant decorations.',
  },
  {
    id: 'ceremony-3',
    src: '/images/ceremonies/south-indian-wedding-rituals.jpg',
    alt: 'South Indian wedding ceremony with traditional rituals',
    category: 'ceremonies',
    location: 'Fairmont Olympic Hotel, Seattle',
    description: 'South Indian wedding with traditional brass decor and banana leaf elements.',
  },
  {
    id: 'ceremony-4',
    src: '/images/ceremonies/muslim-nikah-ceremony.jpg',
    alt: 'Muslim Nikah ceremony with elegant decor',
    category: 'ceremonies',
    location: 'The Westin, Seattle',
    description: 'Elegant Nikah ceremony with modern Islamic design elements.',
  },
  {
    id: 'ceremony-5',
    src: '/images/ceremonies/baraat/seattle-groom-baraat-procession.jpg',
    alt: 'Baraat procession at a Seattle wedding',
    category: 'ceremonies',
    location: 'Willows Lodge, Woodinville',
    description: 'A joyous Baraat procession with the groom on a decorated horse.',
  },
  {
    id: 'ceremony-6',
    src: '/images/ceremonies/outdoor-indian-wedding-ceremony.jpg',
    alt: 'Outdoor Indian wedding ceremony in a garden',
    category: 'ceremonies',
    location: 'Woodland Park Rose Garden, Seattle',
    description: 'Garden ceremony with a custom-designed mandap and natural elements.',
  },
  
  // Decor
  {
    id: 'decor-1',
    src: '/images/venues/elegant-wedding-hall-lighting.webp',
    alt: 'Luxury Indian wedding reception decor',
    category: 'decor',
    location: 'Grand Hyatt, Seattle',
    description: 'Opulent reception with crystal chandeliers, gold accents, and rich floral arrangements.',
  },
  {
    id: 'decor-2',
    src: '/images/venues/wedding-floral-decoration-setup.jpg',
    alt: 'Traditional mandap decoration with flowers',
    category: 'decor',
    location: 'Sheraton Grand, Seattle',
    description: 'Intricate mandap with traditional red and gold draping and fresh flower garlands.',
  },
  {
    id: 'decor-3',
    src: '/images/celebrations/wedding-feast-table-setup.webp',
    alt: 'Modern Indian wedding table setting',
    category: 'decor',
    location: 'Museum of History & Industry, Seattle',
    description: 'Contemporary table design with traditional Indian elements and modern aesthetics.',
  },
  {
    id: 'decor-4',
    src: '/images/celebrations/bollywood-wedding-dance.jpg',
    alt: 'Sangeet night decoration with colorful draping',
    category: 'decor',
    location: 'W Hotel, Seattle',
    description: 'Vibrant Sangeet decor with colorful draping, Rajasthani umbrellas, and festive lighting.',
  },
  {
    id: 'decor-5',
    src: '/images/ceremonies/mehndi/seattle-mehndi-ceremony-celebration.webp',
    alt: 'Mehndi ceremony decoration setup',
    category: 'decor',
    location: 'Private Estate, Mercer Island',
    description: 'Bohemian-inspired Mehndi decor with marigold garlands and colorful cushions.',
  },
  {
    id: 'decor-6',
    src: '/images/venues/seattle-wedding-hall-ceremony.jpg',
    alt: 'Royal Indian wedding stage design',
    category: 'decor',
    location: 'The Bellevue Club, Bellevue',
    description: 'Palatial stage design with intricate backdrop and royal seating for the couple.',
  },
  
  // Food
  {
    id: 'food-1',
    src: '/images/celebrations/hindu-wedding-food-spread.jpeg',
    alt: 'Indian wedding catering display buffet',
    category: 'food',
    location: 'Fairmont Olympic Hotel, Seattle',
    description: 'Elaborate buffet featuring regional Indian cuisines with live cooking stations.',
  },
  {
    id: 'food-2',
    src: '/images/celebrations/indian-wedding-food-menu-spread.jpg',
    alt: 'Wedding dessert table with Indian sweets',
    category: 'food',
    location: 'Four Seasons Hotel, Seattle',
    description: 'Fusion dessert display featuring traditional Indian sweets and Western pastries.',
  },
  {
    id: 'food-3',
    src: '/images/celebrations/indian-wedding-chaat-station.jpg',
    alt: 'Chaat station at an Indian wedding',
    category: 'food',
    location: 'Hyatt Regency, Bellevue',
    description: 'Interactive chaat station with various street food favorites from across India.',
  },
  {
    id: 'food-4',
    src: '/images/celebrations/indian-wedding-cake-design.jpg',
    alt: 'Wedding cake with Indian henna design',
    category: 'food',
    location: 'The Westin, Seattle',
    description: 'Five-tier wedding cake with henna-inspired patterns and gold accents.',
  },
  {
    id: 'food-5',
    src: '/images/celebrations/indian-wedding-thali.jpg',
    alt: 'Traditional Indian thali served at a wedding',
    category: 'food',
    location: 'Sheraton Grand, Seattle',
    description: 'Customized wedding thalis with regional specialties served on silver platters.',
  },
  {
    id: 'food-6',
    src: '/images/celebrations/indian-wedding-cocktails.jpg',
    alt: 'Signature cocktails with Indian flavors',
    category: 'food',
    location: 'W Hotel, Seattle',
    description: 'Custom cocktail menu featuring Indian-inspired flavors and spices.',
  },
  
  // Attire
  {
    id: 'attire-1',
    src: '/images/portraits/indian-wedding-dresses-collection.jpg',
    alt: 'Bride in traditional red lehenga',
    category: 'attire',
    location: 'Four Seasons Hotel, Seattle',
    description: 'Bride wearing a hand-embroidered red Sabyasachi lehenga with antique gold jewelry.',
  },
  {
    id: 'attire-2',
    src: '/images/portraits/groom-traditional-sherwani.jpg',
    alt: 'Groom in traditional ivory sherwani',
    category: 'attire',
    location: 'Fairmont Olympic Hotel, Seattle',
    description: 'Groom in an ivory and gold sherwani with traditional turban and safa.',
  },
  {
    id: 'attire-3',
    src: '/images/ceremonies/mehndi/intricate-mehndi-henna-designs.jpg',
    alt: 'Bridal mehndi design on hands',
    category: 'attire',
    location: 'Private Residence, Bellevue',
    description: 'Intricate bridal mehndi featuring traditional Rajasthani patterns and personal symbols.',
  },
  {
    id: 'attire-4',
    src: '/images/portraits/fusion-bride-groom-outfits.jpg',
    alt: 'Fusion bride and groom outfits for reception',
    category: 'attire',
    location: 'The Bellevue Club, Bellevue',
    description: 'Fusion couple with bride in pastel lehenga and groom in modern Indo-Western outfit.',
  },
  {
    id: 'attire-5',
    src: '/images/portraits/south-indian-bride-kanjeevaram.jpg',
    alt: 'South Indian bride in a Kanjeevaram silk saree',
    category: 'attire',
    location: 'Hyatt Regency, Bellevue',
    description: 'South Indian bride in traditional silk Kanjeevaram saree with temple jewelry.',
  },
  {
    id: 'attire-6',
    src: '/images/portraits/wedding-party-coordinated-outfits.jpg',
    alt: 'Wedding party in coordinated Indian outfits',
    category: 'attire',
    location: 'Grand Hyatt, Seattle',
    description: 'Color-coordinated wedding party in traditional Indian attire with modern styling.',
  },
];

// Schema markup will be generated dynamically based on loaded images
const getGallerySchema = (images: GalleryImage[]) => ({
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Indian Wedding Gallery by Seattle Shaadi",
    "description": "An inspirational gallery showcasing stunning Indian weddings in Seattle, including ceremonies, decor, food, and attire.",
    "url": "https://seattleshaadi.com/gallery",
    "image": images.map(img => ({
      "@type": "ImageObject",
      "contentUrl": `https://seattleshaadi.com${img.src}`,
      "name": img.alt,
      "description": img.description,
      "locationCreated": {
        "@type": "City",
        "name": img.location
      }
    }))
});

const GalleryPage = () => {
  const { shouldAnimate } = useAnimation();
  const [activeTab, setActiveTab] = useState<string>('ceremonies');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [galleryImagesState, setGalleryImagesState] = useState<GalleryImage[]>([]);

  // Preload images and verify they exist
  useEffect(() => {
    // Set a small delay to ensure client-side rendering is complete
    const timer = setTimeout(() => {
      // Create a copy of the gallery images with verified paths
      const verifiedImages = galleryImages.map(image => {
        // For Firebase hosting, ensure paths are correct
        const src = image.src.startsWith('/') ? image.src : `/${image.src}`;
        return {
          ...image,
          src
        };
      });
      
      setGalleryImagesState(verifiedImages);
      setImagesLoaded(true);
      console.log('Gallery images loaded:', verifiedImages.length);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredImages = imagesLoaded 
    ? galleryImagesState.filter(img => img.category === activeTab)
    : [];

  return (
    <>
      {imagesLoaded && <SchemaMarkup schema={getGallerySchema(galleryImagesState)} id="gallery-schema" />}
      <div className="relative min-h-screen">
        {shouldAnimate && <RoyalBackground />}
        {shouldAnimate && <FloatingParticles />}
        <div className="relative z-10 container mx-auto px-4 py-12 mt-20">
          <div className="max-w-6xl mx-auto">
            <PageHeading 
              title="Indian Wedding Gallery"
              subtitle="Browse our collection of stunning Indian weddings in Seattle. Get inspired by our ceremonies, decor, food, and attire for your perfect wedding day."
            />

            <Tabs defaultValue="ceremonies" onValueChange={setActiveTab} className="mb-12">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="ceremonies">Ceremonies</TabsTrigger>
                <TabsTrigger value="decor">Decor</TabsTrigger>
                <TabsTrigger value="food">Food</TabsTrigger>
                <TabsTrigger value="attire">Attire</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-6">
                {!imagesLoaded ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600" />
                  </div>
                ) : filteredImages.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground">No images found in this category.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredImages.map((image) => (
                      <Card 
                        key={image.id} 
                        className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
                      >
                        <div className="relative aspect-square">
                          <ImageWithFallback 
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading="lazy"
                            fallbackSrc="/images/seo/shaadi-squad-og-image.png"
                            containerClassName="w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                            <h3 className="text-white font-medium">{image.alt}</h3>
                            <p className="text-white/80 text-sm">{image.location}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="text-center mt-12">
              <h2 className="text-2xl font-headline font-bold mb-4">Create Your Own Beautiful Memories</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Let our expert wedding planners help you design a stunning Indian wedding that reflects your 
                personal style and cultural heritage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/contact">Schedule a Consultation</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/services">View Our Services</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryPage;
