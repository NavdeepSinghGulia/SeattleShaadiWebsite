'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function InteractiveCtaButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      asChild
      size="lg"
      className="mt-8 relative overflow-hidden group animate-glow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href="/contact">
        <span className="relative z-10 transition-colors duration-300 group-hover:text-primary-foreground">
          Let's Talk
        </span>
        <div
          className={cn(
            'absolute inset-0 bg-primary transition-all duration-500 ease-in-out',
            isHovered ? 'w-full' : 'w-0'
          )}
        />
        {isHovered &&
          Array(10)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="absolute bg-accent rounded-full animate-mala"
                style={{
                  width: '20px',
                  height: '20px',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
      </Link>
    </Button>
  );
}
