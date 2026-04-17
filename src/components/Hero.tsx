"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";

const BarberScene = dynamic(
  () => import("./BarberScene").then((m) => m.BarberScene),
  { ssr: false }
);

const words = ["Agende.", "Corte.", "Repita."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-20"
    >
      <div className="aurora" aria-hidden />
      <div className="grid-bg absolute inset-0" aria-hidden />

      {/* 3D scene, absolutely positioned on the right */}
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <BarberScene />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-8"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide"
          >
            <span className="relative grid h-4 w-4 place-items-center">
              <span className="absolute inset-0 rounded-full bg-accent/60 blur-[4px]" />
              <Sparkles className="relative h-3 w-3 text-accent-2" />
            </span>
            Nova geração de agendamento · v3 lançamento 2026
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] tracking-tight">
            {words.map((w, i) => (
              <motion.span
                key={w}
                initial={{ y: "110%", opacity: 0, filter: "blur(14px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + i * 0.12,
                  ease: [0.2, 0.9, 0.2, 1],
                }}
                className="block overflow-hidden"
              >
                <span
                  className={
                    i === 1 ? "italic text-gradient-accent" : "text-gradient"
                  }
                >
                  {w}
                </span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-7 max-w-xl text-pretty text-base text-foreground/70 md:text-lg"
          >
            A plataforma invisível que organiza a agenda da sua barbearia,
            encanta clientes e devolve horas do seu dia. Sem fila. Sem estresse.
            Só corte.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#cta"
              data-cursor="hover"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-[0_10px_40px_-10px_rgba(255,91,26,0.6)] transition-transform active:scale-[0.98]"
            >
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:translate-y-0" />
              <span className="relative">Começar grátis — 14 dias</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#demo"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm text-foreground/85 transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <PlayCircle className="h-4 w-4" /> Ver demo (1:23)
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-10 flex items-center gap-6 text-xs text-foreground/50"
          >
            <div className="flex -space-x-2">
              {["#ff5b1a", "#ffe14d", "#c79a4a", "#1960ff"].map((c, i) => (
                <span
                  key={i}
                  className="h-7 w-7 rounded-full border-2 border-background"
                  style={{
                    background: `linear-gradient(135deg, ${c}, #111)`,
                  }}
                />
              ))}
            </div>
            <div>
              <div className="font-medium text-foreground/80">
                +3.200 barbearias
              </div>
              <div>agendando na Navalha agora</div>
            </div>
          </motion.div>
        </div>

        {/* Right column intentionally empty — 3D scene fills it */}
        <div className="relative hidden md:block" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs text-foreground/50"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono uppercase tracking-[0.3em]">
            deslize
          </span>
          <div className="h-10 w-[1px] animate-pulse bg-gradient-to-b from-foreground/60 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
