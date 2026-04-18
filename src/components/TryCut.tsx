"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, Download, Scissors, Sparkles, Upload, Wand2 } from "lucide-react";

// Hair overlays — SVG paths centered on a 200x200 viewBox where the face
// sits at cx=100 cy=115 rx=36 ry=48. Tuned to look like a dark silhouette
// that sits on top of a photo at normalized coordinates.
const CUTS = [
  {
    id: "fade",
    name: "Low Fade",
    tag: "clássico",
    accent: "#ff5b1a",
    path: "M66 90 Q66 54 100 50 Q134 54 134 90 Q136 102 130 105 Q130 82 120 74 L100 70 L80 74 Q70 82 70 105 Q64 102 66 90 Z",
  },
  {
    id: "undercut",
    name: "Undercut Texturizado",
    tag: "moderno",
    accent: "#ff9b21",
    path: "M68 95 Q58 36 112 38 Q142 46 144 72 L142 92 Q134 60 112 54 Q94 50 88 74 L84 100 Q74 102 68 95 Z",
  },
  {
    id: "buzz",
    name: "Buzz Cut",
    tag: "militar",
    accent: "#ffe14d",
    path: "M72 92 Q72 68 100 64 Q128 68 128 92 Q128 98 124 98 Q120 80 100 78 Q80 80 76 98 Q72 98 72 92 Z",
  },
  {
    id: "pompa",
    name: "Pompadour",
    tag: "retrô",
    accent: "#ff1f6b",
    path: "M66 92 Q46 46 96 32 Q132 26 148 58 Q152 84 138 98 Q132 64 114 52 Q94 48 84 70 L76 100 Q68 102 66 92 Z",
  },
  {
    id: "curls",
    name: "Curls Naturais",
    tag: "volume",
    accent: "#c79a4a",
    path: "M60 95 Q52 42 100 40 Q148 42 140 95 Q142 110 128 108 Q132 78 116 68 Q118 80 108 76 Q110 86 96 80 Q102 90 86 84 Q94 96 78 92 Q84 102 70 100 Q66 108 60 95 Z",
  },
  {
    id: "mohawk",
    name: "Mohawk Suave",
    tag: "ousado",
    accent: "#1960ff",
    path: "M88 90 Q78 30 100 20 Q122 30 112 90 Q112 98 108 98 L106 70 Q100 66 94 70 L92 98 Q88 98 88 90 Z",
  },
];

