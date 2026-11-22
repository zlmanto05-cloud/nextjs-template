"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import WaButton from "./landing/WaButton";

const links = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Antes y después", href: "/#resultados" },
  { label: "Cómo funciona", href: "/#proceso" },
  { label: "Sucursales", href: "/#sucursales" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-white/85 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 md:px-10 ${scrolled ? "h-16" : "h-20 md:h-24"}`}>
        <Link href="/" className="flex shrink-0 items-center" aria-label="Mis Papos, inicio">
          <Image
            src="/img/logo-mis-papos-transparente.png"
            alt="Mis Papos"
            width={160}
            height={89}
            className={`w-auto object-contain transition-all duration-500 ${scrolled ? "h-11" : "h-14 md:h-16"}`}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-4 py-2 text-[15px] font-medium text-black/70 transition-colors hover:bg-black/5 hover:text-black">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WaButton
            text="Hola, quiero cotizar la limpieza de mis tenis"
            medium="nav"
            className="btn-shine inline-flex items-center gap-2 rounded-full bg-[var(--yellow)] px-4 py-2.5 text-[13px] font-bold text-black transition-transform hover:scale-[1.03] md:px-6 md:py-3 md:text-sm"
          >
            <span className="md:hidden">Cotizar</span>
            <span className="hidden md:inline">Cotiza por WhatsApp</span>
          </WaButton>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      <div className={`grid transition-all duration-500 md:hidden ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <nav className="overflow-hidden" aria-label="Menú móvil">
          <div className="flex flex-col px-5 pb-6 pt-2">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="border-b border-black/5 py-4 font-display text-3xl uppercase">
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
