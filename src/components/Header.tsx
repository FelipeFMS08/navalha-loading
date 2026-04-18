"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Scissors } from "lucide-react";

const NAV = [
  { label: "Produto", href: "#features" },
  { label: "StyleMatch", href: "#stylematch" },
  { label: "TryCut", href: "#trycut" },
  { label: "Preços", href: "#pricing" },
  { label: "Clientes", href: "#testimonials" },
];

export function Header() {
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 100], [0, 18]);
  const bg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(7,7,10,0)", "rgba(7,7,10,0.72)"]
  );
  const border = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]
  );

  return (
    <motion.header
      style={{
        backdropFilter: useTransform(blur, (v) => `blur(${v}px) saturate(140%)`),
        WebkitBackdropFilter: useTransform(
          blur,
          (v) => `blur(${v}px) saturate(140%)`
        ),
        backgroundColor: bg,
        borderBottom: useTransform(border, (v) => `1px solid ${v}`),
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="#home" className="group flex items-center gap-2">
          <motion.span
            whileHover={{ rotate: -20 }}
            className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2"
          >
            <Scissors className="h-4 w-4 text-black" strokeWidth={2.4} />
          </motion.span>
          <span className="font-display text-xl tracking-tight">
            Navalha<span className="text-accent">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                data-cursor="hover"
                className="relative rounded-full px-3 py-1.5 text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="#login"
            data-cursor="hover"
            className="hidden rounded-full px-4 py-2 text-sm text-foreground/80 transition-colors hover:text-foreground sm:inline-flex"
          >
            Entrar
          </Link>
          <Link
            href="#cta"
            data-cursor="hover"
            className="group relative inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform active:scale-95"
          >
            Começar grátis
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
