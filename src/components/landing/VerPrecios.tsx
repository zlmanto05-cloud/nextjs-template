"use client";

import { trackVerServicios } from "./lib";

/** Botón "Ver precios": baja a servicios y registra el evento "Ver servicios". */
export default function VerPrecios({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <a href="#servicios" onClick={() => trackVerServicios("hero")} className={className}>
      {children}
    </a>
  );
}
