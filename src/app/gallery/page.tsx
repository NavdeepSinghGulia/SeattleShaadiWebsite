'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Seo } from '@/components/seo';
import { RoyalBackground } from '@/components/royal-background';
import { useAnimation } from '@/hooks/use-animation-preferences';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  location: string;
  description: string;
}

// Sample gallery data - in production, this would come from a CMS or API
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
    src: '/images/ceremonies/mehndi/charlotte-mehndi-ceremony-bride.jpg',
    alt: 'Sikh wedding ceremony',
    category: 'ceremonies',
    location: 'Hyatt Regency, Bellevue',
    description: 'Anand Karaj ceremony with traditional Sikh customs and vibrant decorations.',
  },
  {
    id: 'ceremony-3',
    src: '/images/ceremonies/baraat/traditional-baraat-procession-celebration.jpg',
    alt: 'South Indian wedding ceremony',
    category: 'ceremonies',
    location: 'Fairmont Olympic Hotel, Seattle',
    description: 'South Indian wedding with traditional brass decor and banana leaf elements.',
  },
  {
    id: 'ceremony-4',
    src: '/images/ceremonies/vidaai/seattle-bride-vidaai-ceremony.jpg',
    alt: 'Muslim Nikah ceremony',
    category: 'ceremonies',
    location: 'The Westin, Seattle',
    description: 'Elegant Nikah ceremony with modern Islamic design elements.',
  },
  {
    id: 'ceremony-5',
    src: '/images/ceremonies/haldi/indian-bride-haldi-ceremony.jpg',
    alt: 'Fusion wedding ceremony',
    category: 'ceremonies',
    location: 'Willows Lodge, Woodinville',
    description: 'Indo-American fusion ceremony blending Hindu and Western traditions.',
  },
  {
    id: 'ceremony-6',
    src: '/images/ceremonies/mehndi/intricate-mehndi-henna-designs.jpg',
    alt: 'Outdoor Indian wedding ceremony',
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
    alt: 'Traditional mandap decoration',
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
    alt: 'Sangeet night decoration',
    category: 'decor',
    location: 'W Hotel, Seattle',
    description: 'Vibrant Sangeet decor with colorful draping, Rajasthani umbrellas, and festive lighting.',
  },
  {
    id: 'decor-5',
    src: '/images/celebrations/indian-wedding-food-menu-spread.jpg',
    alt: 'Mehndi ceremony decoration',
    category: 'decor',
    location: 'Private Estate, Mercer Island',
    description: 'Bohemian-inspired Mehndi decor with marigold garlands and colorful cushions.',
  },
  {
    id: 'decor-6',
    src: '/images/venues/seattle-wedding-hall-ceremony.jpg',
    alt: 'Royal Indian wedding stage',
    category: 'decor',
    location: 'The Bellevue Club, Bellevue',
    description: 'Palatial stage design with intricate backdrop and royal seating for the couple.',
  },
  
  // Food
  {
    id: 'food-1',
    src: '/images/celebrations/hindu-wedding-food-spread.jpeg',
    alt: 'Indian wedding catering display',
    category: 'food',
    location: 'Fairmont Olympic Hotel, Seattle',
    description: 'Elaborate buffet featuring regional Indian cuisines with live cooking stations.',
  },
  {
    id: 'food-2',
    src: '/images/celebrations/indian-wedding-food-menu-spread.jpg',
    alt: 'Wedding dessert table',
    category: 'food',
    location: 'Four Seasons Hotel, Seattle',
    description: 'Fusion dessert display featuring traditional Indian sweets and Western pastries.',
  },
  {
    id: 'food-3',
    src: '/images/venues/seattle-wedding-garden-lawns.jpg',
    alt: 'Chaat station',
    category: 'food',
    location: 'Hyatt Regency, Bellevue',
    description: 'Interactive chaat station with various street food favorites from across India.',
  },
  {
    id: 'food-4',
    src: '/images/portraits/bride-groom-wedding-decor.jpg',
    alt: 'Wedding cake with Indian design',
    category: 'food',
    location: 'The Westin, Seattle',
    description: 'Five-tier wedding cake with henna-inspired patterns and gold accents.',
  },
  {
    id: 'food-5',
    src: '/images/portraits/bride-groom-dance-celebration.jpg',
    alt: 'Traditional Indian thali',
    category: 'food',
    location: 'Sheraton Grand, Seattle',
    description: 'Customized wedding thalis with regional specialties served on silver platters.',
  },
  {
    id: 'food-6',
    src: '/images/venues/traditional-phere-ceremony-hall.jpg',
    alt: 'Signature cocktails',
    category: 'food',
    location: 'W Hotel, Seattle',
    description: 'Custom cocktail menu featuring Indian-inspired flavors and spices.',
  },
  
  // Attire
  {
    id: 'attire-1',
    src: '/images/portraits/indian-wedding-dresses-collection.jpg',
    alt: 'Bride in traditional lehenga',
    category: 'attire',
    location: 'Four Seasons Hotel, Seattle',
    description: 'Bride wearing a hand-embroidered red Sabyasachi lehenga with antique gold jewelry.',
  },
  {
    id: 'attire-2',
    src: '/images/portraits/kaajol-pruthul-wedding-portrait.jpg',
    alt: 'Groom in traditional sherwani',
    category: 'attire',
    location: 'Fairmont Olympic Hotel, Seattle',
    description: 'Groom in an ivory and gold sherwani with traditional turban and safa.',
  },
  {
    id: 'attire-3',
    src: '/images/portraits/bride-celebration-dance.jpeg',
    alt: 'Bridal mehndi design',
    category: 'attire',
    location: 'Private Residence, Bellevue',
    description: 'Intricate bridal mehndi featuring traditional Rajasthani patterns and personal symbols.',
  },
  {
    id: 'attire-4',
    src: '/images/portraits/sarita-souvik-wedding-portrait.jpg',
    alt: 'Fusion bride and groom outfits',
    category: 'attire',
    location: 'The Bellevue Club, Bellevue',
    description: 'Fusion couple with bride in pastel lehenga and groom in modern Indo-Western outfit.',
  },
  {
    id: 'attire-5',
    src: '/images/portraits/bride-groom-ceremony-moment.jpg',
    alt: 'South Indian bride in Kanjeevaram',
    category: 'attire',
    location: 'Hyatt Regency, Bellevue',
    description: 'South Indian bride in traditional silk Kanjeevaram saree with temple jewelry.',
  },
  {
    id: 'attire-6',
    src: '/images/portraits/groom-bride-sagai-engagement.jpg',
    alt: 'Wedding party in coordinated outfits',
    category: 'attire',
    location: 'Grand Hyatt, Seattle',
    description: 'Color-coordinated wedding party in traditional Indian attire with modern styling.',
  },
];

