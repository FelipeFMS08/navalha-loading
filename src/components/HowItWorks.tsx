"use client";

import { motion } from "motion/react";

const STEPS = [
  {
    n: "01",
    title: "Você instala em 4 minutos",
    desc: "Cadastro no celular, importa sua agenda atual ou começa do zero. Seu catálogo de serviços já vem sugerido.",
  },
  {
    n: "02",
    title: "Seus clientes agendam sozinhos",
    desc: "Link único. Eles escolhem barbeiro, horário e pagam o sinal. Você dorme em paz.",
  },
  {
    n: "03",
    title: "A navalha faz o resto",
    desc: "Lembretes automáticos, fila inteligente, comissão calculada. Foco no corte, o software some.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl font-display text-5xl leading-[0.95] tracking-tight md:text-7xl"
      >
        <span className="text-gradient">Três passos.</span>{" "}
        <span className="italic text-gradient-accent">Zero fricção.</span>
      </motion.h2>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className="relative rounded-3xl border border-white/5 bg-surface/40 p-8 transition-colors hover:border-white/15"
          >
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent/80">
              Passo {s.n}
            </div>
            <div className="mt-6 font-display text-7xl leading-none text-gradient-accent">
              {s.n}
            </div>
            <h3 className="mt-8 text-xl font-medium leading-tight tracking-tight">
              {s.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/60">
              {s.desc}
            </p>
            {i < STEPS.length - 1 && (
              <div className="absolute right-6 top-6 hidden text-foreground/20 md:block">
                <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
                  <path
                    d="M2 8h34m0 0-6-6m6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
