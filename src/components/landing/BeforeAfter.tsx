"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Slider antes/después. Se puede arrastrar con mouse, dedo o teclado.
 * Con `intro` el divisor hace un barrido solo al aparecer en pantalla.
 */
export default function BeforeAfter({
  before,
  after,
  alt,
  intro = false,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  before: string;
  after: string;
  alt: string;
  intro?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const [pos, setPos] = useState(intro ? 92 : 50);
  const [animating, setAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  useEffect(() => {
    if (!intro) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPos(50);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      setAnimating(true);
      const steps = [12, 70, 50];
      steps.forEach((p, i) =>
        timers.push(setTimeout(() => { if (!touched.current) setPos(p); }, 500 + i * 900))
      );
      timers.push(setTimeout(() => setAnimating(false), 500 + steps.length * 900));
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => { obs.disconnect(); timers.forEach(clearTimeout); };
  }, [intro]);

  return (
    <div
      ref={ref}
      className={`ba relative overflow-hidden select-none ${className}`}
    >
      <Image src={after} alt={`${alt} — después`} fill sizes={sizes} priority={priority} className="object-cover" />
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          transition: animating ? "clip-path 0.85s cubic-bezier(.65,0,.35,1)" : "none",
        }}
      >
        <Image src={before} alt={`${alt} — antes`} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>

      <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">Antes</span>
      <span className="absolute right-3 top-3 rounded-full bg-[var(--accent)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-black">Después</span>

      <div
        className="pointer-events-none absolute inset-y-0 w-[2px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
        style={{
          left: `${pos}%`,
          transition: animating ? "left 0.85s cubic-bezier(.65,0,.35,1)" : "none",
        }}
      >
        <span className="ba-handle absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--accent)] text-black shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-label={`Comparar antes y después: ${alt}`}
        onChange={(e) => { touched.current = true; setAnimating(false); setPos(Number(e.target.value)); }}
        className="ba-range absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
