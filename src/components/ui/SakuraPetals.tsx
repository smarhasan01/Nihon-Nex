"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export function SakuraPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Generate 12 gentle drifting petals
    const newPetals = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 95,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      size: 14 + Math.random() * 12,
    }));
    setPetals(newPetals);
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute opacity-0 animate-petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            width: `${petal.size}px`,
            height: `${petal.size * 0.75}px`,
          }}
        >
          <svg
            viewBox="0 0 30 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full transform rotate-12"
          >
            <path
              d="M 15 0 C 25 2, 30 10, 22 18 C 14 22, 6 16, 2 12 C -2 8, 5 0, 15 0 Z"
              fill="#FFB7C5"
              fillOpacity="0.45"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
