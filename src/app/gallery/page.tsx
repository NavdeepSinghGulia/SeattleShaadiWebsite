
'use client';

import React, 'useState, useEffect } from 'react';
import Image from 'next/image';
import { Seo } from '@/components/seo';
import { RoyalBackground } from '@/components/royal-background';
import { useAnimation } from '@/hooks/use-animation-preferences';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import OptimizedImage from '@/components/optimized-image';
import { generateMetadata } from '@/lib/seo-config';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  location: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
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
    src: '/images/ceremonies/seattle-mehndi-ceremony-celebration-v2.webp',
    alt: 'Mehndi ceremony celebration',
    category: 'ceremonies',
    location: 'Hyatt Regency, Bellevue',
    description: 'Beautiful Mehndi ceremony with traditional decorations and henna designs.',
  },
  {
    id: 'ceremony-3',
    src: '/images/ceremonies/seattle-haldi-ceremony-celebration-v2.webp',
    alt: 'Haldi ceremony celebration',
    category: 'ceremonies',
    location: 'Fairmont Olympic Hotel, Seattle',
    description: 'Vibrant Haldi ceremony with turmeric traditions and joyful celebrations.',
  },
  {
    id: 'ceremony-4',
    src: '/images/ceremonies/traditional-baraat-procession-celebration.jpg',
    alt: 'Traditional Baraat procession',
    category: 'ceremonies',
    location: 'The Westin, Seattle',
    description: 'Colorful Baraat procession with traditional music and dancing.',
  },
  {
    id: 'ceremony-5',
    src: '/images/ceremonies/seattle-bride-vidaai-ceremony-v2.jpg',
    alt: 'Emotional Vidaai ceremony',
    category: 'ceremonies',
    location: 'Willows Lodge, Woodinville',
    description: 'Touching Vidaai ceremony marking the bride\'s departure to her new home.',
  },
  {
    id: 'ceremony-6',
    src: '/images/ceremonies/traditional-phere-ceremony-hall.jpg',
    alt: 'Traditional Phere ceremony',
    category: 'ceremonies',
    location: 'Woodland Park Rose Garden, Seattle',
    description: 'Sacred Phere ceremony with traditional mandap and fire ritual.',
  },
  
  // Decor
  {
    id: 'decor-1',
    src: '/images/decor/elegant-wedding-hall-lighting.webp',
    alt: 'Luxury Indian wedding reception decor',
    category: 'decor',
    location: 'Grand Hyatt, Seattle',
    description: 'Opulent reception with crystal chandeliers, gold accents, and rich floral arrangements.',
  },
  {
    id: 'decor-2',
    src: '/images/decor/wedding-floral-decoration-setup.jpg',
    alt: 'Traditional mandap decoration',
    category: 'decor',
    location: 'Sheraton Grand, Seattle',
    description: 'Intricate mandap with traditional red and gold draping and fresh flower garlands.',
  },
  {
    id: 'decor-3',
    src: '/images/decor/wedding-feast-table-setup.webp',
    alt: 'Modern Indian wedding table setting',
    category: 'decor',
    location: 'Museum of History & Industry, Seattle',
    description: 'Contemporary table design with traditional Indian elements and modern aesthetics.',
  },
  {
    id: 'decor-4',
    src: '/images/decor/bollywood-wedding-dance.jpg',
    alt: 'Sangeet night decoration',
    category: 'decor',
    location: 'W Hotel, Seattle',
    description: 'Vibrant Sangeet decor with colorful draping, Rajasthani umbrellas, and festive lighting.',
  },
  {
    id: 'decor-5',
    src: '/images/decor/seattle-mehndi-ceremony-celebration.webp',
    alt: 'Mehndi ceremony decoration',
    category: 'decor',
    location: 'Private Estate, Mercer Island',
    description: 'Bohemian-inspired Mehndi decor with marigold garlands and colorful cushions.',
  },
  {
    id: 'decor-6',
    src: '/images/decor/seattle-wedding-hall-ceremony.jpg',
    alt: 'Royal Indian wedding stage',
    category: 'decor',
    location: 'The Bellevue Club, Bellevue',
    description: 'Palatial stage design with intricate backdrop and royal seating for the couple.',
  },
  
  // Food
  {
    id: 'food-1',
    src: '/images/food/hindu-wedding-food-spread.jpeg',
    alt: 'Indian wedding catering display',
    category: 'food',
    location: 'Fairmont Olympic Hotel, Seattle',
    description: 'Elaborate buffet featuring regional Indian cuisines with live cooking stations.',
  },
  {
    id: 'food-2',
    src: '/images/food/indian-wedding-food-menu-spread.jpg',
    alt: 'Wedding dessert table',
    category: 'food',
    location: 'Four Seasons Hotel, Seattle',
    description: 'Fusion dessert display featuring traditional Indian sweets and Western pastries.',
  },
  {
    id: 'food-3',
    src: '/images/food/traditional-wedding-food-buffet.jpg',
    alt: 'Wedding buffet setup',
    category: 'food',
    location: 'Hyatt Regency, Bellevue',
    description: 'Elegant buffet setup featuring authentic Indian cuisine and live cooking stations.',
  },
  {
    id: 'food-4',
    src: '/images/food/wedding-catering-food-display.jpg',
    alt: 'Catering food display',
    category: 'food',
    location: 'The Westin, Seattle',
    description: 'Professional catering display with artistic food presentation and traditional elements.',
  },
  {
    id: 'food-5',
    src: '/images/food/hindu-wedding-traditional-foods.jpeg',
    alt: 'Traditional Hindu wedding foods',
    category: 'food',
    location: 'Sheraton Grand, Seattle',
    description: 'Authentic Hindu wedding foods prepared according to traditional recipes and customs.',
  },
  {
    id: 'food-6',
    src: '/images/food/wedding-feast-table-setup.webp',
    alt: 'Wedding feast table setting',
    category: 'food',
    location: 'W Hotel, Seattle',
    description: 'Elegant table setting with traditional Indian feast and modern presentation.',
  },
  
  // Attire
  {
    id: 'attire-1',
    src: '/images/attire/indian-wedding-dresses-collection.jpg',
    alt: 'Bride in traditional lehenga',
    category: 'attire',
    location: 'Four Seasons Hotel, Seattle',
    description: 'Bride wearing a hand-embroidered red Sabyasachi lehenga with antique gold jewelry.',
  },
  {
    id: 'attire-2',
    src: '/images/portraits/bride-groom-wedding-decor.jpg',
    alt: 'Bride and groom in traditional attire',
    category: 'attire',
    location: 'Fairmont Olympic Hotel, Seattle',
    description: 'Beautiful couple in coordinated traditional Indian wedding attire with gold accents.',
  },
  {
    id: 'attire-3',
    src: '/images/attire/intricate-mehndi-henna-designs.jpg',
    alt: 'Bridal mehndi design',
    category: 'attire',
    location: 'Private Residence, Bellevue',
    description: 'Intricate bridal mehndi featuring traditional Rajasthani patterns and personal symbols.',
  },
  {
    id: 'attire-4',
    src: '/images/portraits/bride-groom-wedding-portrait-v2.jpg',
    alt: 'Bride and groom portrait',
    category: 'attire',
    location: 'The Bellevue Club, Bellevue',
    description: 'Elegant portrait showcasing traditional Indian wedding attire with modern styling.',
  },
  {
    id: 'attire-5',
    src: '/images/portraits/groom-bride-sagai-engagement.jpg',
    alt: 'Engagement ceremony attire',
    category: 'attire',
    location: 'Hyatt Regency, Bellevue',
    description: 'Beautiful engagement ceremony attire featuring pastel colors and elegant jewelry.',
  },
  {
    id: 'attire-6',
    src: '/images/portraits/bride-groom-ceremony-moment-v2.jpg',
    alt: 'Ceremony moment attire',
    category: 'attire',
    location: 'Grand Hyatt, Seattle',
    description: 'Color-coordinated wedding party in traditional Indian attire with modern styling.',
  },
];

