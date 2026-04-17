"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

type Plan = {
  name: string;
  price: { monthly: number; yearly: number };
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Solo",
    price: { monthly: 49, yearly: 39 },
    tagline: "Pra quem corta sozinho.",
    features: [
      "Agenda ilimitada",
      "Lembretes via WhatsApp",
      "Pagamento via Pix",
      "Relatórios básicos",
    ],
    cta: "Começar grátis",
  },
  {
    name: "Barbearia",
    price: { monthly: 99, yearly: 79 },
    tagline: "Pro time, pra faturar.",
    features: [
      "Tudo do Solo",
      "Até 10 barbeiros",
      "StyleMatch AI",
      "Fila inteligente",
      "Comissão automática",
      "Suporte prioritário",
    ],
    cta: "Começar grátis",
    featured: true,
  },
  {
    name: "Franquia",
    price: { monthly: 299, yearly: 249 },
    tagline: "Pra quem pensa em rede.",
    features: [
      "Tudo do Barbearia",
      "Multi-unidades ilimitadas",
      "API e Webhooks",
      "White-label app",
      "Gerente de sucesso dedicado",
    ],
    cta: "Falar com vendas",
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-accent/80"
        >
          Preços
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-3 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl"
        >
          <span className="text-gradient">Simples como </span>
          <span className="italic text-gradient-accent">um fade.</span>
        </motion.h2>

        {/* Toggle */}
        <div className="mt-10 inline-flex items-center gap-1 rounded-full border border-white/10 bg-surface/60 p-1">
          <button
            data-cursor="hover"
            onClick={() => setYearly(false)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm transition-colors",
              !yearly
                ? "bg-foreground text-background"
                : "text-foreground/60 hover:text-foreground"
            )}
          >
            Mensal
          </button>
          <button
            data-cursor="hover"
            onClick={() => setYearly(true)}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors",
              yearly
                ? "bg-foreground text-background"
                : "text-foreground/60 hover:text-foreground"
            )}
          >
            Anual
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                yearly
                  ? "bg-accent/20 text-accent-2"
                  : "bg-accent text-background"
              )}
            >
              -20%
            </span>
          </button>
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className={cn(
              "relative rounded-3xl p-8 transition-all",
              plan.featured
                ? "shimmer bg-gradient-to-b from-surface-2 to-surface"
                : "border border-white/5 bg-surface/40 hover:border-white/15"
            )}
          >
            {plan.featured && (
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-black">
                  Mais popular
                </div>
              </div>
            )}
            <h3 className="font-display text-3xl tracking-tight">
              {plan.name}
            </h3>
            <p className="mt-1 text-sm text-foreground/60">{plan.tagline}</p>

            <div className="mt-8 flex items-baseline gap-1">
              <span className="font-display text-6xl tracking-tight">
                R${yearly ? plan.price.yearly : plan.price.monthly}
              </span>
              <span className="text-sm text-foreground/50">/mês</span>
            </div>
            {yearly && (
              <div className="text-xs text-foreground/40">
                cobrado anualmente
              </div>
            )}

            <a
              href="#cta"
              data-cursor="hover"
              className={cn(
                "mt-8 block rounded-full py-3 text-center text-sm font-medium transition-all active:scale-[0.98]",
                plan.featured
                  ? "bg-foreground text-background shadow-[0_10px_40px_-10px_rgba(255,91,26,0.6)]"
                  : "border border-white/15 text-foreground hover:border-foreground/40"
              )}
            >
              {plan.cta}
            </a>

            <ul className="mt-8 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-2" />
                  <span className="text-foreground/80">{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-foreground/40">
        14 dias grátis em todos os planos. Sem cartão de crédito.
      </p>
    </section>
  );
}
