"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type HairStrand = {
  id: number;
  x: number;
  y: number;
  rot: number;
  hue: number;
  dx: number;
  dy: number;
  dr: number;
};

export function ScissorCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 420, damping: 28, mass: 0.4 });

  const [isDown, setIsDown] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [strands, setStrands] = useState<HairStrand[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("cursor-none");

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "a, button, [data-cursor='hover'], input, select, textarea"
        );
        setIsHover(!!interactive);
      }
    };
    const handleDown = (e: MouseEvent) => {
      setIsDown(true);
      // Spawn hair strands
      const batch: HairStrand[] = Array.from({ length: 10 }, () => ({
        id: idRef.current++,
        x: e.clientX + (Math.random() - 0.5) * 20,
        y: e.clientY + (Math.random() - 0.5) * 10,
        rot: Math.random() * 360,
        hue: 20 + Math.random() * 20,
        dx: (Math.random() - 0.5) * 80,
        dy: 220 + Math.random() * 180,
        dr: 540,
      }));
      setStrands((prev) => [...prev.slice(-40), ...batch]);
    };
    const handleUp = () => setIsDown(false);
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: isHover ? 1.4 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Outer halo */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 44,
              height: 44,
              background:
                "radial-gradient(circle, rgba(255,91,26,0.35) 0%, transparent 70%)",
            }}
            animate={{ scale: isDown ? 1.6 : 1 }}
          />
          {/* Scissor */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground"
            style={{ filter: "drop-shadow(0 0 6px rgba(255,91,26,.6))" }}
          >
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <motion.line
              x1="20"
              y1="4"
              x2="8.12"
              y2="15.88"
              animate={{ rotate: isDown ? -6 : 0 }}
              style={{ originX: "8.12px", originY: "15.88px" }}
            />
            <motion.line
              x1="14.47"
              y1="14.48"
              x2="20"
              y2="20"
              animate={{ rotate: isDown ? 6 : 0 }}
              style={{ originX: "14.47px", originY: "14.48px" }}
            />
            <line x1="8.12" y1="8.12" x2="12" y2="12" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Hair strands */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[99] overflow-hidden"
      >
        {strands.map((s) => (
          <motion.div
            key={s.id}
            initial={{
              x: s.x,
              y: s.y,
              rotate: s.rot,
              opacity: 1,
            }}
            animate={{
              y: s.y + s.dy,
              x: s.x + s.dx,
              rotate: s.rot + s.dr,
              opacity: 0,
            }}
            transition={{ duration: 1.6, ease: "easeIn" }}
            onAnimationComplete={() =>
              setStrands((prev) => prev.filter((p) => p.id !== s.id))
            }
            className="absolute left-0 top-0"
            style={{
              width: 22,
              height: 2,
              background: `hsl(${s.hue}, 18%, 18%)`,
              borderRadius: 2,
              boxShadow: "0 0 2px rgba(0,0,0,0.6)",
            }}
          />
        ))}
      </div>
    </>
  );
}
