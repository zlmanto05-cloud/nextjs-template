import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black pb-28 pt-16 text-white md:pb-10">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Image src="/img/logo-mis-papos-blanco.png" alt="Mis Papos" width={160} height={89} className="mb-5 h-20 w-auto" />
            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              Limpieza y cuidado de tenis, botas, mochilas, gorras y bolsas en Villahermosa, Tabasco.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Horario</h4>
            <p className="text-sm leading-7 text-white/60">Lun–Vie 7:00–20:00<br />Sáb 8:00–18:00<br />Dom 9:00–14:00</p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Contacto</h4>
            <p className="text-sm leading-7 text-white/60">
              WhatsApp 993 400 1413<br />
              <a href="https://instagram.com/mispapos" target="_blank" rel="noopener noreferrer" className="hover:text-white">@mispapos</a>
            </p>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row">
          <p>© {new Date().getFullYear()} Mis Papos · Villahermosa, Tabasco</p>
          <Link href="/aviso-de-privacidad" className="hover:text-white/70">Aviso de privacidad</Link>
        </div>
      </div>
    </footer>
  );
}
