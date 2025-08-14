'use client';
import React from 'react';
import { AnimatedDiv } from '@/components/animated-div';
import { ShimmerEffect } from '@/components/shimmer-effect';

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function PageHeading({
  title,
  subtitle,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
}: PageHeadingProps) {
  return (
    <div className={`text-center mb-12 pb-6 ${className}`}>
      <AnimatedDiv animation="royalEntrance">
        <ShimmerEffect>
          <h1 className={`font-headline text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 bg-clip-text text-transparent leading-normal drop-shadow-sm pb-3 ${titleClassName}`}>
            {title}
          </h1>
        </ShimmerEffect>
      </AnimatedDiv>
      {subtitle && (
        <AnimatedDiv delay={300} animation="fadeInScale">
          <p className={`mt-4 max-w-3xl mx-auto text-lg text-muted-foreground pb-2 ${subtitleClassName}`}>
            {subtitle}
          </p>
        </AnimatedDiv>
      )}
    </div>
  );
}
