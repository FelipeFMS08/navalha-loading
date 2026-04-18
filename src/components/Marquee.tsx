"use client";

import { Scissors } from "lucide-react";

const ITEMS = [
  "Barbearia do Zé",
  "The Gentleman's Club",
  "Barba & Co.",
  "Navalha Estúdio",
  "BlackBeard Shop",
  "Royal Cuts",
  "Caliber Barber",
  "Lamina Dourada",
  "Old School BCO",
];

export function Marquee() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-surface/40 py-6">
      <div className="flex whitespace-nowrap">
        <div className="marquee flex shrink-0 items-center gap-12 pr-12">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-foreground/40"
            >
              <Scissors className="h-4 w-4" />
              <span className="font-display text-2xl tracking-tight">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
