'use client';

import React, { useEffect, useState } from 'react';
import { Seo } from '@/components/seo';
import { RoyalBackground } from '@/components/royal-background';
import { useAnimation } from '@/hooks/use-animation-preferences';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, LuxuryCard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { OptimizedImage } from '@/components/optimized-image';
import { motion } from 'framer-motion';
import { TraditionsSchemaMarkup } from '@/components/schema-markup';
import { DecorativeBorder, DecorativeCorner, DecorativeDivider, MandalaPattern, PaisleyPattern } from '@/components/decorative-elements';

interface Tradition {
  id: string;
  name: string;
  description: string;
  significance: string;
  modernAdaptations: string;
  imageUrl: string;
}

const traditions: Record<string, Tradition[]> = {
  hindu: [
    {
      id: 'haldi',
      name: 'Haldi Ceremony',
      description: 'A pre-wedding ritual where turmeric paste is applied to the bride and groom for blessing and beautification.',
      significance: 'Turmeric is known for its medicinal properties and is believed to purify the body and bring good fortune.',
      modernAdaptations: 'Modern Haldi ceremonies often include music, dancing, and themed decorations, turning it into a festive pre-wedding celebration.',
      imageUrl: '/images/traditions/haldi.jpg',
    },
    {
      id: 'mehndi',
      name: 'Mehndi Ceremony',
      description: 'Intricate henna designs are applied to the bride\'s hands and feet, symbolizing beauty and joy.',
      significance: 'The darker the mehndi color, the stronger the love between the couple. It\'s also believed that the bride won\'t have to do housework until the mehndi fades.',
      modernAdaptations: 'Contemporary mehndi parties often include professional artists, music, dancing, and themed decorations.',
      imageUrl: '/images/traditions/mehndi.jpg',
    },
    {
      id: 'sangeet',
      name: 'Sangeet',
      description: 'A musical evening where families come together to sing, dance, and celebrate the upcoming union.',
      significance: 'The Sangeet brings both families together in a joyful celebration before the wedding ceremonies begin.',
      modernAdaptations: 'Modern Sangeet events often include choreographed performances, professional DJs, and elaborate stage setups.',
      imageUrl: '/images/traditions/sangeet.jpg',
    },
    {
      id: 'baraat',
      name: 'Baraat',
      description: 'The groom\'s procession to the wedding venue, traditionally on a horse or elephant, accompanied by family and friends dancing.',
      significance: 'The Baraat symbolizes the groom\'s journey to begin a new life and the joy of his family in welcoming a new member.',
      modernAdaptations: 'Contemporary Baraats may include luxury cars, motorcycles, or even helicopters instead of traditional animals.',
      imageUrl: '/images/traditions/baraat.jpg',
    },
    {
      id: 'jaimala',
      name: 'Jaimala (Garland Exchange)',
      description: 'The bride and groom exchange flower garlands, symbolizing their acceptance of each other.',
      significance: 'This ritual marks the beginning of the wedding ceremony and represents the couple\'s mutual choice and acceptance.',
      modernAdaptations: 'Modern couples often add personal touches like custom garlands or special music during this exchange.',
      imageUrl: '/images/traditions/jaimala.jpg',
    },
    {
      id: 'pheras',
      name: 'Saat Pheras (Seven Vows)',
      description: 'The couple takes seven rounds around the sacred fire, making vows to each other with each round.',
      significance: 'Each phera represents a specific promise and prayer for their married life together.',
      modernAdaptations: 'Some couples now personalize their vows while maintaining the traditional structure of the seven rounds.',
      imageUrl: '/images/traditions/pheras.jpg',
    },
    {
      id: 'vidaai',
      name: 'Vidaai',
      description: 'The emotional farewell ceremony where the bride leaves her parental home to join her husband\'s family.',
      significance: 'This ritual symbolizes the bride\'s transition from her birth family to her new family.',
      modernAdaptations: 'Modern Vidaai ceremonies may be less formal and emotional, reflecting changing family dynamics.',
      imageUrl: '/images/traditions/vidaai.jpg',
    },
  ],
  sikh: [
    {
      id: 'anand-karaj',
      name: 'Anand Karaj',
      description: 'The Sikh marriage ceremony performed in the presence of the Guru Granth Sahib.',
      significance: 'The ceremony emphasizes equality and spiritual union, with the couple circling the holy scripture four times.',
      modernAdaptations: 'While the core ceremony remains traditional, many couples incorporate personal touches in the celebrations before and after.',
      imageUrl: '/images/traditions/anand-karaj.jpg',
    },
    {
      id: 'milni',
      name: 'Milni',
      description: 'A ceremony where male family members from both sides meet and exchange garlands and gifts.',
      significance: 'This ritual symbolizes the union of two families and the building of new relationships.',
      modernAdaptations: 'Modern Milni ceremonies often include creative introductions and personalized gifts.',
      imageUrl: '/images/traditions/milni.jpg',
    },
    {
      id: 'laavan',
      name: 'Laavan Pheras',
      description: 'The four rounds around the Guru Granth Sahib, each with a specific hymn and meaning.',
      significance: 'Each phera represents a stage in spiritual development and married life.',
      modernAdaptations: 'The ceremony remains largely traditional, though some couples choose to have translations of the hymns read for guests.',
      imageUrl: '/images/traditions/laavan.jpg',
    },
  ],
  muslim: [
    {
      id: 'nikah',
      name: 'Nikah',
      description: 'The Islamic marriage contract ceremony, where the couple consents to marriage in front of witnesses.',
      significance: 'The Nikah is a sacred contract that establishes the rights and obligations of the bride and groom.',
      modernAdaptations: 'Modern Nikahs may be held in wedding halls rather than mosques, with decorative elements added to the ceremony.',
      imageUrl: '/images/traditions/nikah.jpg',
    },
    {
      id: 'mehndi-muslim',
      name: 'Mehndi',
      description: 'Similar to Hindu traditions, intricate henna designs are applied to the bride\'s hands and feet.',
      significance: 'The mehndi symbolizes beauty, joy, and good fortune for the bride.',
      modernAdaptations: 'Contemporary Muslim mehndi ceremonies often include professional artists and festive celebrations.',
      imageUrl: '/images/traditions/mehndi-muslim.jpg',
    },
    {
      id: 'walima',
      name: 'Walima',
      description: 'The wedding reception hosted by the groom\'s family after the Nikah.',
      significance: 'The Walima is a celebration to publicly announce the marriage and share joy with the community.',
      modernAdaptations: 'Modern Walima celebrations often include elaborate decorations, entertainment, and catering.',
      imageUrl: '/images/traditions/walima.jpg',
    },
  ],
  south: [
    {
      id: 'kashi-yatra',
      name: 'Kashi Yatra',
      description: 'A symbolic ritual where the groom pretends to leave for Kashi (Varanasi) to pursue spiritual life.',
      significance: 'This playful ritual ends when the bride\'s father convinces the groom to return and marry his daughter instead.',
      modernAdaptations: 'Modern interpretations often add humor and theatrical elements to this tradition.',
      imageUrl: '/images/traditions/kashi-yatra.jpg',
    },
    {
      id: 'oonjal',
      name: 'Oonjal (Swing) Ceremony',
      description: 'The bride and groom are seated on a decorated swing and rocked gently by female relatives.',
      significance: 'This ritual symbolizes the ups and downs of married life and how the couple should face them together.',
      modernAdaptations: 'Contemporary Oonjal ceremonies often feature elaborately decorated swings and professional photography.',
      imageUrl: '/images/traditions/oonjal.jpg',
    },
    {
      id: 'kanya-daan',
      name: 'Kanya Daan',
      description: 'The giving away of the bride by her father to the groom, a significant moment in South Indian weddings.',
      significance: 'This ritual symbolizes the father entrusting his daughter to her husband with blessings for their future.',
      modernAdaptations: 'While the core ritual remains traditional, some families now emphasize partnership rather than "giving away."',
      imageUrl: '/images/traditions/kanya-daan.jpg',
    },
    {
      id: 'talambralu',
      name: 'Talambralu',
      description: 'The couple showers each other with a mixture of rice, turmeric, and saffron.',
      significance: 'This ritual symbolizes prosperity, fertility, and the couple\'s commitment to care for each other.',
      modernAdaptations: 'Modern ceremonies sometimes use flower petals or eco-friendly alternatives to rice.',
      imageUrl: '/images/traditions/talambralu.jpg',
    },
  ],
};

