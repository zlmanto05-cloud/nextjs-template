import Image from "next/image";
import Link from "next/link";

const WA_URL = `https://wa.me/529931000000?text=${encodeURIComponent("Hola, me gustaría cotizar la limpieza de mis tenis")}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L0 24l6.337-1.514A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.003-1.367l-.358-.213-3.76.898.944-3.653-.234-.375A9.79 9.79 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0d1526] text-white relative overflow-hidden">
      {/* Background SNEAKERS text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-9xl font-black text-white opacity-5 whitespace-nowrap tracking-widest">
          SNEAKERS
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/img/logo-mis-papos.png"
              alt="Mis Papos"
              width={140}
              height={40}
              className="h-9 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Servicio profesional de limpieza y restauración de sneakers en Villahermosa, Tabasco.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#1db954] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Contáctanos
            </a>
          </div>

          {/* Col 2 — Navegación */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Navegación</h4>
            <ul className="space-y-3">
              {[
                { label: "Servicios", href: "#servicios" },
                { label: "Proceso", href: "#proceso" },
                { label: "Testimonios", href: "#testimonios" },
                { label: "Membresía", href: "#membresia" },
                { label: "Sucursales", href: "#sucursales" },
                { label: "FAQ", href: "#faq" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Sucursales */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Sucursales</h4>
            <div className="space-y-5">
              <div>
                <p className="text-white text-sm font-semibold">Tintorería Max</p>
                <p className="text-white/50 text-xs mt-1">Plaza Usumacinta · Villahermosa</p>
                <p className="text-white/35 text-xs mt-1">Lun–Vie 7–8 PM · Sáb 8–6 PM · Dom 9–2 PM</p>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Mega Plaza Deportiva</p>
                <p className="text-white/50 text-xs mt-1">Ciudad Deportiva · Villahermosa</p>
                <p className="text-white/35 text-xs mt-1">Lun–Vie 8–8 PM · Sáb 8–4 PM · Dom Cerrado</p>
              </div>
            </div>
          </div>

          {/* Col 4 — Síguenos */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Síguenos</h4>
            <div className="space-y-3">
              <a
                href="https://instagram.com/mispapos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @mispapos
              </a>
              <a
                href="https://facebook.com/mispapos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Mis Papos
              </a>
            </div>
            <p className="text-white/30 text-xs mt-4">Próximamente en redes sociales</p>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © 2026 Mis Papos · Todos los derechos reservados · Villahermosa, Tabasco
          </p>
          <Link href="/privacidad" className="text-white/30 hover:text-white/60 text-xs transition-colors">
            Política de Privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
