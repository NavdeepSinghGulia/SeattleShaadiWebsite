import TraditionsContent from '@/components/traditions-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Indian Wedding Traditions & Customs | Cultural Heritage & Modern Adaptations',
  description: 'Explore the rich cultural heritage of Indian wedding traditions. Learn about Hindu, Sikh, Muslim, and South Indian wedding rituals, their significance, and modern adaptations.',
  keywords: 'Indian wedding traditions, Hindu wedding customs, Sikh wedding traditions, Muslim wedding ceremonies, South Indian wedding rituals',
  openGraph: {
    title: 'Indian Wedding Traditions & Customs | Cultural Heritage',
    description: 'Explore the rich cultural heritage of Indian wedding traditions. Learn about Hindu, Sikh, Muslim, and South Indian wedding rituals and their modern adaptations.',
    images: [
      {
        url: '/images/traditions/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Indian Wedding Traditions'
      }
    ]
  }
};

export default function TraditionsPage() {
  return <TraditionsContent />;
}