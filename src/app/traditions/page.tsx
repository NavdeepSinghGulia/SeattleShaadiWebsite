'use client';

import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';

import { Seo } from '@/components/seo';
import { RoyalBackground } from '@/components/royal-background';
import { useAnimation } from '@/hooks/use-animation-preferences';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Tradition {
  id: string;
  name: string;
  description: string;
  significance: string;
  modernAdaptations: string;
  imageUrl: string;
}

// Updated traditions with distinct Tamil, Telugu, Kannada, and Malayalam sections and SEO-friendly images
const traditions: Record<string, Tradition[]> = {
  hindu: [
    {
      id: 'haldi',
      name: 'Haldi Ceremony',
      description:
        'A pre-wedding ritual where turmeric paste is applied to the bride and groom for blessing and beautification.',
      significance:
        "Turmeric is known for its medicinal properties and is believed to purify the body and bring good fortune.",
      modernAdaptations:
        'Modern Haldi ceremonies often include music, dancing, and themed decorations, turning it into a festive pre-wedding celebration.',
      imageUrl: '/traditions/haldi.png',
    },
    {
      id: 'mehndi',
      name: 'Mehndi Ceremony',
      description:
        "Intricate henna designs are applied to the bride's hands and feet, symbolizing beauty and joy.",
      significance:
        "The darker the mehndi color, the stronger the love between the couple. It's also believed that the bride won't have to do housework until the mehndi fades.",
      modernAdaptations:
        'Contemporary mehndi parties often include professional artists, music, dancing, and themed decorations.',
      imageUrl: '/traditions/mehandi-beautiful.png',
    },
    {
      id: 'sangeet',
      name: 'Sangeet',
      description:
        'A musical evening where families come together to sing, dance, and celebrate the upcoming union.',
      significance:
        'The Sangeet brings both families together in a joyful celebration before the wedding ceremonies begin.',
      modernAdaptations:
        'Modern Sangeet events often include choreographed performances, professional DJs, and elaborate stage setups.',
      imageUrl: '/traditions/sangeet-ceremony.png',
    },
    {
      id: 'baraat',
      name: 'Baraat',
      description:
        "The groom's procession to the wedding venue, traditionally on a horse or elephant, accompanied by family and friends dancing.",
      significance:
        "The Baraat symbolizes the groom's journey to begin a new life and the joy of his family in welcoming a new member.",
      modernAdaptations:
        'Contemporary Baraats may include luxury cars, motorcycles, or even helicopters instead of traditional animals.',
      imageUrl: '/traditions/baraat-ceremony.png',
    },
    {
      id: 'jaimala',
      name: 'Jaimala (Garland Exchange)',
      description:
        'The bride and groom exchange flower garlands, symbolizing their acceptance of each other.',
      significance:
        "This ritual marks the beginning of the wedding ceremony and represents the couple's mutual choice and acceptance.",
      modernAdaptations:
        'Modern couples often add personal touches like custom garlands or special music during this exchange.',
      imageUrl: '/traditions/jaimala-garland-exchange.png',
    },
    {
      id: 'pheras',
      name: 'Saat Pheras (Seven Vows)',
      description:
        'The couple takes seven rounds around the sacred fire, making vows to each other with each round.',
      significance:
        'Each phera represents a specific promise and prayer for their married life together.',
      modernAdaptations:
        'Some couples now personalize their vows while maintaining the traditional structure of the seven rounds.',
      imageUrl: '/traditions/saat-pheras-seven-vows.png',
    },
    {
      id: 'vidaai',
      name: 'Vidaai',
      description:
        "The emotional farewell ceremony where the bride leaves her parental home to join her husband's family.",
      significance:
        "This ritual symbolizes the bride's transition from her birth family to her new family.",
      modernAdaptations:
        'Modern Vidaai ceremonies may be less formal and emotional, reflecting changing family dynamics.',
      imageUrl: '/traditions/vidaai.png',
    },
  ],
  sikh: [
    {
      id: 'jago',
      name: 'Jago (Jaggo) Night',
      description:
        'A lively Punjabi pre-wedding celebration where family and friends dance with decorated pots (gaggar) and lights, singing traditional songs.',
      significance:
        'Jago literally means "wake up" — waking the neighborhood to share joy and invite the community to celebrate. It symbolizes collective happiness and blessings for the couple.',
      modernAdaptations:
        'Often celebrated with dhol, DJ, and choreographed bhangra; families use LED-lit pots and custom props for a high-energy party.',
      imageUrl: '/traditions/jago-jaggo.png',
    },
    {
      id: 'mehndi-sikh',
      name: 'Mehndi Ceremony',
      description:
        'A festive pre-wedding celebration where intricate henna designs are applied to the hands and feet of the bride and female family members.',
      significance:
        'Symbolizes beauty, joy, and good fortune. The ceremony brings together female relatives and friends to bless the bride before her wedding day.',
      modernAdaptations:
        'Modern Sikh mehndi ceremonies often include professional artists, music, dancing, and themed decorations with a Punjabi flair.',
      imageUrl: '/traditions/mehandi.png',
    },
    {
      id: 'choora',
      name: 'Choora Ceremony',
      description:
        "The maternal uncle places red and white bangles (choora) on the bride's wrists, which she wears for several weeks after marriage.",
      significance:
        'The choora symbolizes marital status, prosperity, and the blessings of maternal relatives. The red color represents love and fertility.',
      modernAdaptations:
        'Modern brides often choose designer chooras with gold accents and may wear them for a shorter period than traditionally expected.',
      imageUrl: '/traditions/choora-ceremony.png',
    },
    {
      id: 'anand-karaj',
      name: 'Anand Karaj',
      description:
        'The Sikh marriage ceremony performed in the presence of the Guru Granth Sahib.',
      significance:
        'The ceremony emphasizes equality and spiritual union, with the couple circling the holy scripture four times.',
      modernAdaptations:
        'While the core ceremony remains traditional, many couples add translations or brief explanations for guests.',
      imageUrl: '/traditions/anand-karaj.png',
    },
    {
      id: 'milni',
      name: 'Milni',
      description:
        'A ceremony where family members from both sides meet and exchange garlands and gifts.',
      significance:
        'This ritual symbolizes the union of two families and the building of new relationships.',
      modernAdaptations:
        'Modern Milni ceremonies often include creative introductions and personalized gifts.',
      imageUrl: '/traditions/milni.png',
    },
    {
      id: 'laavan',
      name: 'Laavan Pheras',
      description:
        'The four rounds around the Guru Granth Sahib, each accompanied by a specific hymn with deep meaning.',
      significance:
        'Each phera represents a stage in spiritual development and married life.',
      modernAdaptations:
        'The ceremony remains traditional; some couples have translations or narrations for guests.',
      imageUrl: '/traditions/anand-karaj.png',
    },
  ],
  muslim: [
    {
      id: 'nikah',
      name: 'Nikah',
      description:
        'The Islamic marriage contract ceremony, where the couple consents to marriage in front of witnesses.',
      significance:
        'The Nikah is a sacred contract that establishes the rights and obligations of the bride and groom.',
      modernAdaptations:
        'Modern Nikahs may be held in wedding halls rather than mosques, with decorative elements added to the ceremony.',
      imageUrl: '/traditions/nikah-ceremony.png',
    },
    {
      id: 'mehndi-muslim',
      name: 'Mehndi',
      description:
        "Similar to Hindu traditions, intricate henna designs are applied to the bride's hands and feet.",
      significance:
        'The mehndi symbolizes beauty, joy, and good fortune for the bride.',
      modernAdaptations:
        'Contemporary Muslim mehndi ceremonies often include professional artists and festive celebrations.',
      imageUrl: '/traditions/mehandi-muslim.png',
    },
    {
      id: 'walima',
      name: 'Walima',
      description:
        "The wedding reception hosted by the groom's family after the Nikah.",
      significance:
        'The Walima is a celebration to publicly announce the marriage and share joy with the community.',
      modernAdaptations:
        'Modern Walima celebrations often include elaborate decorations, entertainment, and catering.',
      imageUrl: '/traditions/joyful-bride-decorated-hands.png',
    },
  ],
  tamil: [
    {
      id: 'oonjal',
      name: 'Oonjal (Swing) Ceremony',
      description:
        'The couple sits on a decorated swing while women from both families sing traditional songs and gently rock them.',
      significance:
        "Represents life's ups and downs and the couple's mutual support; elders bless the couple with rice and turmeric.",
      modernAdaptations:
        'Custom floral swings, curated Carnatic playlists, and photography-centered setups are common today.',
      imageUrl: '/traditions/bride-elaborate-mehndi-traditional-jewelry.png',
    },
    {
      id: 'kanyadaanam',
      name: 'Kanyadaanam',
      description:
        'A sacred ritual where the father of the bride gives her hand to the groom, entrusting her to his care.',
      significance:
        "Symbolizes the father's blessing and the transfer of responsibility for the bride's well-being to the groom.",
      modernAdaptations:
        'Contemporary ceremonies often include both parents or even grandparents in this ritual, emphasizing family unity.',
      imageUrl: '/traditions/kanyadaanam.png',
    },
    {
      id: 'nalangu',
      name: 'Nalangu',
      description:
        'A playful pre-wedding ritual where the bride and groom sit back-to-back and play games with turmeric-colored water and rice.',
      significance:
        'Symbolizes the playful aspect of marriage and helps the couple and families bond through fun activities before the serious ceremony.',
      modernAdaptations:
        'Modern celebrations include creative games, professional photography, and sometimes even water balloon fights in upscale venues.',
      imageUrl: '/traditions/nalangu.png',
    },
  ],
  telugu: [
    {
      id: 'talambralu',
      name: 'Talambralu',
      description:
        'The bride and groom shower each other with rice mixed with turmeric and saffron in playful rounds.',
      significance:
        'Denotes prosperity, love, and mutual care as the couple embarks on their new life.',
      modernAdaptations:
        'Eco-friendly petals or colored rice and staged photo moments are popular.',
      imageUrl: '/images/traditions/telugu/talambralu-ceremony.jpg',
    },
    {
      id: 'jeelakarra-bellam',
      name: 'Jeelakarra-Bellam',
      description:
        "The couple places cumin and jaggery paste on each other's heads, signifying inseparable union.",
      significance:
        'Cumin and jaggery represent steadfastness and sweetness in marriage.',
      modernAdaptations:
        'Often accompanied by explanatory cards or a brief narration for guests.',
      imageUrl: '/images/traditions/telugu/jeelakarra-bellam-ceremony.jpg',
    },
    {
      id: 'arundhati-nakshatra',
      name: 'Arundhati Nakshatra',
      description:
        'The couple gazes at the Arundhati star (in the Ursa Major constellation) as a symbol of marital fidelity.',
      significance:
        'Arundhati, wife of sage Vasishtha, is revered for her devotion and purity. Viewing her star symbolizes the couple aspiring to have a relationship like hers.',
      modernAdaptations:
        'Modern ceremonies may use a telescope or star-projector when the actual star is not visible, or incorporate the ritual during daytime with symbolic representations.',
      imageUrl: '/images/traditions/telugu/arundhati-nakshatra-ceremony.jpg',
    },
  ],
  kannada: [
    {
      id: 'dhare-heralu',
      name: 'Dhare Heralu Ceremony',
      description:
        "A sacred ritual where the bride's father pours holy water through a bamboo filter onto the couple's joined hands.",
      significance:
        "Symbolizes the purification of the couple's union and the blessing of their new life together.",
      modernAdaptations:
        "Modern ceremonies often incorporate decorative vessels and colored water for visual appeal.",
      imageUrl: '/traditions/kannada-wedding-ritual-offerings-outdoor.png',
    },
    {
      id: 'kashi-yatra',
      name: 'Kashi Yatra',
      description:
        "A humorous ritual where the groom pretends to leave for Kashi (Varanasi) to pursue spiritual life, and the bride's father convinces him to return and accept married life.",
      significance:
        'Represents the balance between spiritual pursuits and worldly responsibilities in Hindu philosophy.',
      modernAdaptations:
        'Often performed with theatrical elements and comedy to entertain guests.',
      imageUrl: '/traditions/south-indian-bride-sacred-ritual.png',
    },
    {
      id: 'nalangu',
      name: 'Nalangu Ceremony',
      description:
        'A playful ritual where the bride and groom engage in games with turmeric-colored water and rice.',
      significance:
        'Celebrates the fun and playful aspects of marriage while strengthening the bond between the couple.',
      modernAdaptations:
        'Contemporary ceremonies often include music and dance elements to enhance the festive atmosphere.',
      imageUrl: '/traditions/nalangu.png',
    },
  ],
  malayalam: [
    {
      id: 'thalikettu',
      name: 'Thalikettu (Tying the Thali)',
      description:
        "The groom ties the thali (mangalsutra) around the bride's neck, symbolizing their marital union.",
      significance:
        "The thali is a sacred thread that represents the couple's commitment and bond in marriage.",
      modernAdaptations:
        'Modern thalis often feature contemporary designs while maintaining traditional elements.',
      imageUrl: '/images/traditions/malayalam/thalikettu-ceremony.jpg',
    },
    {
      id: 'pudamuri',
      name: 'Pudamuri',
      description:
        "The groom presents a new mundu (traditional clothing) to the bride's father, who then gives it to the bride.",
      significance:
        "Symbolizes the groom's commitment to provide for his wife and respect her family.",
      modernAdaptations:
        'Contemporary ceremonies may include designer sarees or other luxury items instead of the traditional mundu.',
      imageUrl: '/images/traditions/malayalam/pudamuri-ceremony.jpg',
    },
  ],
};

