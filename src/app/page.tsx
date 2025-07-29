import { Header } from '@/components/header';
import { Hero } from '@/components/landing/hero';
import { About } from '@/components/landing/about';
import { Services } from '@/components/landing/services';
import { Gallery } from '@/components/landing/gallery';
import { Contact } from '@/components/landing/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
