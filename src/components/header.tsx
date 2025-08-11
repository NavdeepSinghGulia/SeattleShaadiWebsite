'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Our Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQs' },
];

function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative group", className)}>
      <Image
        src="/images/branding/logos/shaadi-squad-main-logo.webp"
        alt="Seattle Shaadi Logo"
        width={150}
        height={50}
        className="h-12 w-auto md:h-16 transition-all duration-300 ease-out group-hover:scale-105 filter drop-shadow-sm"
        priority
      />
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out blur-xl -z-10" />
    </div>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 50);
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const isHome = pathname === '/';
  const headerClasses = cn(
    'fixed top-0 z-50 w-full transition-all duration-300',
    isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent',
    isHome && !isScrolled ? 'text-white' : 'text-foreground'
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-20 md:h-24 items-center justify-between px-4 md:px-6">

        <Link
          href="/"
          className="flex items-center justify-center p-1 transition-transform hover:scale-105"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative font-semibold transition-colors hover:text-primary",
                isHome && !isScrolled ? "text-white/80 hover:text-white" : "text-foreground/80",
                "after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-full after:bg-primary after:transition-transform after:duration-300 after:scale-x-0 after:origin-center hover:after:scale-x-100",
                pathname === link.href ? "text-primary after:scale-x-100" : ""
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild>
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open mobile menu"
                className={cn(
                  "p-2",
                  isHome && !isScrolled
                    ? "text-white hover:text-white hover:bg-white/10"
                    : "text-foreground"
                )}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] bg-background flex flex-col p-6">
              <SheetHeader>
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
              </SheetHeader>

              <div className="mb-8 mt-2">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="flex items-center justify-center p-1 transition-transform hover:scale-105"
                  >
                    <Logo className="h-20" />
                  </Link>
                </SheetClose>
              </div>

              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-lg font-semibold transition-colors",
                        pathname === link.href
                          ? "text-primary"
                          : "text-foreground/80 hover:text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <hr className="my-6 border-t border-muted" />

              <div className="mt-auto">
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href="/contact">
                      Get a Quote
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
