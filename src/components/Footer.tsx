"use client";

import { Scissors } from "lucide-react";

export function Footer() {
  const links = {
    Produto: ["Recursos", "StyleMatch AI", "Preços", "Mudanças", "Roadmap"],
    Empresa: ["Sobre", "Carreiras", "Blog", "Imprensa"],
    Suporte: ["Central de ajuda", "Comunidade", "Contato", "Status"],
    Legal: ["Privacidade", "Termos", "LGPD"],
  };

  return (
    <footer className="relative border-t border-white/5 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.2fr_2fr] md:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2">
              <Scissors className="h-4 w-4 text-black" strokeWidth={2.4} />
            </span>
            <span className="font-display text-2xl tracking-tight">
              Navalha<span className="text-accent">.</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-foreground/60">
            O agendamento invisível pra quem leva a barbearia a sério.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {["IG", "TT", "YT", "IN"].map((s) => (
              <a
                key={s}
                href="#"
                data-cursor="hover"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-xs font-medium text-foreground/60 transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(links).map(([k, v]) => (
            <div key={k}>
              <div className="text-xs uppercase tracking-[0.2em] text-foreground/50">
                {k}
              </div>
              <ul className="mt-4 space-y-2.5">
                {v.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      data-cursor="hover"
                      className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-xs text-foreground/40 md:px-8">
          <span>© 2026 Navalha Tech Ltda. Todos os direitos reservados.</span>
          <span className="font-mono">made in 🇧🇷 with sharp love</span>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="pointer-events-none relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="font-display text-[clamp(6rem,22vw,20rem)] leading-[0.85] tracking-tighter text-gradient-accent opacity-10">
            NAVALHA.
          </div>
        </div>
      </div>
    </footer>
  );
}
