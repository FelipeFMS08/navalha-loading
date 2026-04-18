"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";

function CountUp({
  to,
  suffix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const value = useMotionValue(0);
  const display = useTransform(value, (v) =>
    v.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
  const inView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration: 1.6, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, to, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

const STATS = [
  { label: "Horas por semana devolvidas", value: 14, suffix: "h" },
  { label: "Redução de no-shows", value: 72, suffix: "%" },
  { label: "Clientes satisfeitos", value: 4.9, suffix: "/5", decimals: 1 },
  { label: "Barbearias ativas", value: 3200, suffix: "+" },
];

export function Stats() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-6 md:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="glass rounded-2xl p-6"
          >
            <div className="font-display text-5xl md:text-6xl tracking-tight text-gradient">
              <CountUp
                to={s.value}
                suffix={s.suffix}
                decimals={s.decimals ?? 0}
              />
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.2em] text-foreground/50">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