const TraditionsPage = () => {
  const { shouldAnimate } = useAnimation();

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Indian Wedding Traditions & Customs',
    'description': 'Explore Indian wedding traditions across Hindu, Sikh, Tamil, Telugu, Kannada, Malayalam, and Muslim cultures.',
    'url': 'https://seattleshaadi.com/traditions',
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': Object.entries(traditions).flatMap(([culture, traditionsList], cultureIndex) => 
        traditionsList.map((tradition, index) => ({
          '@type': 'ListItem',
          'position': cultureIndex * 10 + index + 1,
          'item': {
            '@type': 'Article',
            'name': tradition.name,
            'description': tradition.description,
            'image': tradition.imageUrl,
            'mainEntityOfPage': `https://seattleshaadi.com/traditions#${tradition.id}`,
            'about': {
              '@type': 'Thing',
              'name': `${culture.charAt(0).toUpperCase() + culture.slice(1)} Wedding Tradition`,
              'description': `Traditional ${culture.charAt(0).toUpperCase() + culture.slice(1)} wedding ceremony and customs`
            }
          }
        }))
      )
    }
  };

  return (
    <>
      <Script
        id="traditions-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Seo
        title="Indian Wedding Traditions & Customs | Hindu, Sikh, Tamil, Telugu, Kannada, Malayalam"
        description="Explore Indian wedding traditions across Hindu, Sikh, Tamil, Telugu, Kannada, Malayalam, and Muslim cultures. Discover Jago, Choora, Arundhati Nakshatra, Oonjal, Talambralu, Thalikettu, Nalangu & more with modern adaptations."
        keywords="Indian wedding traditions, Sikh Jago, Sikh Choora, Telugu Arundhati Nakshatra, Tamil Oonjal, Telugu Talambralu, Kannada Dhare Heralu, Malayalam Thalikettu, Hindu pheras, Muslim Nikah, Seattle Indian wedding rituals"
      />
      <div className="flex flex-col relative min-h-screen">
        {shouldAnimate && <RoyalBackground />}
        <div className="relative z-10 container mx-auto px-4 py-12 mt-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
                Indian Wedding Traditions & Customs
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore the rich cultural heritage and beautiful traditions that make Indian weddings so unique and meaningful. Discover how these ancient customs are being adapted for modern celebrations.
              </p>
            </div>

            <Tabs defaultValue="hindu" className="mb-12">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-7">
                <TabsTrigger value="hindu">Hindu</TabsTrigger>
                <TabsTrigger value="sikh">Sikh</TabsTrigger>
                <TabsTrigger value="muslim">Muslim</TabsTrigger>
                <TabsTrigger value="tamil">Tamil</TabsTrigger>
                <TabsTrigger value="telugu">Telugu</TabsTrigger>
                <TabsTrigger value="kannada">Kannada</TabsTrigger>
                <TabsTrigger value="malayalam">Malayalam</TabsTrigger>
              </TabsList>

              {Object.entries(traditions).map(([key, traditionsList]) => (
                <TabsContent key={key} value={key} className="mt-6">
                  <div className="space-y-8">
                    {traditionsList.map((tradition, index) => (
                      <Card
                        key={tradition.id}
                        id={tradition.id}
                        className="p-6 bg-card/95 backdrop-blur-sm border-primary/20 overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-1 relative h-60 md:h-full rounded-lg overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                            <div className="relative h-full w-full">
                              <Image
                                src={tradition.imageUrl}
                                alt={`${tradition.name} - Seattle Indian Wedding ${key.charAt(0).toUpperCase() + key.slice(1)} Tradition | Authentic Cultural Ceremony`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={key === 'hindu' && index < 2}
                                loading={key === 'hindu' && index < 2 ? 'eager' : 'lazy'}
                                quality={80}
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHXG8H/QAAAABJRU5ErkJggg=="
                              />
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <h2 className="text-2xl font-playfair font-bold text-primary mb-2">
                              {tradition.name}
                            </h2>
                            {/* Debug info - will remove after confirming images work */}
                            <div className="text-xs text-gray-500 mb-2 hidden">
                              Image path: {tradition.imageUrl}
                            </div>
                            <p className="text-muted-foreground mb-4">
                              {tradition.description}
                            </p>

                            <div className="space-y-4">
                              <div>
                                <h3 className="font-medium text-primary">Significance</h3>
                                <p className="text-sm">{tradition.significance}</p>
                              </div>

                              <Separator />

                              <div>
                                <h3 className="font-medium text-primary">Modern Adaptations</h3>
                                <p className="text-sm">{tradition.modernAdaptations}</p>
                              </div>
                            </div>

                            <div className="mt-6">
                              <Button variant="outline" size="sm" asChild>
                                <a href={`/blog/${tradition.id}-ceremony-seattle-indian-wedding`}>
                                  Read More About {tradition.name}
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="text-center mb-12">
              <h2 className="text-2xl font-playfair font-bold mb-4">
                Incorporate These Traditions in Your Wedding
              </h2>
              <p className="text-muted-foreground mb-6">
                Our expert wedding planners can help you blend traditional elements with modern touches to create a wedding that honors your heritage while reflecting your personal style.
              </p>
              <Button size="lg" asChild>
                <a href="/contact">Schedule a Consultation</a>
              </Button>
            </div>

            <Card className="p-6 bg-card/95 backdrop-blur-sm border-primary/20">
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">
                    Can we blend traditions from different Indian cultures?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Absolutely! Many modern Indian weddings incorporate elements from various traditions, especially in intercultural marriages. Our planners can help you create a meaningful ceremony that honors both families' backgrounds.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">
                    How can we make traditional ceremonies more accessible to
                    non-Indian guests?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We recommend creating custom ceremony programs that explain the significance of each ritual, having a bilingual officiant who can provide brief explanations, or incorporating a narrator who guides guests through the ceremony.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">
                    How long do traditional Indian wedding ceremonies typically
                    last?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Traditional ceremonies can range from 1-3 hours depending on the cultural background and specific rituals included. Many couples today choose to streamline certain elements while preserving the most meaningful traditions.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">
                    Can we incorporate Western elements alongside traditional
                    Indian customs?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! Many couples successfully blend Indian traditions with Western elements like a white dress reception, first dance, cake cutting, or bouquet toss. Our planners specialize in creating harmonious fusion celebrations.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default TraditionsPage;

    