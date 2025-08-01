
'use client';
import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  style: React.CSSProperties;
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // This code now runs only on the client, after the initial render.
    const generateParticles = () => {
      return Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 10 + 5}s`,
        },
      }));
    };
    setParticles(generateParticles());
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/20 animate-particle"
          style={particle.style}
        />
      ))}
    </div>
  );
}
