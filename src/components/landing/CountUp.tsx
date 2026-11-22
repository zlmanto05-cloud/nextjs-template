"use client";

import { useEffect, useRef, useState } from "react";

/** Número que sube de 0 al valor cuando entra en pantalla. */
export default function CountUp({ to, prefix = "", suffix = "", ms = 1200 }: { to: number; prefix?: string; suffix?: string; ms?: number }) {
  const [n, setN] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    let raf = 0;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / ms);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [to, ms]);

  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}
