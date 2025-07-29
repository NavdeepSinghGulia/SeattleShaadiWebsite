
'use client';

import { useState, useEffect, RefObject } from 'react';

export function useOnScreen(ref: RefObject<Element>, rootMargin: string = '0px'): boolean {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setIntersecting(true);
            // Stop observing once it's visible
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        }
      },
      {
        rootMargin,
      }
    );
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
        if (currentRef) {
            observer.unobserve(currentRef);
        }
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}
