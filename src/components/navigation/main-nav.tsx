'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const MainNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'About',
      href: '/about',
    },
    {
      name: 'Services',
      href: '/services',
      children: [
        {
          name: 'Hindu Wedding Planning',
          href: '/services/hindu-wedding-planning',
          description: 'Traditional Hindu wedding planning services in Seattle',
        },
        {
          name: 'Sikh Wedding Planning',
          href: '/services/sikh-wedding-planning',
          description: 'Authentic Sikh wedding planning and coordination',
        },
        {
          name: 'Muslim Wedding Planning',
          href: '/services/muslim-indian-wedding-planning',
          description: 'Muslim wedding planning with cultural sensitivity',
        },
        {
          name: 'South Indian Wedding Planning',
          href: '/services/tamil-wedding-planning',
          description: 'South Indian wedding traditions and planning',
        },
        {
          name: 'Budget Wedding Planning',
          href: '/services/budget-indian-wedding-30k',
          description: 'Affordable luxury Indian weddings in Seattle',
        },
        {
          name: 'Venue Selection',
          href: '/services/venue-selection',
          description: 'Find the perfect venue for your Indian wedding',
        },
      ],
    },
    {
      name: 'Portfolio',
      href: '/work',
    },
    {
      name: 'Resources',
      href: '#',
      children: [
        {
          name: 'Wedding Calculator',
          href: '/wedding-calculator',
          description: 'Plan your wedding budget with our interactive calculator',
        },
        {
          name: 'Wedding Traditions',
          href: '/traditions',
          description: 'Explore Indian wedding traditions and customs',
        },
        {
          name: 'Photo Gallery',
          href: '/gallery',
          description: 'Browse our gallery of stunning Indian weddings',
        },
        {
          name: 'Blog',
          href: '/blog',
          description: 'Articles and guides for planning your Indian wedding',
        },
        {
          name: 'FAQ',
          href: '/faq',
          description: 'Answers to common questions about our services',
        },
      ],
    },
    {
      name: 'Contact',
      href: '/contact',
    },
  ];

  return (
    <div className="flex items-center">
      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {routes.map((route) => {
              if (route.children) {
                return (
                  <NavigationMenuItem key={route.name}>
                    <NavigationMenuTrigger
                      className={cn(
                        'text-sm font-medium transition-colors hover:text-primary',
                        pathname === route.href
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      )}
                    >
                      {route.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {route.children.map((child) => (
                          <ListItem
                            key={child.name}
                            title={child.name}
                            href={child.href}
                            className={cn(
                              pathname === child.href && 'text-primary'
                            )}
                          >
                            {child.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }

              return (
                <NavigationMenuItem key={route.name}>
                  <Link href={route.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'text-sm font-medium transition-colors hover:text-primary',
                        pathname === route.href
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      )}
                    >
                      {route.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {routes.map((route) => {
                if (route.children) {
                  return (
                    <div key={route.name} className="space-y-3">
                      <div className="font-medium text-lg">{route.name}</div>
                      <div className="pl-4 border-l border-border space-y-2">
                        {route.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              'block text-sm transition-colors hover:text-primary',
                              pathname === child.href
                                ? 'text-primary'
                                : 'text-muted-foreground'
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={route.name}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-lg font-medium transition-colors hover:text-primary',
                      pathname === route.href
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    {route.name}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default MainNav;