const DEMO_FACES = [
  // three procedurally styled demo portraits as data URIs (SVGs)
  {
    id: "diogo",
    name: "Diogo",
    svg:
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'>` +
      `<defs><linearGradient id='bg' x1='0' x2='0' y1='0' y2='1'><stop offset='0' stop-color='%23221a12'/><stop offset='1' stop-color='%230b0506'/></linearGradient>` +
      `<radialGradient id='face' cx='50%' cy='40%' r='60%'><stop offset='0' stop-color='%23e1b892'/><stop offset='1' stop-color='%236a4a36'/></radialGradient></defs>` +
      `<rect width='400' height='500' fill='url(%23bg)'/>` +
      `<ellipse cx='200' cy='260' rx='110' ry='150' fill='url(%23face)'/>` +
      `<ellipse cx='170' cy='240' rx='8' ry='10' fill='%23241610'/><ellipse cx='230' cy='240' rx='8' ry='10' fill='%23241610'/>` +
      `<path d='M170 305 Q200 328 230 305' stroke='%23452c1f' stroke-width='4' fill='none' stroke-linecap='round'/>` +
      `<rect x='140' y='400' width='120' height='100' fill='%23151016'/></svg>`,
  },
  {
    id: "rafa",
    name: "Rafa",
    svg:
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'>` +
      `<defs><linearGradient id='bg' x1='0' x2='0' y1='0' y2='1'><stop offset='0' stop-color='%2323141b'/><stop offset='1' stop-color='%230b0608'/></linearGradient>` +
      `<radialGradient id='face' cx='50%' cy='40%' r='60%'><stop offset='0' stop-color='%23d9a882'/><stop offset='1' stop-color='%23523421'/></radialGradient></defs>` +
      `<rect width='400' height='500' fill='url(%23bg)'/>` +
      `<ellipse cx='200' cy='260' rx='104' ry='140' fill='url(%23face)'/>` +
      `<ellipse cx='172' cy='246' rx='7' ry='9' fill='%23120a08'/><ellipse cx='228' cy='246' rx='7' ry='9' fill='%23120a08'/>` +
      `<path d='M175 310 Q200 320 225 310' stroke='%23341d12' stroke-width='4' fill='none' stroke-linecap='round'/>` +
      `<rect x='140' y='400' width='120' height='100' fill='%231c141b'/></svg>`,
  },
  {
    id: "milla",
    name: "Milla",
    svg:
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'>` +
      `<defs><linearGradient id='bg' x1='0' x2='0' y1='0' y2='1'><stop offset='0' stop-color='%23221220'/><stop offset='1' stop-color='%23050508'/></linearGradient>` +
      `<radialGradient id='face' cx='50%' cy='40%' r='60%'><stop offset='0' stop-color='%23f1cfb0'/><stop offset='1' stop-color='%23734f3a'/></radialGradient></defs>` +
      `<rect width='400' height='500' fill='url(%23bg)'/>` +
      `<ellipse cx='200' cy='265' rx='100' ry='138' fill='url(%23face)'/>` +
      `<ellipse cx='175' cy='250' rx='7' ry='10' fill='%23241310'/><ellipse cx='225' cy='250' rx='7' ry='10' fill='%23241310'/>` +
      `<path d='M176 316 Q200 334 224 316' stroke='%23401c22' stroke-width='4' fill='none' stroke-linecap='round'/>` +
      `<rect x='140' y='400' width='120' height='100' fill='%23201522'/></svg>`,
  },
];

type FaceBox = {
  cx: number; // normalized center X (0-1)
  cy: number; // normalized center Y
  size: number; // normalized face height
};

const DEFAULT_FACE: FaceBox = { cx: 0.5, cy: 0.52, size: 0.6 };

// Face detection helper — uses native FaceDetector when available (Chromium).
// Falls back to DEFAULT_FACE.
async function detectFace(image: HTMLImageElement): Promise<FaceBox> {
  if (typeof window === "undefined") return DEFAULT_FACE;
  const w = image.naturalWidth || image.width;
  const h = image.naturalHeight || image.height;
  // @ts-expect-error FaceDetector is not in TS lib
  const Ctor = window.FaceDetector;
  if (typeof Ctor === "function") {
    try {
      const fd = new Ctor({ fastMode: true, maxDetectedFaces: 1 });
      const faces = await fd.detect(image);
      if (faces && faces.length > 0) {
        const b = faces[0].boundingBox;
        return {
          cx: (b.x + b.width / 2) / w,
          cy: (b.y + b.height / 2) / h,
          size: b.height / h,
        };
      }
    } catch {
      // ignore and fall back
    }
  }
  return DEFAULT_FACE;
}

