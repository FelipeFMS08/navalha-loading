"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section id="cta" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-surface-2 px-6 py-20 text-center md:py-28"
      >
        <div className="aurora opacity-80" aria-hidden />
        <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 shadow-[0_20px_60px_-10px_rgba(255,91,26,0.8)]"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="6" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <line x1="20" y1="4" x2="8.12" y2="15.88" />
              <line x1="14.47" y1="14.48" x2="20" y2="20" />
              <line x1="8.12" y1="8.12" x2="12" y2="12" />
            </svg>
          </motion.div>

          <h2 className="mx-auto max-w-3xl font-display text-5xl leading-[0.95] tracking-tight md:text-8xl">
            <span className="text-gradient">Hora de </span>
            <span className="italic text-gradient-accent">afiar a navalha.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-foreground/70">
            Comece hoje. 14 dias grátis, sem cartão. Em 4 minutos sua agenda tá
            rodando.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-transform active:scale-[0.98]"
            >
              Quero cortar com a Navalha
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-4 text-sm text-foreground/90 transition-colors hover:border-foreground/50"
            >
              Agendar demo com especialista
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-foreground/40">
            <span>✓ Sem cartão de crédito</span>
            <span>✓ Migração gratuita</span>
            <span>✓ Cancele quando quiser</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
