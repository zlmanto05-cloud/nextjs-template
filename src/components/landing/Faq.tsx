"use client";

import { useState } from "react";

const FAQS = [
  { q: "¿Cuánto tarda el servicio?", a: "La entrega estándar es en 48 horas. Te avisamos por WhatsApp en cuanto tus tenis están listos." },
  { q: "¿Cómo saben qué servicio necesito?", a: "El precio lo define el material, no la marca. Al recibir revisamos tu par y te confirmamos el nivel antes de empezar. Si tienes duda, mándanos una foto por WhatsApp." },
  { q: "¿Limpian todo tipo de materiales?", a: "Sí: piel, gamuza, nubuck, mesh, flyknit, canvas y materiales técnicos. Cada uno lleva productos y técnica distintos." },
  { q: "¿Qué pasa si mi par ya tiene daños?", a: "Documentamos el estado de cada pieza con fotos al recibirla; en premium, mochilas de lujo y bolsas de piel la foto es obligatoria. Así los dos sabemos cómo llegó. No respondemos por daños previos, materiales muy desgastados o réplicas." },
  { q: "¿Cómo funciona en Anytime Fitness?", a: "Al entrar al gym dejas tus tenis en el cubículo con candado QR y nos escribes por WhatsApp. Los recogemos, los limpiamos y te avisamos cuando estén listos." },
  { q: "¿También limpian mochilas, bolsas y gorras?", a: "Sí. Mochilas desde $130, bolsas desde $180 y gorras a $130. En bolsas el precio depende de la marca y el material." },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {FAQS.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(on ? -1 : i)}
              aria-expanded={on}
              className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-semibold md:text-lg"
            >
              {f.q}
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${on ? "rotate-45 bg-[var(--yellow)]" : "bg-black/5"}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
              </span>
            </button>
            <div className="grid transition-all duration-500 ease-out" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="pb-6 pr-12 text-[15px] leading-relaxed text-black/60">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