const GalleryPage = () => {
  const { shouldAnimate } = useAnimation();
  const [activeTab, setActiveTab] = useState('ceremonies');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (!selectedImage) return;

    const categoryImages = galleryImages.filter(img => img.category === selectedImage.category);
    const currentIndex = categoryImages.findIndex(img => img.id === selectedImage.id);

    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % categoryImages.length;
    } else {
      newIndex = (currentIndex - 1 + categoryImages.length) % categoryImages.length;
    }
    
    setSelectedImage(categoryImages[newIndex]);
  };

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
            
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-12">
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
                          className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
                          onClick={() => openLightbox(image)}
                        >
                          <div className="relative aspect-square overflow-hidden">
                            <OptimizedImage 
                              src={image.src}
                              alt={image.alt}
                              width={400}
                              height={400}
                              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
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
              <DialogContent className="max-w-5xl w-full p-0 bg-black/90 border-none">
                <div className="relative">
                  <button 
                    className="absolute top-4 right-4 z-50 bg-black/50 rounded-full p-2 text-white hover:bg-black/80 transition-colors"
                    onClick={closeLightbox}
                    aria-label="Close lightbox"
                  >
                    <X className="h-6 w-6" />
                  </button>
                  
                  {selectedImage && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      <div className="md:col-span-2 relative aspect-square md:aspect-auto h-[60vh] md:h-auto">
                        <OptimizedImage 
                          src={selectedImage.src}
                          alt={selectedImage.alt}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 66vw"
                          priority
                        />
                        
                        <button 
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/80 transition-colors"
                          onClick={() => navigateImage('prev')}
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        
                        <button 
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/80 transition-colors"
                          onClick={() => navigateImage('next')}
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </div>
                      
                      <div className="p-6 bg-card text-card-foreground">
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
                      </div>
                    </div>
                  )}
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
