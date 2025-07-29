
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Our Work' },
  { href: '/spotlight', label: 'Spotlight' },
  { href: '/fun', label: 'Fun at SS' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQs' },
];

function Logo() {
    return (
    <div className="flex items-center justify-center p-1">
      <Image
        src="/Logo-new.webp"
        alt="Seattle Shaadi Logo"
        width={150}
        height={50}
        className="h-16 w-auto transition-transform hover:scale-105"
        priority
      />
    </div>
  );
}


export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent text-white'
      )}
    >
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-6">
        <Link href="/" onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative font-semibold transition-colors hover:text-primary",
                 isScrolled ? "text-foreground/80" : "text-white/80",
                "after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-full after:bg-primary after:transition-transform after:duration-300 after:scale-x-0 after:origin-center hover:after:scale-x-100",
                pathname === link.href ? "text-primary after:scale-x-100" : ""
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background">
              <div className="flex h-full flex-col p-6">
                <div className="mb-8">
                   <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                      <Logo />
                    </Link>
                </div>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-semibold text-foreground/80 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
