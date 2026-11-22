import Image from "next/image";
import Reveal from "@/components/landing/Reveal";
import Services from "@/components/landing/Services";
import Faq from "@/components/landing/Faq";
import CountUp from "@/components/landing/CountUp";
import MobileBar from "@/components/landing/MobileBar";
import WaButton from "@/components/landing/WaButton";
import Footer from "@/components/Footer";

const HERO_WORDS = ["Tus", "tenis,", "como", "recién", "salidos", "de", "la", "caja"];

const MARQUEE = ["Nike", "Jordan", "On Cloud", "New Balance", "Adidas", "Botas de piel", "Mochilas", "Gorras", "Bolsas de lujo", "Gamuza", "Nubuck", "Mesh"];

const STEPS = [
  { n: "01", title: "Déjalos", desc: "En Paseo Usumacinta o en Deportiva, debajo de Anytime Fitness." },
  { n: "02", title: "Los limpiamos", desc: "Según su material. En piezas premium te mandamos foto de cómo llegaron." },
  { n: "03", title: "Recógelos", desc: "En 48 horas, impecables. Te avisamos por WhatsApp." },
];

const WHY = [
  { title: "Por material, no por marca", desc: "Piel, gamuza, mesh o nubuck: cada uno con su producto y su técnica.", icon: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5" },
  { title: "Foto de estado", desc: "Registramos cómo llega tu pieza. Obligatoria en premium, mochilas de lujo y bolsas de piel.", icon: "M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 100-8 4 4 0 000 8z" },
  { title: "Listos en 48 h", desc: "Sin agendar, sin filas. Te avisamos cuando estén.", icon: "M12 7v5l3 2M12 21a9 9 0 110-18 9 9 0 010 18z" },
  { title: "2 sucursales en Villahermosa", desc: "Paseo Usumacinta y Ciudad Deportiva, debajo de Anytime Fitness.", icon: "M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" },
];

const MAIN_BRANCHES = [
  {
    tag: "Matriz",
    name: "Paseo Usumacinta",
    address: "Av. Paseo Usumacinta esq. Av. Los Ríos, Plaza KB",
    hours: "Lun–Vie 7–20 h · Sáb 8–18 h · Dom 9–14 h",
    img: "/img/mapa-usumacinta.webp",
    url: "https://maps.google.com/?q=Av.+Paseo+Usumacinta+esquina+Av.+Los+Rios+Plaza+KB+Villahermosa+Tabasco",
  },
  {
    tag: "Sucursal",
    name: "Deportiva",
    address: "Plaza Mega Soriana, Ciudad Deportiva. Debajo de Anytime Fitness, junto a Telcel",
    hours: "Lun–Vie 8–20 h · Sáb 8–16 h",
    img: "/img/mapa-deportiva.webp",
    url: "https://maps.google.com/?q=Velódromo+Ciudad+Deportiva+Plaza+Mega+Soriana+Villahermosa+Tabasco",
  },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`font-tag mb-4 inline-flex items-center gap-2 text-[11px] ${light ? "text-[var(--accent)]" : "text-black/55"}`}>
      <span className="h-2 w-2 bg-[var(--accent)]" />
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* ① HERO */}
      <section className="relative bg-white pb-14 pt-24 md:pb-20 md:pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-[1.2fr_1fr] md:gap-14 md:px-10">
          <div>
            <p className="fade-in font-tag mb-6 inline-flex items-center gap-2 border border-black px-3 py-1.5 text-[11px]" style={{ animationDelay: "0ms" }}>
              <span className="h-2 w-2 bg-[var(--accent)]" /> Sneaker care · Villahermosa, Tab.
            </p>
            <a href="#promo-anytime" className="fade-in font-tag mb-6 ml-2 inline-flex items-center gap-2 bg-[var(--accent)] px-3 py-1.5 text-[11px] text-black transition-transform hover:-translate-y-0.5" style={{ animationDelay: "100ms" }}>
              20% socios Anytime Fitness →
            </a>
            <h1 className="font-display text-[4rem] leading-[0.86] sm:text-7xl lg:text-[7rem] xl:text-[7.6rem]">
              {HERO_WORDS.map((w, i) => (
                <span key={i} className="word-up mr-[0.18em] last:mr-0">
                  <span style={{ animationDelay: `${150 + i * 70}ms` }} className={i >= 3 && i <= 4 ? "mark" : ""}>{w}</span>
                </span>
              ))}
            </h1>
            <p className="fade-in mt-7 max-w-md text-base leading-relaxed text-black/60 md:text-lg" style={{ animationDelay: "800ms" }}>
              Limpieza por material, no por marca. Tenis, botas, mochilas, gorras y bolsas, listos en 48 horas.
            </p>
            <div className="fade-in mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "950ms" }}>
              <WaButton
                text="Hola, quiero cotizar la limpieza de mis tenis"
                medium="hero"
                className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-base font-bold text-white transition-transform hover:scale-[1.03]"
              >
                Cotiza por WhatsApp
              </WaButton>
              <a href="#servicios" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/20 px-8 py-4 text-base font-semibold transition-colors hover:border-black hover:bg-[var(--accent)]">
                Ver precios
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
              </a>
            </div>
            <p className="fade-in font-tag mt-8 text-[11px] text-black/45" style={{ animationDelay: "1050ms" }}>
              48 h · Foto de estado · 2 sucursales
            </p>
          </div>

          <div className="fade-in relative" style={{ animationDelay: "500ms" }}>
            <div className="grain relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--paper)]">
              <Image src="/img/fotos/manos-limpiando.jpg" alt="Manos limpiando un tenis blanco con cepillo y espuma" fill priority sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
            </div>
            <div className="float absolute -left-4 bottom-10 rotate-[-4deg] bg-[var(--accent)] px-4 py-3 shadow-xl md:-left-8">
              <p className="font-display text-4xl leading-none">Revisado a mano</p>
              <p className="font-tag mt-1 text-[10px]">Par por par, según su material</p>
            </div>
            <div className="float absolute -right-2 top-6 bg-black px-3 py-2 text-white shadow-xl md:-right-5" style={{ animationDelay: "-3s" }}>
              <p className="font-tag text-[10px] text-[var(--accent)]">Entrega</p>
              <p className="font-display text-3xl leading-none">48 h</p>
            </div>
          </div>
        </div>
      </section>

      {/* ② NÚMEROS */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-5 py-10 md:grid-cols-4 md:px-10 md:py-14">
          {[
            { v: <CountUp to={2} />, l: "sucursales en Villahermosa" },
            { v: <CountUp to={48} suffix=" h" />, l: "tiempo de entrega" },
            { v: <CountUp to={7} />, l: "días a la semana" },
            { v: <><CountUp to={5} /> tipos</>, l: "tenis, botas, mochilas, gorras y bolsas" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 90} className="text-center md:border-l md:border-black/10 md:first:border-l-0">
              <p className="font-display text-5xl leading-none md:text-6xl">{s.v}</p>
              <p className="mx-auto mt-2 max-w-[11rem] text-sm text-black/50">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ③ MARQUEE */}
      <section aria-hidden className="overflow-hidden bg-black py-5">
        <div className="marquee">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center font-display text-3xl uppercase text-white md:text-4xl">
              <span className="px-6">{m}</span>
              <span className="text-[var(--accent)]">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ③b FOTOS DE CALLE */}
      <section className="bg-white pt-16 md:pt-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 no-scrollbar md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
            {[
              { src: "/img/fotos/running-calle.jpg", cap: "Para tus kilómetros", ratio: "aspect-[3/4]" },
              { src: "/img/fotos/gym-piso.jpg", cap: "Para tu día de pierna", ratio: "aspect-[3/4]" },
              { src: "/img/fotos/running-agujetas.jpg", cap: "Listos para entrenar", ratio: "aspect-[3/4]" },
            ].map((f, i) => (
              <Reveal key={f.src} delay={i * 90} className="w-[70%] shrink-0 snap-center md:w-auto">
                <figure className="group">
                  <div className={`grain relative overflow-hidden rounded-xl bg-[var(--paper)] ${f.ratio}`}>
                    <Image src={f.src} alt={f.cap} fill sizes="(max-width: 768px) 70vw, 33vw" className="object-cover grayscale-[35%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                  </div>
                  <figcaption className="font-tag mt-3 flex items-center gap-2 text-[11px] text-black/60">
                    <span className="text-black">0{i + 1}</span> {f.cap}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ④ SERVICIOS */}
      <section id="servicios" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
            <div>
              <Eyebrow>Servicios y precios</Eyebrow>
              <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">¿Qué nos<br />vas a traer?</h2>
            </div>
            <p className="max-w-sm text-black/55">Elige la categoría y toca la tarjeta: te abrimos WhatsApp con el mensaje listo para cotizar.</p>
          </Reveal>
          <Reveal delay={100}><Services /></Reveal>

          <Reveal delay={150} className="mt-10 rounded-2xl bg-[var(--paper)] p-6 md:p-8">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-black/50">Agrégale</p>
            <div className="flex flex-wrap gap-2">
              {[["Impermeabilizar", 90], ["Desodorizar", 60], ["Crema protectora", 70], ["Agujetas nuevas", 50]].map(([n, p]) => (
                <span key={n} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium">
                  {n} <span className="font-bold">+${p}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ⑥ PROCESO */}
      <section id="proceso" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mb-12 md:mb-16">
            <Eyebrow>Cómo funciona</Eyebrow>
            <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">Tres pasos.<br />Cero filas.</h2>
          </Reveal>
          <Reveal className="relative">
            <div aria-hidden className="draw-line absolute left-0 right-0 top-7 hidden h-[3px] bg-[var(--accent)] md:block" />
            <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-5 md:block">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-black font-display text-2xl text-[var(--accent)] ring-8 ring-white">{s.n}</span>
                  <div className="md:mt-6">
                    <h3 className="font-display text-3xl uppercase">{s.title}</h3>
                    <p className="mt-2 max-w-xs text-black/55">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ⑦ GYM (bloque oscuro) */}
      <section id="promo-anytime" className="px-3 md:px-6">
        <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-black px-6 py-16 text-white md:rounded-3xl md:px-16 md:py-24">
          <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-[var(--accent)] opacity-25 blur-3xl" />
          <div className="relative grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <Eyebrow light>Promo socios Anytime Fitness</Eyebrow>
              <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">
                ¿Eres socio de Anytime?<br /><span className="text-[var(--accent)]">20% de descuento.</span>
              </h2>
              <p className="mt-6 max-w-md text-white/60">
                Presenta tu llave de Anytime Fitness y llévate 20% de descuento en todos los servicios, en cualquiera de nuestras 2 sucursales. En Ciudad Deportiva estamos justo debajo del gym: déjalos antes de subir a entrenar.
              </p>
              <WaButton
                text="Hola, soy socio de Anytime Fitness y quiero usar mi 20% de descuento"
                medium="promo-anytime"
                className="btn-shine mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-4 font-bold text-black transition-transform hover:scale-[1.03]"
              >
                Quiero mi 20%
              </WaButton>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src="/img/fotos/mostrador-mis-papos.jpg" alt="Cliente entregando sus tenis en el mostrador" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
              <span className="font-tag absolute bottom-3 left-3 bg-[var(--accent)] px-2 py-1 text-[11px] text-black">Presenta tu llave · 20%</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ⑧ POR QUÉ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mb-12 text-center">
            <Eyebrow>Por qué Mis Papos</Eyebrow>
            <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">Cuidado de verdad</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 100} className="group rounded-2xl border border-black/5 bg-[var(--paper)] p-7 transition-colors duration-300 hover:bg-[var(--accent-soft)]">
                <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-[var(--accent)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={w.icon} /></svg>
                </span>
                <h3 className="text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/55">{w.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⑨ FAQ */}
      <section id="faq" className="bg-[var(--paper)] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1fr_1.6fr] md:px-10">
          <Reveal>
            <Eyebrow>Preguntas frecuentes</Eyebrow>
            <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-6xl">Lo que nos<br />preguntan</h2>
            <p className="mt-5 max-w-xs text-black/55">¿Tienes otra duda? Escríbenos y te contestamos en minutos.</p>
          </Reveal>
          <Reveal delay={100}><Faq /></Reveal>
        </div>
      </section>

      {/* ⑩ SUCURSALES */}
      <section id="sucursales" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mb-12">
            <Eyebrow>Sucursales</Eyebrow>
            <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">2 sucursales en<br />Villahermosa</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {MAIN_BRANCHES.map((b, i) => (
              <Reveal key={b.name} delay={i * 120} as="article" className="group overflow-hidden rounded-2xl border border-black/10">
                <a href={b.url} target="_blank" rel="noopener noreferrer" className="relative block h-44 overflow-hidden bg-[var(--paper)]">
                  <Image src={b.img} alt={`Mapa ${b.name}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </a>
                <div className="p-6 md:p-7">
                  <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider">{b.tag}</span>
                  <h3 className="mt-3 font-display text-4xl uppercase">{b.name}</h3>
                  <p className="mt-2 text-sm text-black/60">{b.address}</p>
                  <p className="mt-1 text-sm text-black/45">{b.hours}</p>
                  <a href={b.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03]">
                    Cómo llegar
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⑪ CTA FINAL */}
      <section className="relative overflow-hidden bg-[var(--accent)] py-24 md:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {[
            [8, 40, 0, 9], [18, 22, 3, 11], [30, 60, 1.5, 13], [45, 18, 5, 10], [58, 34, 2.5, 12],
            [70, 52, 0.8, 14], [82, 26, 4, 9], [92, 44, 6, 12],
          ].map(([l, s, d, t], i) => (
            <span key={i} className="bubble" style={{ left: `${l}%`, width: s, height: s, animationDelay: `${d}s`, animationDuration: `${t}s` }} />
          ))}
        </div>
        <Reveal className="relative mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-6xl uppercase leading-[0.88] md:text-8xl">Tus tenis merecen<br />otra vida</h2>
          <p className="mx-auto mt-6 max-w-md text-black/70">Mándanos una foto por WhatsApp y te decimos el precio exacto.</p>
          <WaButton
            text="Hola, te mando foto de mis tenis para cotizar"
            medium="cta-final"
            className="btn-shine mt-9 inline-flex items-center gap-2 rounded-full bg-black px-10 py-5 text-lg font-bold text-white transition-transform hover:scale-[1.04]"
          >
            Cotizar ahora
          </WaButton>
        </Reveal>
      </section>

      <Footer />
      <MobileBar />
    </main>
  );
}
