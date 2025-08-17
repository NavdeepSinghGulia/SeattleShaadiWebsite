'use client';

import React, { useState } from 'react';
import { generateFAQStructuredData } from '@/lib/seo-utils';

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
      description: 'A pre-wedding ritual where turmeric paste is applied to the bride and groom for purification and blessings.',
      significance: 'Turmeric is believed to have purifying properties and brings good luck to the couple.',
      modernAdaptations: 'Many couples now have organic turmeric facials or spa-style haldi ceremonies with professional photographers.',
      imageUrl: '/images/traditions/haldi.jpg'
    },
    {
      id: 'mehndi',
      name: 'Mehndi Ceremony',
      description: 'An artistic celebration where intricate henna designs are applied to the bride\'s hands and feet.',
      significance: 'The darker the mehndi color, the deeper the love between the couple.',
      modernAdaptations: 'Contemporary designs include minimalist patterns, couple portraits, and meaningful symbols.',
      imageUrl: '/images/traditions/mehndi.jpg'
    },
    {
      id: 'jaimala',
      name: 'Jaimala (Garland Exchange)',
      description: 'The ceremonial exchange of floral garlands between bride and groom.',
      significance: 'Symbolizes the acceptance of each other as life partners.',
      modernAdaptations: 'Couples now use exotic flowers, personalized garlands, or even living plant garlands.',
      imageUrl: '/images/traditions/jaimala.jpg'
    },
    {
      id: 'pheras',
      name: 'Saat Phere (Seven Vows)',
      description: 'Seven circles around the sacred fire while making vows to each other.',
      significance: 'Each circle represents a vow for their married life together.',
      modernAdaptations: 'Couples often write personalized vows in addition to traditional Sanskrit ones.',
      imageUrl: '/images/traditions/pheras.jpg'
    }
  ],
  sikh: [
    {
      id: 'anand-karaj',
      name: 'Anand Karaj',
      description: 'The Sikh wedding ceremony performed in the presence of Guru Granth Sahib.',
      significance: 'A spiritual union blessed by Guru Granth Sahib with hymns and prayers.',
      modernAdaptations: 'Modern ceremonies often include English explanations for non-Sikh guests.',
      imageUrl: '/images/traditions/anand-karaj.jpg'
    },
    {
      id: 'laavan',
      name: 'Laavan',
      description: 'Four sacred hymns sung during the wedding ceremony.',
      significance: 'Each hymn represents a stage of spiritual and marital development.',
      modernAdaptations: 'Couples learn the meaning of each laav to deepen their understanding.',
      imageUrl: '/images/traditions/laavan.jpg'
    }
  ],
  muslim: [
    {
      id: 'nikah',
      name: 'Nikah',
      description: 'The Islamic marriage contract ceremony with witnesses.',
      significance: 'A sacred contract between bride and groom in the presence of Allah.',
      modernAdaptations: 'Modern nikah ceremonies often include personalized vows alongside traditional ones.',
      imageUrl: '/images/traditions/nikah.jpg'
    },
    {
      id: 'walima',
      name: 'Walima',
      description: 'The wedding reception hosted by the groom\'s family.',
      significance: 'A celebration to announce the marriage to the community.',
      modernAdaptations: 'Contemporary walimas blend traditional elements with modern reception styles.',
      imageUrl: '/images/traditions/walima.jpg'
    }
  ],
  'south-indian': [
    {
      id: 'talambralu',
      name: 'Talambralu',
      description: 'Playful throwing of rice and flower petals over each other.',
      significance: 'Symbolizes prosperity and fertility in married life.',
      modernAdaptations: 'Couples use colorful flower petals or biodegradable confetti.',
      imageUrl: '/images/traditions/talambralu.jpg'
    },
    {
      id: 'oonjal',
      name: 'Oonjal',
      description: 'The swing ceremony where the couple sits on a decorated swing.',
      significance: 'Represents the ups and downs of married life and mutual support.',
      modernAdaptations: 'Modern oonjal ceremonies feature custom-designed swings and photo opportunities.',
      imageUrl: '/images/traditions/oonjal.jpg'
    }
  ]
};

const faqData = [
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
];

export default function TraditionsContent() {
  const [activeTab, setActiveTab] = useState('hindu');

  // Add structured data for FAQ
  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(generateFAQStructuredData(faqData));
    document.head.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Indian Wedding Traditions & Customs
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore the rich cultural heritage and beautiful traditions that make Indian weddings 
              so unique and meaningful. Discover how these ancient customs are being adapted for modern celebrations.
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {Object.keys(traditions).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 ${
                    activeTab === key
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {key === 'hindu' ? 'Hindu' : 
                   key === 'sikh' ? 'Sikh' : 
                   key === 'muslim' ? 'Muslim' : 
                   'South Indian'}
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="space-y-8">
              {traditions[activeTab].map((tradition) => (
                <div key={tradition.id} className="bg-card rounded-lg border border-border p-6 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">
                          {tradition.name} Image
                        </span>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                        {tradition.name}
                      </h2>
                      
                      <p className="text-muted-foreground mb-5 leading-relaxed">
                        {tradition.description}
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                          <h3 className="font-medium text-primary mb-2">
                            Significance
                          </h3>
                          <p className="text-sm leading-relaxed">{tradition.significance}</p>
                        </div>
                        
                        <div className="bg-accent/5 p-4 rounded-lg border border-accent/10">
                          <h3 className="font-medium text-accent mb-2">
                            Modern Adaptations
                          </h3>
                          <p className="text-sm leading-relaxed">{tradition.modernAdaptations}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-16 p-8 bg-primary/5 rounded-lg border border-primary/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              Incorporate These Traditions in Your Wedding
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Our expert wedding planners can help you blend traditional elements with modern touches
              to create a wedding that honors your heritage while reflecting your personal style.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300"
            >
              Schedule a Consultation
              <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* FAQ Section */}
          <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                  {index < faqData.length - 1 && (
                    <hr className="mt-6 border-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}