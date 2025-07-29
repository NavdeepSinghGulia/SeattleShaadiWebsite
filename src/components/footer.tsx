
import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-12 text-center md:text-left md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-1">
            <h3 className="font-headline text-xl font-bold text-primary mb-4">Seattle Shaadi</h3>
            <p className="text-muted-foreground">Crafting timeless weddings with a touch of modern elegance. Your story, our canvas.</p>
            <div className="flex space-x-4 mt-6 justify-center md:justify-start">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110"><Facebook /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110"><Instagram /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110"><Twitter /></Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110"><Linkedin /></Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/work" className="hover:text-primary transition-colors">Our Work</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Seattle, WA</li>
              <li>+1 (206) 821-6764</li>
              <li>hello@seattleshaadi.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-semibold mb-4">Newsletter</h4>
            <p className="text-muted-foreground mb-4">Stay up to date with our latest weddings and offers.</p>
            <div className="flex w-full max-w-sm items-center space-x-2 mx-auto md:mx-0">
              <Input type="email" placeholder="Email" className="bg-background" />
              <Button type="submit" variant="default">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Seattle Shaadi. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
