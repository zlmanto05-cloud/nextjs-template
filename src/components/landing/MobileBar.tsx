"use client";

import { useEffect, useState } from "react";
import WaButton from "./WaButton";
import { trackViewContent } from "./lib";

/** Barra flotante tipo app, solo en celular. Aparece después del hero. */
export default function MobileBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let fired = false;
    const onScroll = () => {
      setShow(window.scrollY > 420);
      // ViewContent al 50% de scroll (se mantiene del sitio anterior)
      const max = document.body.scrollHeight - window.innerHeight;
      if (!fired && max > 0 && window.scrollY / max >= 0.5) {
        fired = true;
        trackViewContent();
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item = "flex flex-col items-center gap-0.5 px-2 text-[10px] font-semibold text-white/70";

  return (
    <nav
      aria-label="Accesos rápidos"
      className={`fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 transition-all duration-500 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <div className="flex w-full max-w-sm items-center justify-between rounded-full bg-black/90 py-2 pl-5 pr-2 shadow-2xl backdrop-blur">
        <a href="#servicios" className={item}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10" /></svg>
          Precios
        </a>
        <a href="#sucursales" className={item}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
          Ubicación
        </a>
        <WaButton
          text="Hola, quiero cotizar la limpieza de mis tenis"
          medium="barra-movil"
          className="flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-bold text-black"
        >
          Cotizar
        </WaButton>
      </div>
    </nav>
  );
}