export function TryCut() {
  const [cutIdx, setCutIdx] = useState(0);
  const [demoIdx, setDemoIdx] = useState<number>(0);
  const [customSrc, setCustomSrc] = useState<string | null>(null);
  const [face, setFace] = useState<FaceBox>(DEFAULT_FACE);
  const [scale, setScale] = useState(1.0);
  const [offsetY, setOffsetY] = useState(0);
  const [morphing, setMorphing] = useState(false);
  const [autoCycle, setAutoCycle] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const imgSrc = useMemo(
    () =>
      customSrc ?? `data:image/svg+xml;utf8,${DEMO_FACES[demoIdx].svg}`,
    [customSrc, demoIdx]
  );

  // run face detection on image load
  useEffect(() => {
    if (!imgSrc) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = async () => {
      const box = await detectFace(img);
      setFace(box);
    };
    img.src = imgSrc;
  }, [imgSrc]);

  // auto cycle
  useEffect(() => {
    if (!autoCycle) return;
    const id = setInterval(() => {
      setMorphing(true);
      setTimeout(() => {
        setCutIdx((c) => (c + 1) % CUTS.length);
        setMorphing(false);
      }, 400);
    }, 3400);
    return () => clearInterval(id);
  }, [autoCycle]);

  const cut = CUTS[cutIdx];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCustomSrc(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    const container = containerRef.current;
    if (!container) return;
    // Build composite canvas — image + SVG overlay
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgSrc;
    await new Promise((r) => {
      img.onload = r;
    });
    const W = img.naturalWidth || 400;
    const H = img.naturalHeight || 500;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, W, H);
    const svgStr =
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='${W}' height='${H}'>` +
      buildHairSVG(cut, face, scale, offsetY) +
      `</svg>`;
    const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const overlay = new Image();
    overlay.src = url;
    await new Promise((r) => {
      overlay.onload = r;
    });
    ctx.drawImage(overlay, 0, 0, W, H);
    URL.revokeObjectURL(url);
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `navalha-${cut.id}.png`;
    a.click();
  };

  const pickedCut = useMemo(() => cut, [cut]);

  return (
    <section
      id="trycut"
      className="relative mx-auto max-w-7xl overflow-hidden px-5 py-24 md:px-8 md:py-32"
    >
      <div className="aurora opacity-30" aria-hidden />

      <div className="relative grid items-start gap-10 md:grid-cols-[1fr_1.05fr]">
        {/* Left — pitch */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-accent-2/40 bg-accent-2/10 px-3 py-1 text-xs font-medium tracking-wide text-accent-2"
          >
            <Sparkles className="h-3 w-3" /> TryCut · beta aberta
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-5 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl"
          >
            <span className="text-gradient">Experimente </span>
            <span className="italic text-gradient-accent">antes de cortar.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-lg text-foreground/70"
          >
            Sobe uma selfie (ou escolhe um dos rostos demo), clica num corte e
            vê o resultado instantâneo. Tudo roda no seu navegador — sua foto
            nunca sai do dispositivo.
          </motion.p>

          <ul className="mt-8 space-y-2.5 text-sm">
            {[
              "Detecção de rosto local (FaceDetector API + fallback manual).",
              "6 cortes curados com sobreposição vetorial hue-matched.",
              "Baixa o PNG pronto pra enviar pro barbeiro.",
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
                  <Scissors className="h-3 w-3" />
                </span>
                {t}
              </motion.li>
            ))}
          </ul>

          {/* Action row */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <button
              data-cursor="hover"
              onClick={() => fileInputRef.current?.click()}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background shadow-[0_14px_56px_-10px_rgba(255,91,26,0.85)] transition-transform active:scale-[0.97]"
            >
              <Upload className="h-4 w-4" /> Subir foto
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />

            <button
              data-cursor="hover"
              onClick={() => setAutoCycle((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm transition-colors ${
                autoCycle
                  ? "border-accent/60 bg-accent/10 text-accent-2"
                  : "border-white/10 bg-white/5 text-foreground/80 hover:border-white/30"
              }`}
            >
              <Wand2 className="h-4 w-4" />{" "}
              {autoCycle ? "Ciclando cortes" : "Ciclar automático"}
            </button>

            <button
              data-cursor="hover"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground/80 transition-colors hover:border-white/30 hover:text-foreground"
            >
              <Download className="h-4 w-4" /> Baixar PNG
            </button>
          </div>

          {/* Demo face selector */}
          <div className="mt-6">
            <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">
              ou escolha um rosto demo
            </div>
            <div className="mt-2 flex gap-2">
              {DEMO_FACES.map((d, i) => (
                <button
                  key={d.id}
                  data-cursor="hover"
                  onClick={() => setDemoIdx(i)}
                  className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border transition-all ${
                    demoIdx === i && imgSrc.includes("svg")
                      ? "border-accent ring-2 ring-accent/60"
                      : "border-white/10 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={d.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`data:image/svg+xml;utf8,${d.svg}`}
                    alt={d.name}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 grid max-w-md grid-cols-2 gap-4">
            <label className="block text-xs">
              <div className="mb-1 flex justify-between text-foreground/50">
                <span>ajuste vertical</span>
                <span className="font-mono tabular-nums">
                  {offsetY.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={-0.15}
                max={0.15}
                step={0.01}
                value={offsetY}
                onChange={(e) => setOffsetY(parseFloat(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
            </label>
            <label className="block text-xs">
              <div className="mb-1 flex justify-between text-foreground/50">
                <span>tamanho</span>
                <span className="font-mono tabular-nums">
                  {scale.toFixed(2)}×
                </span>
              </div>
              <input
                type="range"
                min={0.7}
                max={1.4}
                step={0.02}
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
            </label>
          </div>
        </div>

        {/* Right — live preview */}
        <div className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            {/* Ambient glow */}
            <motion.div
              key={cut.id + "-glow"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="absolute -inset-8 -z-10 rounded-[3rem] blur-3xl"
              style={{ background: `radial-gradient(circle, ${cut.accent}, transparent 70%)` }}
            />

            <div
              ref={containerRef}
              className="shimmer relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface/60 p-4 backdrop-blur-xl"
            >
              {/* Top HUD */}
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  TRYCUT · LIVE PREVIEW
                </span>
                <span className="font-mono">{cut.tag}</span>
              </div>

              {/* Photo canvas */}
              <div className="relative mt-3 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black ring-1 ring-white/10">
                {imgSrc && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={imgSrc}
                    alt="input"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                {/* Hair overlay SVG positioned over face */}
                <svg
                  viewBox="0 0 200 200"
                  preserveAspectRatio="xMidYMid slice"
                  className="absolute inset-0 h-full w-full"
                >
                  <defs>
                    <linearGradient
                      id={`hair-${cut.id}`}
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor={cut.accent}
                        stopOpacity="0.95"
                      />
                      <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.9" />
                    </linearGradient>
                    <filter id={`hair-blur-${cut.id}`}>
                      <feGaussianBlur stdDeviation="0.6" />
                    </filter>
                  </defs>

                  <AnimatePresence mode="wait">
                    <motion.g
                      key={cut.id}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      transform={hairTransform(face, scale, offsetY)}
                    >
                      {/* shadow */}
                      <path
                        d={cut.path}
                        fill="rgba(0,0,0,0.65)"
                        filter={`url(#hair-blur-${cut.id})`}
                        transform="translate(0 1.5)"
                      />
                      {/* fill */}
                      <path
                        d={cut.path}
                        fill={`url(#hair-${cut.id})`}
                        filter={`url(#hair-blur-${cut.id})`}
                      />
                      {/* highlight */}
                      <path
                        d={cut.path}
                        fill="rgba(255,255,255,0.06)"
                        transform="translate(-0.8 -0.8)"
                      />
                    </motion.g>
                  </AnimatePresence>

                  {/* Face detection rectangle overlay */}
                  <motion.rect
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    x={face.cx * 200 - (face.size * 200) / 2.5}
                    y={face.cy * 200 - (face.size * 200) / 2}
                    width={(face.size * 200) / 1.25}
                    height={face.size * 200}
                    fill="none"
                    stroke={cut.accent}
                    strokeWidth={0.6}
                    strokeDasharray="3 2"
                  />
                </svg>

                {/* Morphing sheen */}
                <AnimatePresence>
                  {morphing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-accent-2/10 backdrop-blur-[1px]"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Cut label */}
              <div className="mt-4 flex items-center justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cut.id + "-label"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="font-display text-2xl tracking-tight">
                      {cut.name}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                      corte sugerido
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="flex items-center gap-2">
                  <button
                    data-cursor="hover"
                    onClick={() => {
                      setMorphing(true);
                      setTimeout(() => {
                        setCutIdx((i) => (i - 1 + CUTS.length) % CUTS.length);
                        setMorphing(false);
                      }, 250);
                    }}
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-foreground/60 transition-colors hover:border-white/30 hover:text-foreground"
                    aria-label="corte anterior"
                  >
                    ‹
                  </button>
                  <button
                    data-cursor="hover"
                    onClick={() => {
                      setMorphing(true);
                      setTimeout(() => {
                        setCutIdx((i) => (i + 1) % CUTS.length);
                        setMorphing(false);
                      }, 250);
                    }}
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-foreground/60 transition-colors hover:border-white/30 hover:text-foreground"
                    aria-label="próximo corte"
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* Cut picker */}
              <div className="mt-4 grid grid-cols-6 gap-1.5">
                {CUTS.map((c, i) => (
                  <button
                    key={c.id}
                    data-cursor="hover"
                    onClick={() => {
                      setMorphing(true);
                      setTimeout(() => {
                        setCutIdx(i);
                        setMorphing(false);
                      }, 250);
                    }}
                    className={`group relative aspect-square overflow-hidden rounded-lg border transition-all ${
                      i === cutIdx
                        ? "border-accent shadow-[0_0_16px_rgba(255,91,26,0.6)]"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                    aria-label={c.name}
                  >
                    <svg viewBox="0 0 200 200" className="h-full w-full">
                      <rect
                        width="200"
                        height="200"
                        fill={`url(#picker-bg-${c.id})`}
                      />
                      <defs>
                        <linearGradient id={`picker-bg-${c.id}`} x1="0" x2="1">
                          <stop offset="0" stopColor={c.accent} stopOpacity="0.2" />
                          <stop offset="1" stopColor="#000" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="130" r="40" fill="rgba(255,255,255,0.08)" />
                      <path d={c.path} fill={c.accent} opacity="0.9" />
                    </svg>
                    <div className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/80 to-transparent px-1 py-0.5 text-center text-[8px] font-medium uppercase tracking-wider">
                      {c.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Floating chips */}
            <motion.div
              initial={{ opacity: 0, x: -12, y: -8 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -left-6 top-14 hidden rounded-full border border-white/10 bg-surface/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-foreground/70 backdrop-blur md:inline-flex"
            >
              <Camera className="mr-1.5 h-3 w-3 text-accent-2" />
              local · nada sai do device
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 12, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="absolute -right-4 bottom-20 hidden rounded-full border border-white/10 bg-surface/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-foreground/70 backdrop-blur md:inline-flex"
            >
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {pickedCut.name.toLowerCase()} · 0.3s
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function hairTransform(face: FaceBox, scale: number, offsetY: number) {
  // The hair paths are designed around face at cx=100, cy=115, size~96.
  // Translate/scale to match detected face in the 200x200 viewBox.
  const targetCx = face.cx * 200;
  const targetCy = face.cy * 200 + offsetY * 200;
  const s = (face.size / 0.55) * scale;
  const tx = targetCx - 100 * s;
  const ty = targetCy - 115 * s;
  return `translate(${tx} ${ty}) scale(${s})`;
}

function buildHairSVG(
  cut: (typeof CUTS)[number],
  face: FaceBox,
  scale: number,
  offsetY: number
) {
  const transform = hairTransform(face, scale, offsetY);
  return (
    `<defs>` +
    `<linearGradient id='h' x1='0' x2='0' y1='0' y2='1'><stop offset='0' stop-color='${cut.accent}' stop-opacity='0.95'/><stop offset='1' stop-color='#0a0a0a' stop-opacity='0.9'/></linearGradient>` +
    `</defs>` +
    `<g transform='${transform}'>` +
    `<path d='${cut.path}' fill='rgba(0,0,0,0.65)' transform='translate(0 1.5)'/>` +
    `<path d='${cut.path}' fill='url(#h)'/>` +
    `</g>`
  );
}
