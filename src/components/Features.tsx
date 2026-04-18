"use client";

import { motion } from "motion/react";
import {
  CalendarCheck,
  MessageSquareText,
  CreditCard,
  Users,
  BarChart3,
  BellRing,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Feature = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  className: string;
  visual: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    icon: CalendarCheck,
    title: "Agenda viva",
    desc: "Drag-and-drop, bloqueios inteligentes e sincronização com Google Calendar em tempo real.",
    className: "md:col-span-2 md:row-span-2",
    visual: <CalendarVisual />,
  },
  {
    icon: MessageSquareText,
    title: "Lembrete no WhatsApp",
    desc: "Confirmação automática 24h antes. Reduza no-shows em até 72%.",
    className: "md:col-span-1",
    visual: <WhatsAppVisual />,
  },
  {
    icon: CreditCard,
    title: "Pagamento no clique",
    desc: "Pix, crédito e sinal. Dinheiro cai antes da tesoura.",
    className: "md:col-span-1",
    visual: <PaymentVisual />,
  },
  {
    icon: Users,
    title: "Equipe & Comissão",
    desc: "Cada barbeiro com sua agenda, meta e comissão automática.",
    className: "md:col-span-1",
    visual: <TeamVisual />,
  },
  {
    icon: BarChart3,
    title: "Relatórios que cortam",
    desc: "Ticket médio, horários quentes, serviços campeões. Tudo num dashboard que respira.",
    className: "md:col-span-1",
    visual: <ChartVisual />,
  },
  {
    icon: BellRing,
    title: "Fila inteligente",
    desc: "Clientes entram na fila virtual e recebem push quando o barbeiro tá pronto.",
    className: "md:col-span-2",
    visual: <QueueVisual />,
  },
];

export function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="mb-14 flex items-end justify-between gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-accent/80"
          >
            Tudo numa navalha só
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl"
          >
            <span className="text-gradient">O SaaS que </span>
            <span className="italic text-gradient-accent">não é SaaS.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-xl text-foreground/60"
          >
            É um software, sim — mas feito pra sumir no fundo. A Navalha
            trabalha com você, não contra você.
          </motion.p>
        </div>
      </div>

      <div className="grid auto-rows-[240px] grid-cols-1 gap-4 md:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.article
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            onMouseMove={(e) => {
              const el = e.currentTarget as HTMLElement;
              const r = el.getBoundingClientRect();
              el.style.setProperty("--mx", `${e.clientX - r.left}px`);
              el.style.setProperty("--my", `${e.clientY - r.top}px`);
            }}
            className={cn(
              "spotlight group relative overflow-hidden rounded-3xl border border-white/5 bg-surface/60 p-6 transition-colors hover:border-white/20",
              f.className
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex h-full flex-col">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-foreground/5 ring-1 ring-white/10">
                  <f.icon className="h-5 w-5 text-accent-2" />
                </span>
                <h3 className="text-lg font-medium tracking-tight">
                  {f.title}
                </h3>
              </div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/60">
                {f.desc}
              </p>
              <div className="relative mt-auto flex-1">{f.visual}</div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function CalendarVisual() {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const slots = Array.from({ length: 42 });
  const booked = new Set([3, 4, 10, 11, 17, 18, 25, 26, 33]);
  const now = 18;
  return (
    <div className="mt-6 grid h-full grid-cols-7 gap-1.5">
      {days.map((d, idx) => (
        <div
          key={`${d}-${idx}`}
          className="text-center font-mono text-[10px] uppercase tracking-wider text-foreground/40"
        >
          {d}
        </div>
      ))}
      {slots.map((_, i) => {
        const isBooked = booked.has(i);
        const isNow = i === now;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.005, duration: 0.3 }}
            className={cn(
              "aspect-square rounded-md",
              isNow
                ? "bg-gradient-to-br from-accent to-accent-2 shadow-[0_0_20px_rgba(255,91,26,0.6)]"
                : isBooked
                ? "bg-white/10"
                : "bg-white/[0.03]"
            )}
          />
        );
      })}
    </div>
  );
}

function WhatsAppVisual() {
  return (
    <div className="mt-6 space-y-2">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white/5 px-3 py-2 text-xs text-foreground/80"
      >
        Oi João! Seu corte é amanhã às 15h 💈
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="ml-auto max-w-[70%] rounded-2xl rounded-br-sm bg-gradient-to-br from-emerald-500/30 to-emerald-400/20 px-3 py-2 text-xs text-foreground/90 ring-1 ring-emerald-400/30"
      >
        Confirmado! ✓
      </motion.div>
    </div>
  );
}

function PaymentVisual() {
  return (
    <div className="relative mt-6 h-full">
      <motion.div
        initial={{ rotate: -8, y: 10 }}
        whileInView={{ rotate: -4, y: 0 }}
        viewport={{ once: true }}
        className="absolute inset-x-4 top-4 rounded-xl bg-gradient-to-br from-accent to-accent-2 p-3 shadow-xl"
      >
        <div className="flex items-center justify-between text-[10px] font-medium text-black/80">
          <span>NAVALHA PAY</span>
          <span className="font-mono">04/28</span>
        </div>
        <div className="mt-4 font-mono text-xs text-black">
          •••• 1122
        </div>
        <div className="mt-1 text-[10px] font-medium text-black/70">
          R$ 85,00
        </div>
      </motion.div>
      <motion.div
        initial={{ scale: 0, rotate: -12 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: "spring" }}
        className="absolute bottom-2 right-0 rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/40"
      >
        Pago ✓
      </motion.div>
    </div>
  );
}

function TeamVisual() {
  const members = [
    { name: "Lucas", color: "#ff5b1a" },
    { name: "Bia", color: "#ffe14d" },
    { name: "Téo", color: "#1960ff" },
    { name: "Caio", color: "#c79a4a" },
  ];
  return (
    <div className="mt-6 space-y-2">
      {members.map((m, i) => (
        <motion.div
          key={m.name}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center gap-2"
        >
          <div
            className="h-6 w-6 rounded-full"
            style={{ background: `linear-gradient(135deg, ${m.color}, #222)` }}
          />
          <div className="flex-1 text-xs text-foreground/70">{m.name}</div>
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${40 + i * 15}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.8 }}
              className="h-full"
              style={{ background: m.color }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ChartVisual() {
  const bars = [30, 55, 40, 80, 65, 95, 70];
  return (
    <div className="mt-6 flex h-full items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.6, ease: "easeOut" }}
          className="flex-1 rounded-t-md bg-gradient-to-t from-accent/30 to-accent-2/70"
        />
      ))}
    </div>
  );
}

function QueueVisual() {
  const people = ["Rafa", "Joana", "Caio", "Milla", "Zé"];
  return (
    <div className="mt-4 flex items-center gap-2">
      {people.map((p, i) => (
        <motion.div
          key={p}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={cn(
            "glass flex items-center gap-2 rounded-full px-3 py-1.5 text-xs",
            i === 0 && "ring-1 ring-accent"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              i === 0 ? "animate-pulse bg-accent" : "bg-foreground/40"
            )}
          />
          {p}
          {i === 0 && (
            <span className="font-mono text-[10px] text-accent-2">agora</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
