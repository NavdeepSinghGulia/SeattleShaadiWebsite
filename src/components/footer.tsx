import { Mail, Phone, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="font-headline text-2xl font-bold tracking-tight text-background">
              VivaahVerse
            </Link>
            <p className="mt-4 text-sm text-background/70">Crafting unforgettable moments.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-background">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/services" className="text-background/80 hover:text-background">Services</Link></li>
              <li><Link href="/work" className="text-background/80 hover:text-background">Gallery</Link></li>
              <li><Link href="/about" className="text-background/80 hover:text-background">About</Link></li>
              <li><Link href="/contact" className="text-background/80 hover:text-background">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-background">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <a href="mailto:contact@vivaahverse.com" className="text-background/80 hover:text-background">contact@vivaahverse.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3" />
                <a href="tel:+911234567890" className="text-background/80 hover:text-background">+91 123 456 7890</a>
              </li>
            </ul>
          </div>
          <div>
             <h3 className="text-sm font-semibold uppercase tracking-wider text-background">Follow Us</h3>
             <div className="flex mt-4 space-x-4">
                <a href="#" className="text-background/70 hover:text-background"><span className="sr-only">Facebook</span><Facebook className="h-6 w-6" /></a>
                <a href="#" className="text-background/70 hover:text-background"><span className="sr-only">Instagram</span><Instagram className="h-6 w-6" /></a>
             </div>
          </div>
        </div>
        <div className="mt-8 border-t border-background/20 pt-8 text-center">
          <p className="text-base text-background/60">&copy; {new Date().getFullYear()} VivaahVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
