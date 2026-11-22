"use client";

import { useState } from "react";
import { track, waLink } from "./lib";

type Item = { name: string; desc: string; price: number; tag?: string };
type Cat = { id: string; label: string; items: Item[] };

// Precios vigentes: docs/lista-precios-mispapos.md
const CATS: Cat[] = [
  {
    id: "tenis",
    label: "Tenis",
    items: [
      { name: "Ultra white", desc: "Para blancos que ya se ven amarillos o grises.", price: 260, tag: "Más pedido" },
      { name: "On Cloud / Trail", desc: "Mesh técnico y espumas que piden más cuidado.", price: 220 },
      { name: "Premium lujo", desc: "Piel, gamuza y pares de colección. Foto de estado incluida.", price: 399 },
      { name: "Blanqueado de suelas", desc: "Quitamos el tono amarillo de suelas blancas. Revisamos tu par antes: no todas las suelas se pueden blanquear.", price: 180 },
      { name: "Fútbol / tacos", desc: "Lodo, pasto y cancha fuera.", price: 150 },
      { name: "Niño", desc: "Sintético, canvas o lona hasta talla 22.", price: 150 },
    ],
  },
  {
    id: "botas",
    label: "Botas",
    items: [
      { name: "Sintético / textil", desc: "Tipo Timberland en materiales sintéticos.", price: 260 },
      { name: "Piel / nubuck", desc: "Con acondicionador especial para piel.", price: 350, tag: "Cuidado extra" },
    ],
  },
  {
    id: "mochilas",
    label: "Mochilas",
    items: [
      { name: "Deportiva / escolar", desc: "Nylon y lona de uso diario.", price: 180 },
      { name: "Piel / ejecutiva", desc: "Limpieza y cuidado del cuero.", price: 320 },
      { name: "Lujo", desc: "Tumi y similares. Foto de estado incluida.", price: 580 },
      { name: "Niño", desc: "Mochila escolar chica.", price: 130 },
    ],
  },
  {
    id: "bolsas",
    label: "Bolsas",
    items: [
      { name: "Tela / sintético", desc: "Marcas no premium.", price: 180 },
      { name: "Tela marca premium", desc: "Longchamp, Gucci tela y similares.", price: 250 },
      { name: "Piel", desc: "MK, Zara y similares. Foto de estado incluida.", price: 350 },
      { name: "Lujo material mixto", desc: "LV canvas, Gucci GG, Coach tela.", price: 500 },
      { name: "Lujo piel", desc: "LV, Hermès, Prada, Chanel. Foto de estado incluida.", price: 600 },
    ],
  },
  {
    id: "gorras",
    label: "Gorras",
    items: [{ name: "Gorra", desc: "Limpieza sin deformar la visera.", price: 130 }],
  },
];


export default function Services() {
  const [active, setActive] = useState(CATS[0].id);
  const cat = CATS.find((c) => c.id === active)!;

  return (
    <div>
      <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar" role="tablist" aria-label="Categorías">
        {CATS.map((c) => {
          const on = c.id === active;
          const from = Math.min(...c.items.map((i) => i.price));
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={on}
              onClick={() => { setActive(c.id); track("ver_servicios", { categoria: c.id }); }}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                on ? "border-black bg-black text-white" : "border-black/10 bg-white text-black/70 hover:border-black/40"
              }`}
            >
              {c.label} <span className={on ? "text-[var(--accent)]" : "text-black/40"}>· desde ${from}</span>
            </button>
          );
        })}
      </div>

      <div key={active} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cat.items.map((it, i) => (
          <a
            key={it.name}
            href={waLink(`Hola, quiero cotizar: ${cat.label} — ${it.name} ($${it.price})`, `servicio-${cat.id}`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("Lead", { content_name: `${cat.id}-${it.name}` })}
            className="card-pop svc-card group relative flex flex-col justify-between rounded-2xl p-6"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
            </span>
            <div className="pr-12">
              {it.tag && (
                <span className="font-tag mb-3 inline-block bg-black px-2 py-1 text-[11px] text-[var(--accent)]">{it.tag}</span>
              )}
              <h3 className="font-display text-4xl leading-[0.9]">{it.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/60">{it.desc}</p>
            </div>
            <div className="mt-6 flex items-end justify-between sm:mt-8">
              <p className="font-display text-6xl leading-none">${it.price}</p>
              <span className="font-tag text-[11px] text-black/50 transition-colors group-hover:text-black">Cotizar →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
