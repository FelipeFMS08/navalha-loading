"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Wand2, RefreshCw } from "lucide-react";

const STYLES = [
  {
    id: "fade",
    name: "Low Fade",
    desc: "Limpo, clássico, atemporal.",
    gradient: "from-orange-400 via-rose-500 to-purple-700",
    match: 94,
  },
  {
    id: "undercut",
    name: "Undercut Texturizado",
    desc: "Volume em cima, navalhado no lado.",
    gradient: "from-amber-300 via-orange-500 to-rose-600",
    match: 88,
  },
  {
    id: "buzz",
    name: "Buzz Cut Militar",
    desc: "Direto ao ponto. Baixa manutenção.",
    gradient: "from-yellow-300 via-lime-400 to-emerald-500",
    match: 71,
  },
  {
    id: "pompa",
    name: "Pompadour Moderno",
    desc: "Retrô com pegada 2026.",
    gradient: "from-cyan-400 via-sky-500 to-indigo-700",
    match: 82,
  },
];

export function StyleMatch() {
  const [active, setActive] = useState(0);
  const [scanning, setScanning] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), {
    stiffness: 200,
    damping: 20,
  });

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setScanning(true);
      setTimeout(() => {
        setActive((a) => (a + 1) % STYLES.length);
        setScanning(false);
      }, 900);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px);
    my.set(py);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const style = STYLES[active];

  const regenerate = () => {
    setScanning(true);
    setTimeout(() => {
      setActive((a) => (a + 1) % STYLES.length);
      setScanning(false);
    }, 900);
  };

  return (
    <section
      id="stylematch"
      className="relative mx-auto max-w-7xl overflow-hidden px-5 py-24 md:px-8 md:py-32"
    >
      <div className="aurora opacity-40" aria-hidden />

      <div className="relative grid items-center gap-12 md:grid-cols-[1fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium tracking-wide text-accent-2"
          >
            <Sparkles className="h-3 w-3" /> Surpresa · Exclusivo Navalha
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-5 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl"
          >
            <span className="text-gradient">Conheça o </span>
            <span className="italic text-gradient-accent">StyleMatch AI.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-lg text-foreground/70"
          >
            Seu cliente escolhe o estilo antes de entrar na cadeira. Nossa IA
            analisa o formato do rosto, curvatura do cabelo e tendências 2026
            para sugerir o corte perfeito. Em segundos, ele vê o resultado num
            holograma 3D — e você recebe o pedido pronto no tablet.
          </motion.p>

          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Análise facial em 0.3s — sem upload, tudo local no navegador.",
              "Biblioteca com +400 cortes curados por barbeiros premiados.",
              "O cliente aprova antes de sentar. Zero re-trabalho.",
            ].map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-3 text-foreground/80"
              >
                <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-accent/15 text-accent-2">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                {t}
              </motion.li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={regenerate}
            data-cursor="hover"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium transition-colors hover:border-white/30"
          >
            <Wand2 className="h-4 w-4 text-accent-2" />
            Gerar novo match
            <RefreshCw
              className={`h-3.5 w-3.5 text-foreground/60 transition-transform ${
                scanning ? "animate-spin" : ""
              }`}
            />
          </motion.button>
        </div>

        <motion.div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
          data-cursor="hover"
          className="relative mx-auto aspect-[4/5] w-full max-w-md"
        >
          {/* Ambient glow */}
          <div
            className={`absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br ${style.gradient} opacity-40 blur-3xl transition-all duration-700`}
          />

          <div className="shimmer relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface/60 p-6 backdrop-blur-xl">
            {/* Top HUD */}
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/50">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                STYLEMATCH · LIVE
              </span>
              <span className="font-mono">v3.1.0</span>
            </div>

            {/* Holographic face silhouette */}
            <div className="relative mx-auto mt-4 aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-black to-surface-2 ring-1 ring-white/10">
              <div className="absolute inset-0 grid-bg opacity-50" />

              {/* Face silhouette */}
              <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-0 h-full w-full"
                animate={{
                  filter: scanning
                    ? "hue-rotate(220deg) blur(4px)"
                    : "hue-rotate(0deg) blur(0px)",
                }}
                transition={{ duration: 0.6 }}
              >
                <defs>
                  <linearGradient
                    id="face-grad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ff5b1a" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ffe14d" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {/* Hair outline — morphs per style */}
                <AnimatePresence mode="wait">
                  <motion.path
                    key={style.id}
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    d={hairPaths[style.id as keyof typeof hairPaths]}
                    fill="none"
                    stroke="url(#face-grad)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </AnimatePresence>
                {/* Face */}
                <ellipse
                  cx="100"
                  cy="115"
                  rx="36"
                  ry="48"
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1"
                />
                <circle
                  cx="88"
                  cy="105"
                  r="2"
                  fill="rgba(255,255,255,0.7)"
                />
                <circle
                  cx="112"
                  cy="105"
                  r="2"
                  fill="rgba(255,255,255,0.7)"
                />
                <path
                  d="M90 130 Q100 138 110 130"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                {/* Scan grid */}
                <motion.path
                  d="M20 100 L180 100"
                  stroke="#ffe14d"
                  strokeWidth="0.8"
                  strokeDasharray="2 4"
                  animate={{ y: [-70, 70, -70] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  opacity={0.7}
                />
              </motion.svg>

              {/* Scanning overlay */}
              <AnimatePresence>
                {scanning && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-accent/10 backdrop-blur-[2px]"
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs uppercase tracking-[0.3em] text-accent-2">
                      analisando…
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Info */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                <span>sugestão</span>
                <span className="font-mono">#{active + 1}/04</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={style.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mt-2"
                >
                  <div className="font-display text-3xl tracking-tight">
                    {style.name}
                  </div>
                  <div className="mt-1 text-sm text-foreground/60">
                    {style.desc}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Match bar */}
              <div className="mt-4 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    key={style.id + "-bar"}
                    initial={{ width: 0 }}
                    animate={{ width: `${style.match}%` }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-accent to-accent-2"
                  />
                </div>
                <span className="font-mono text-xs tabular-nums text-accent-2">
                  {style.match}%
                </span>
              </div>
            </div>

            {/* Tiny style picker */}
            <div className="mt-5 flex gap-2">
              {STYLES.map((s, i) => (
                <button
                  key={s.id}
                  data-cursor="hover"
                  onClick={() => setActive(i)}
                  className={`relative h-8 flex-1 overflow-hidden rounded-lg transition-all ${
                    i === active
                      ? "ring-2 ring-accent"
                      : "opacity-40 hover:opacity-100"
                  }`}
                  aria-label={s.name}
                >
                  <span
                    className={`absolute inset-0 bg-gradient-to-br ${s.gradient}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const hairPaths = {
  fade:
    "M65 90 Q65 55 100 52 Q135 55 135 90 L132 98 Q130 80 120 75 L100 72 L80 75 Q70 80 68 98 Z",
  undercut:
    "M68 92 Q60 40 110 42 Q138 48 140 72 L138 88 Q130 60 110 55 Q95 52 90 72 L85 95 Z",
  buzz:
    "M72 88 Q72 68 100 66 Q128 68 128 88 L126 94 Q120 80 100 78 Q80 80 74 94 Z",
  pompa:
    "M70 92 Q50 50 95 38 Q125 32 142 58 Q145 80 135 95 Q132 65 115 55 Q95 50 85 70 L78 95 Z",
};