const GalleryPage = () => {
  const { shouldAnimate } = useAnimation();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (!selectedImage) return;
    
    const currentCategory = selectedImage.category;
    const categoryImages = galleryImages.filter(img => img.category === currentCategory);
    const currentIndex = categoryImages.findIndex(img => img.id === selectedImage.id);
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % categoryImages.length;
    } else {
      newIndex = (currentIndex - 1 + categoryImages.length) % categoryImages.length;
    }
    
    const newImage = categoryImages[newIndex];
    if (newImage) {
      setSelectedImage(newImage);
    }
  };

  // Render actual images with Next/Image

  return (
    <>
      <Seo 
        title="Indian Wedding Gallery | Inspiration for Your Special Day" 
        description="Browse our gallery of stunning Indian weddings in Seattle. Get inspiration for ceremonies, decor, food, and attire for your perfect Indian wedding."
      />
      <div className="flex flex-col relative min-h-screen">
        {shouldAnimate && <RoyalBackground />}
        <div className="relative z-10 container mx-auto px-4 py-12 mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
                Indian Wedding Gallery
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Browse our collection of stunning Indian weddings in Seattle. Get inspired by our 
                ceremonies, decor, food, and attire for your perfect wedding day.
              </p>
            </div>

            <Tabs defaultValue="ceremonies" className="mb-12">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="ceremonies">Ceremonies</TabsTrigger>
                <TabsTrigger value="decor">Decor</TabsTrigger>
                <TabsTrigger value="food">Food</TabsTrigger>
                <TabsTrigger value="attire">Attire</TabsTrigger>
              </TabsList>
              
              {['ceremonies', 'decor', 'food', 'attire'].map((category) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages
                      .filter(img => img.category === category)
                      .map((image) => (
                        <Card 
                          key={image.id} 
                          className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => openLightbox(image)}
                        >
                          <div className="relative">
                            <Image 
                              src={image.src}
                              alt={image.alt}
                              width={800}
                              height={800}
                              className="w-full h-auto object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                              <h3 className="text-white font-medium">{image.alt}</h3>
                              <p className="text-white/80 text-sm">{image.location}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
              <DialogContent className="max-w-5xl p-0 bg-black/90 border-none">
                <div className="relative">
                  <button 
                    className="absolute top-4 right-4 z-50 bg-black/50 rounded-full p-2 text-white hover:bg-black/80 transition-colors"
                    onClick={closeLightbox}
                  >
                    <X className="h-6 w-6" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="md:col-span-2 relative aspect-square md:aspect-auto">
                      {selectedImage && (
                        <>
                          <Image 
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            width={1200}
                            height={1200}
                            className="w-full h-auto object-contain"
                            sizes="100vw"
                            loading="eager"
                          />
                          
                          <button 
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/80 transition-colors"
                            onClick={() => navigateImage('prev')}
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </button>
                          
                          <button 
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/80 transition-colors"
                            onClick={() => navigateImage('next')}
                          >
                            <ChevronRight className="h-6 w-6" />
                          </button>
                        </>
                      )}
                    </div>
                    
                    <div className="p-6 bg-card text-card-foreground">
                      {selectedImage && (
                        <>
                          <h2 className="text-xl font-bold mb-2">{selectedImage.alt}</h2>
                          <p className="text-sm text-muted-foreground mb-4">{selectedImage.location}</p>
                          
                          <Separator className="my-4" />
                          
                          <div className="mb-6">
                            <h3 className="font-medium mb-2">Description</h3>
                            <p className="text-sm text-muted-foreground">{selectedImage.description}</p>
                          </div>
                          
                          <Button size="sm" asChild>
                            <a href="/contact">Inquire About This Style</a>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className="text-center mt-12">
              <h2 className="text-2xl font-playfair font-bold mb-4">Create Your Own Beautiful Memories</h2>
              <p className="text-muted-foreground mb-6">
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