// Animation variants for staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const TraditionsPage = () => {
  const { shouldAnimate, intensity } = useAnimation();
  const [activeTab, setActiveTab] = useState('hindu');
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true on component mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // FAQ data for schema markup
  const faqData = {
    questions: [
      {
        question: 'Can we blend traditions from different Indian cultures?',
        answer: 'Absolutely! Many modern Indian weddings incorporate elements from various traditions, especially in intercultural marriages. Our planners can help you create a meaningful ceremony that honors both families\' backgrounds.'
      },
      {
        question: 'How can we make traditional ceremonies more accessible to non-Indian guests?',
        answer: 'We recommend creating custom ceremony programs that explain the significance of each ritual, having a bilingual officiant who can provide brief explanations, or incorporating a narrator who guides guests through the ceremony.'
      },
      {
        question: 'How long do traditional Indian wedding ceremonies typically last?',
        answer: 'Traditional ceremonies can range from 1-3 hours depending on the cultural background and specific rituals included. Many couples today choose to streamline certain elements while preserving the most meaningful traditions.'
      },
      {
        question: 'Can we incorporate Western elements alongside traditional Indian customs?',
        answer: 'Yes! Many couples successfully blend Indian traditions with Western elements like a white dress reception, first dance, cake cutting, or bouquet toss. Our planners specialize in creating harmonious fusion celebrations.'
      }
    ]
  };

  return (
    <>
      <Seo 
        title="Indian Wedding Traditions & Customs | Cultural Heritage & Modern Adaptations" 
        description="Explore the rich cultural heritage of Indian wedding traditions. Learn about Hindu, Sikh, Muslim, and South Indian wedding rituals, their significance, and modern adaptations for your luxury wedding celebration."
        keywords="Indian wedding traditions, Hindu wedding customs, Sikh wedding traditions, Muslim wedding ceremonies, South Indian wedding rituals, modern Indian wedding, luxury Indian wedding"
        canonical="/traditions"
        openGraph={{
          title: "Indian Wedding Traditions & Customs | Cultural Heritage",
          description: "Explore the rich cultural heritage of Indian wedding traditions. Learn about Hindu, Sikh, Muslim, and South Indian wedding rituals and their modern adaptations.",
          images: [
            {
              url: "/images/traditions/og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Indian Wedding Traditions"
            }
          ]
        }}
      />
      
      {isClient && <TraditionsSchemaMarkup traditions={traditions} />}
      
      <div className="flex flex-col relative min-h-screen">
        {shouldAnimate && <RoyalBackground />}
        
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Decorative elements */}
            <MandalaPattern className="top-0 right-0 opacity-5" size="lg" />
            <PaisleyPattern className="bottom-0 left-0 opacity-5" size="lg" />
            
            {/* Page Header */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-3xl md:text-5xl font-playfair font-bold text-primary mb-6 relative inline-block">
                <span className="relative z-10">Indian Wedding Traditions & Customs</span>
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Explore the rich cultural heritage and beautiful traditions that make Indian weddings 
                so unique and meaningful. Discover how these ancient customs are being adapted for modern celebrations.
              </p>
            </motion.div>

            {/* Tabs Navigation */}
            <Tabs 
              defaultValue="hindu" 
              className="mb-12"
              value={activeTab}
              onValueChange={handleTabChange}
            >
              <div className="relative">
                <DecorativeBorder className="mb-1" variant="subtle" />
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-background/80 backdrop-blur-sm">
                  <TabsTrigger value="hindu" className="font-medium text-base">Hindu</TabsTrigger>
                  <TabsTrigger value="sikh" className="font-medium text-base">Sikh</TabsTrigger>
                  <TabsTrigger value="muslim" className="font-medium text-base">Muslim</TabsTrigger>
                  <TabsTrigger value="south" className="font-medium text-base">South Indian</TabsTrigger>
                </TabsList>
                <DecorativeBorder className="mt-1" variant="subtle" />
              </div>
              
              {/* Tab Content */}
              {Object.entries(traditions).map(([key, traditionsList]) => (
                <TabsContent key={key} value={key} className="mt-8">
                  <motion.div 
                    className="space-y-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate={activeTab === key ? "visible" : "hidden"}
                  >
                    {traditionsList.map((tradition, index) => (
                      <motion.div key={tradition.id} variants={itemVariants}>
                        <LuxuryCard 
                          className="p-6 bg-card/95 backdrop-blur-sm border-primary/20 overflow-hidden"
                          glowEffect={shouldAnimate && intensity !== 'low'}
                          hoverAnimation={shouldAnimate && intensity !== 'low'}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1 relative h-60 md:h-full rounded-lg overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                              <div className="relative h-full w-full">
                                <OptimizedImage
                                  src={tradition.imageUrl}
                                  alt={tradition.name}
                                  fill={true}
                                  className="rounded-lg"
                                  objectFit="cover"
                                  blurEffect={true}
                                  fadeIn={true}
                                  decorativeBorder={true}
                                />
                                <div className="absolute bottom-4 left-4 right-4 z-20">
                                  <h3 className="text-xl font-medium text-white font-playfair">{tradition.name}</h3>
                                </div>
                              </div>
                            </div>
                            
                            <div className="md:col-span-2">
                              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-primary mb-3 relative inline-block">
                                {tradition.name}
                                <span className="absolute -bottom-1 left-0 w-16 h-0.5 bg-primary/40 rounded-full"></span>
                              </h2>
                              
                              <p className="text-muted-foreground mb-5 leading-relaxed">{tradition.description}</p>
                              
                              <div className="space-y-5">
                                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                                  <h3 className="font-medium text-primary mb-2 flex items-center">
                                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.5L21 7L12 16Z" fill="currentColor"/>
                                    </svg>
                                    Significance
                                  </h3>
                                  <p className="text-sm leading-relaxed">{tradition.significance}</p>
                                </div>
                                
                                <DecorativeDivider variant="subtle" />
                                
                                <div className="bg-accent/5 p-4 rounded-lg border border-accent/10">
                                  <h3 className="font-medium text-accent mb-2 flex items-center">
                                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                                      <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    Modern Adaptations
                                  </h3>
                                  <p className="text-sm leading-relaxed">{tradition.modernAdaptations}</p>
                                </div>
                              </div>
                              
                              <div className="mt-6">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="border-primary/20 hover:bg-primary/5 transition-all duration-300"
                                  asChild
                                >
                                  <a href={`/blog/${tradition.id}-ceremony-seattle-indian-wedding`} className="flex items-center">
                                    Read More About {tradition.name}
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </LuxuryCard>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>

            {/* CTA Section */}
            <motion.div 
              className="text-center mb-16 p-8 bg-primary/5 rounded-lg border border-primary/10 relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <DecorativeCorner position="top-left" size="md" />
              <DecorativeCorner position="top-right" size="md" />
              <DecorativeCorner position="bottom-left" size="md" />
              <DecorativeCorner position="bottom-right" size="md" />
              
              <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-primary">Incorporate These Traditions in Your Wedding</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Our expert wedding planners can help you blend traditional elements with modern touches
                to create a wedding that honors your heritage while reflecting your personal style.
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                asChild
              >
                <a href="/contact" className="flex items-center">
                  Schedule a Consultation
                  <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </Button>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <LuxuryCard className="p-8 bg-card/95 backdrop-blur-sm border-primary/20">
                <h2 className="text-2xl font-playfair font-bold mb-6 text-primary relative inline-block">
                  Frequently Asked Questions
                  <span className="absolute -bottom-1 left-0 w-16 h-0.5 bg-primary/40 rounded-full"></span>
                </h2>
                <div className="space-y-6">
                  {faqData.questions.map((faq, index) => (
                    <div key={index} className="group">
                      <h3 className="font-medium text-lg group-hover:text-primary transition-colors duration-300">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {faq.answer}
                      </p>
                      {index < faqData.questions.length - 1 && (
                        <DecorativeDivider variant="subtle" className="mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </LuxuryCard>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TraditionsPage;

