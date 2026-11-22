import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black pb-28 pt-16 text-white md:pb-10">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Image src="/img/logo-mis-papos.png" alt="Mis Papos" width={170} height={96} className="mb-5 h-12 w-auto brightness-0 invert" />
            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              Limpieza y cuidado de tenis, botas, mochilas, gorras y bolsas en Villahermosa, Tabasco.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--yellow)]">Horario</h4>
            <p className="text-sm leading-7 text-white/60">Lun–Vie 7:00–20:00<br />Sáb 8:00–18:00<br />Dom 9:00–14:00</p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--yellow)]">Contacto</h4>
            <p className="text-sm leading-7 text-white/60">
              WhatsApp 993 400 1413<br />
              <a href="https://instagram.com/mispapos" target="_blank" rel="noopener noreferrer" className="hover:text-white">@mispapos</a>
            </p>
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-white/35 sm:text-left">
          <p>© {new Date().getFullYear()} Mis Papos · Villahermosa, Tabasco</p>
        </div>
      </div>
    </footer>
  );
}
