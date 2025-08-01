
'use client';
import { useMemo } from 'react';

export function FloatingParticles() {
  const particles = useMemo(() => Array.from({ length: 25 }), []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/20 animate-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 5}s`,
          }}
        />
      ))}
    </div>
  );
}
