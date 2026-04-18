"use client";

import { motion } from "motion/react";

const ITEMS = [
  {
    quote:
      "Em 3 meses minha barbearia triplicou o faturamento. O StyleMatch vendeu cortes que eu nunca tinha pensado em oferecer.",
    name: "Téo Pereira",
    role: "Dono, Navalha Estúdio · SP",
  },
  {
    quote:
      "A fila inteligente acabou com cliente bravo na porta. Todo mundo sabe quando é a vez dele. Paz na shop.",
    name: "Lucas Andrade",
    role: "Master Barber, BlackBeard · RJ",
  },
  {
    quote:
      "Eu odiava Excel. Hoje eu só abro o app, vejo comissão do mês, pago o time e volto pra tesoura.",
    name: "Bianca Rocha",
    role: "Sócia, Royal Cuts · Curitiba",
  },
  {
    quote:
      "O design dessa plataforma é ridículo de bonito. Meus clientes elogiam o agendamento. Agendamento!",
    name: "Caio Nunes",
    role: "Barber, Caliber · BH",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl font-display text-5xl leading-[0.95] tracking-tight md:text-7xl"
      >
        <span className="text-gradient">Barbeiros que </span>
        <span className="italic text-gradient-accent">viraram fãs.</span>
      </motion.h2>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {ITEMS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-surface/40 p-8 transition-colors hover:border-white/15"
          >
            <div className="absolute -left-8 -top-8 font-display text-[220px] leading-none text-white/[0.03] transition-colors group-hover:text-accent/10">
              “
            </div>
            <blockquote className="relative font-display text-2xl leading-tight tracking-tight text-foreground/90 md:text-3xl">
              {t.quote}
            </blockquote>
            <figcaption className="relative mt-8 flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full"
                style={{
                  background: `conic-gradient(from ${i * 90}deg, #ff5b1a, #ffe14d, #c79a4a, #ff5b1a)`,
                }}
              />
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-foreground/50">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
