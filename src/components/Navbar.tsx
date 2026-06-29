"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const WA_NUMBER = "529931000000";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola, quiero agendar una limpieza de tenis")}&utm_source=web&utm_medium=nav&utm_campaign=lanzamiento`;

const links = [
  { label: "Servicios",   href: "#servicios" },
  { label: "Proceso",     href: "#proceso" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Membresía",   href: "#membresia" },
  { label: "Sucursales",  href: "#sucursales" },
];

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.09-1.34A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.67c-.2.56-1.18 1.1-1.62 1.16-.44.07-.85.1-2.72-.57-2.28-.82-3.75-3.13-3.86-3.27-.11-.14-.9-1.2-.9-2.29 0-1.09.57-1.62.77-1.84.2-.22.44-.27.59-.27h.42c.14 0 .32-.05.5.38.2.47.67 1.63.73 1.75.06.12.1.26.02.41-.08.15-.12.24-.23.37-.11.13-.24.29-.34.39-.11.11-.23.23-.1.45.13.22.58.96 1.25 1.55.86.77 1.58 1.01 1.8 1.12.22.11.35.09.48-.05.13-.14.55-.64.7-.86.15-.22.3-.18.5-.11.2.07 1.28.6 1.5.71.22.11.37.16.42.25.06.09.06.52-.14 1.08z"/>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() { setMenuOpen(false); }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? "shadow-md" : "border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/img/logo-mis-papos.png"
              alt="Mis Papos — Limpieza de tenis en Villahermosa"
              width={120}
              height={36}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Navegación principal">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-gray-500 hover:text-[#3b55f5] text-[13px] font-medium transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop WAB CTA */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-[13px] font-bold px-5 py-2.5 rounded-full transition-colors"
            aria-label="Contáctanos por WhatsApp"
          >
            <WaIcon />
            Contáctanos
          </a>

          {/* Mobile: WAB + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-[12px] font-bold px-3.5 py-2 rounded-full transition-colors"
            >
              <WaIcon />
              Cotizar
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              className="text-gray-600 p-1"
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              )}
            </button>
          </div>

        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-1" aria-label="Menú móvil">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="text-gray-700 hover:text-[#3b55f5] font-medium py-2.5 border-b border-gray-50 text-[15px] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-3 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-xl text-[14px] transition-colors"
            >
              <WaIcon />
              Contáctanos por WhatsApp
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
